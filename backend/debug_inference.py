"""
Debug script to inspect image preprocessing and model inference
on one sample image from each class folder.
"""

import os
from pathlib import Path
import numpy as np
from PIL import Image
import tensorflow as tf

DEFAULT_MODEL_PATH = Path(__file__).resolve().parent / "models" / "mobilenetv2_finetuned_best.keras"
MODEL_PATH = os.environ.get(
    "RICEVISION_MODEL_PATH",
    str(DEFAULT_MODEL_PATH)
)
TEST_DIR = r"C:\Users\Pratik\Desktop\rice_dataset\rice_dataset\test"
CLASS_NAMES = ["Broken", "Chalky", "Stained", "Whole"]
IMG_SIZE = (224, 224)

# One representative image from each class
SAMPLE_IMAGES = {
    "Broken": os.path.join(TEST_DIR, "Broken", "q11.png"),
    "Chalky": os.path.join(TEST_DIR, "Chalky", "t1006.png"),
    "Stained": os.path.join(TEST_DIR, "Stained", "m127.png"),
    "Whole": os.path.join(TEST_DIR, "Whole", "e1005.png"),
}

def run_debug():
    print(f"Loading model from: {MODEL_PATH}")
    model = tf.keras.models.load_model(MODEL_PATH)
    print("Model loaded successfully.\n")

    for true_label, file_path in SAMPLE_IMAGES.items():
        filename = os.path.basename(file_path)
        img = Image.open(file_path).convert("RGB")
        resample_filter = getattr(Image, "Resampling", Image).BILINEAR
        img_resized = img.resize(IMG_SIZE, resample_filter)
        
        # Raw pixel array [0, 255]
        raw_arr = np.array(img_resized, dtype=np.float32)
        
        # Preprocessed tensor passed to model.predict (batch dimension added)
        input_tensor = np.expand_dims(raw_arr, axis=0)
        
        # Inference
        probs = model.predict(input_tensor, verbose=0)[0]
        predicted_idx = int(np.argmax(probs))
        predicted_class = CLASS_NAMES[predicted_idx]
        
        print(f"--------------------------------------------------")
        print(f"Class: {true_label}")
        print(f"filename: {filename}")
        print(f"image shape: {raw_arr.shape}")
        print(f"image min/max/mean: {raw_arr.min():.2f} / {raw_arr.max():.2f} / {raw_arr.mean():.2f}")
        print(f"preprocessed tensor min/max/mean: {input_tensor.min():.4f} / {input_tensor.max():.4f} / {input_tensor.mean():.4f}")
        print(f"raw model probabilities: {[round(float(p), 6) for p in probs]}")
        print(f"predicted class: {predicted_class}")
        print()

if __name__ == "__main__":
    run_debug()
