"""
Verification script for RiceVision model predictions.
Tests images from each of the 4 test class folders against:
1. Direct FastAPI backend: http://127.0.0.1:8000/predict
2. Vite development proxy: http://localhost:5173/api/predict
"""

import os
import requests

ENDPOINTS = [
    ("Direct FastAPI (:8000)", "http://127.0.0.1:8000/predict"),
    ("Vite Proxy (:5173/api)", "http://localhost:5173/api/predict"),
]

TEST_DIR = r"C:\Users\Pratik\Desktop\rice_dataset\rice_dataset\test"
SAMPLES = {
    "Broken": os.path.join(TEST_DIR, "Broken", "q11.png"),
    "Chalky": os.path.join(TEST_DIR, "Chalky", "t1006.png"),
    "Stained": os.path.join(TEST_DIR, "Stained", "m127.png"),
    "Whole": os.path.join(TEST_DIR, "Whole", "e1005.png"),
}

def verify_all():
    for label_endpoint, url in ENDPOINTS:
        print("=" * 60)
        print(f"Testing Endpoint: {label_endpoint}")
        print(f"URL: {url}")
        print("=" * 60)
        
        for ground_truth, file_path in SAMPLES.items():
            filename = os.path.basename(file_path)
            try:
                with open(file_path, "rb") as fp:
                    response = requests.post(url, files={"file": (filename, fp, "image/png")})
                
                if response.status_code == 200:
                    data = response.json()
                    pred = data["predicted_class"]
                    conf = data["confidence"]
                    probs = data["probabilities"]
                    match = "CORRECT" if pred == ground_truth else "MISMATCH"
                    print(f"[{match}] Ground Truth: {ground_truth:7s} | File: {filename}")
                    print(f"        Predicted:    {pred} ({conf * 100:.2f}%)")
                    print(f"        Probabilities: Broken={probs['Broken']:.4f}, Chalky={probs['Chalky']:.4f}, Stained={probs['Stained']:.4f}, Whole={probs['Whole']:.4f}")
                    print(f"        Inference:    {data['inference_time_ms']} ms")
                else:
                    print(f"[FAIL] {ground_truth} ({filename}) - HTTP {response.status_code}: {response.text}")
            except Exception as e:
                print(f"[ERROR] Could not connect to {url}: {e}")
        print()

if __name__ == "__main__":
    verify_all()
