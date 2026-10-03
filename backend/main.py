"""
RiceVision API - FastAPI backend for rice grain quality classification.
"""

from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from model_service import load_model, predict


# ─── Lifespan: preload model on startup ──────────────────────────────────────

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Load the TensorFlow model when the server starts."""
    print("[RiceVision API] Starting up — loading model...")
    try:
        load_model()
        print("[RiceVision API] Model ready for inference.")
    except FileNotFoundError as e:
        print(f"[RiceVision API] WARNING: {e}")
        print("[RiceVision API] Server will start, but /predict will fail.")
    yield
    print("[RiceVision API] Shutting down.")


# ─── App ─────────────────────────────────────────────────────────────────────

app = FastAPI(
    title="RiceVision API",
    description="Deep Learning-Based Rice Grain Quality Classification",
    version="1.0.0",
    lifespan=lifespan,
)

import os

# ─── CORS Configuration ───────────────────────────────────────────────────────

default_origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

# Support custom frontend origins via FRONTEND_ORIGIN (e.g. from Vercel)
frontend_origin_env = os.environ.get("FRONTEND_ORIGIN", "").strip()
allowed_origins = list(default_origins)
if frontend_origin_env:
    for origin in frontend_origin_env.split(","):
        cleaned = origin.strip().rstrip("/")
        if cleaned and cleaned not in allowed_origins:
            allowed_origins.append(cleaned)

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ─── Routes ──────────────────────────────────────────────────────────────────

@app.get("/")
async def root():
    return {
        "service": "RiceVision API",
        "status": "running",
        "model": "MobileNetV2 (fine-tuned)",
        "classes": ["Broken", "Chalky", "Stained", "Whole"],
    }


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.post("/predict")
async def predict_endpoint(file: UploadFile = File(...)):
    """
    Accept an uploaded rice grain image and return the model's prediction.
    
    Supported formats: JPEG, PNG
    The image is resized to 224×224 internally.
    """
    # Validate file type
    content_type = file.content_type or ""
    filename = (file.filename or "").lower()
    valid_content_types = ("image/jpeg", "image/png", "image/jpg", "application/octet-stream")
    valid_extensions = (".jpg", ".jpeg", ".png")

    if content_type not in valid_content_types and not any(filename.endswith(ext) for ext in valid_extensions):
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file type: {file.content_type}. "
                   "Please upload a JPEG or PNG image.",
        )

    try:
        image_bytes = await file.read()
        if len(image_bytes) == 0:
            raise HTTPException(status_code=400, detail="Empty file uploaded.")

        result = predict(image_bytes)
        return result

    except FileNotFoundError as e:
        raise HTTPException(status_code=503, detail=str(e))
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Inference failed: {str(e)}",
        )


if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)

