"""
Model service for RiceVision - Rice Grain Quality Classification.
Loads the MobileNetV2 fine-tuned model and performs inference.
"""

import os
import time
from pathlib import Path
import numpy as np
from PIL import Image
import io
import tensorflow as tf

# ─── Configuration ────────────────────────────────────────────────────────────

# Path to the trained MobileNetV2 model (production-safe relative default)
DEFAULT_MODEL_PATH = Path(__file__).resolve().parent / "models" / "mobilenetv2_finetuned_best.keras"
MODEL_PATH = os.environ.get(
    "RICEVISION_MODEL_PATH",
    str(DEFAULT_MODEL_PATH)
)

# Class labels in the exact order used during training
# (alphabetical, matching image_dataset_from_directory default)
CLASS_NAMES = ["Broken", "Chalky", "Stained", "Whole"]

# Input image dimensions expected by the model
IMG_SIZE = (224, 224)


# ─── Model Singleton ─────────────────────────────────────────────────────────

_model = None


def load_model():
    """Load the Keras model from disk (singleton pattern)."""
    global _model
    if _model is None:
        print(f"[RiceVision] Loading model from: {MODEL_PATH}")
        if not os.path.exists(MODEL_PATH):
            raise FileNotFoundError(
                f"Model file not found at: {MODEL_PATH}\n"
                "Set the RICEVISION_MODEL_PATH environment variable "
                "to the correct path."
            )
        _model = tf.keras.models.load_model(MODEL_PATH)
        print(f"[RiceVision] Model loaded successfully.")
        print(f"[RiceVision] Input shape: {_model.input_shape}")
        print(f"[RiceVision] Output shape: {_model.output_shape}")
    return _model


def preprocess_image(image_bytes: bytes) -> np.ndarray:
    """
    Preprocess a raw image for model inference.

    Steps:
    1. Open image and convert to RGB
    2. Resize to 224×224 using Bilinear interpolation (matching image_dataset_from_directory)
    3. Convert to float32 array in [0, 255] range
       NOTE: The loaded MobileNetV2 model graph already includes the internal
       tf.keras.applications.mobilenet_v2.preprocess_input layers (true_divide by 127.5
       and subtract 1.0) which normalize [0, 255] -> [-1, 1].
       Dividing by 255.0 here caused double-normalization, turning all images into
       near-constant dark tensors (~ -1.0) and producing identical predictions.
    4. Add batch dimension -> shape: (1, 224, 224, 3)
    """
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    resample_filter = getattr(Image, "Resampling", Image).BILINEAR
    image = image.resize(IMG_SIZE, resample_filter)
    img_array = np.array(image, dtype=np.float32)
    img_array = np.expand_dims(img_array, axis=0)  # shape: (1, 224, 224, 3)
    return img_array


def predict(image_bytes: bytes) -> dict:
    """
    Run inference on a rice grain image.

    Returns a dictionary with:
    - predicted_class: str
    - confidence: float
    - probabilities: dict mapping class name → probability
    - inference_time_ms: float
    - model: str
    """
    model = load_model()

    # Preprocess
    img_array = preprocess_image(image_bytes)

    # Inference with timing
    start_time = time.perf_counter()
    predictions = model.predict(img_array, verbose=0)
    end_time = time.perf_counter()

    inference_time_ms = (end_time - start_time) * 1000.0

    # Extract probabilities
    probs = predictions[0]  # shape: (4,)
    predicted_index = int(np.argmax(probs))
    predicted_class = CLASS_NAMES[predicted_index]
    confidence = float(probs[predicted_index])

    probabilities = {
        name: round(float(probs[i]), 6)
        for i, name in enumerate(CLASS_NAMES)
    }

    return {
        "predicted_class": predicted_class,
        "confidence": round(confidence, 6),
        "probabilities": probabilities,
        "inference_time_ms": round(inference_time_ms, 2),
        "model": "MobileNetV2",
    }
