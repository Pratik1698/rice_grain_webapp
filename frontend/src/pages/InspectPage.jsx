import { useState, useRef, useCallback } from 'react';
import { predictGrain } from '../services/api';
import { CLASS_DESCRIPTIONS, CLASSES } from '../data/constants';

/* Class color map for probability bars */
const CLASS_COLORS = {};
CLASSES.forEach((c) => {
  CLASS_COLORS[c.name] = c.color;
});

export default function InspectPage() {
  const [image, setImage] = useState(null); // File object
  const [preview, setPreview] = useState(null); // data URL
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  /* ── Image selection ──────────────────────────────────────────────────── */

  const handleFile = useCallback((file) => {
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
      setError('Please upload a JPG or PNG image.');
      return;
    }
    setError(null);
    setResult(null);
    setImage(file);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files?.[0];
      handleFile(file);
    },
    [handleFile],
  );

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };
  const handleDragLeave = () => setDragOver(false);

  const clearImage = () => {
    setImage(null);
    setPreview(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  /* ── Prediction ───────────────────────────────────────────────────────── */

  const handlePredict = async () => {
    if (!image) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await predictGrain(image);
      setResult(data);
    } catch (err) {
      setError(err.message || 'Prediction failed. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  /* ── Render ───────────────────────────────────────────────────────────── */

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="badge badge-gold">Live Inference</span>
          <span className="badge badge-green">MobileNetV2</span>
        </div>
        <h1
          className="text-3xl md:text-4xl font-bold text-earth-900 mb-3"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Grain Inspection
        </h1>
        <p className="text-earth-500 max-w-xl mx-auto">
          Upload a rice grain image and the MobileNetV2 model will classify it
          into one of four quality categories in real time.
        </p>
      </div>

      {/* Main grid */}
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* ── Left: Upload ─────────────────────────────────────────────── */}
        <div className="card card-elevated">
          <h2
            className="text-lg font-semibold text-earth-800 mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Sample Input
          </h2>

          {!preview ? (
            /* Upload zone */
            <div
              className={`upload-zone ${dragOver ? 'drag-over' : ''}`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/jpg"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFile(file);
                  e.target.value = '';
                }}
              />

              <div className="mb-4">
                <svg
                  width="56"
                  height="56"
                  viewBox="0 0 56 56"
                  fill="none"
                  className="mx-auto text-earth-300"
                >
                  <rect
                    x="8"
                    y="12"
                    width="40"
                    height="32"
                    rx="4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M8 36l10-10 8 8 6-6 16 16"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="38" cy="22" r="3" stroke="currentColor" strokeWidth="1.5" />
                  <path
                    d="M28 4v8M24 8h8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <p
                className="text-earth-700 font-medium mb-1"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Place a rice grain image for inspection
              </p>
              <p className="text-sm text-earth-400">
                Drag and drop or click to browse
              </p>
              <p className="text-xs text-earth-300 mt-2">
                Supported formats: JPG, JPEG, PNG
              </p>
            </div>
          ) : (
            /* Preview */
            <div>
              <div className="relative rounded-xl overflow-hidden border border-earth-200 bg-earth-50 mb-4">
                <img
                  src={preview}
                  alt="Uploaded rice grain for inspection"
                  className="w-full h-auto max-h-96 object-contain mx-auto"
                />
                {/* Scanning overlay during loading */}
                {loading && (
                  <div className="absolute inset-0 bg-rice-50/60 flex items-center justify-center">
                    <div className="text-center">
                      <div className="spinner-grain mx-auto mb-3" />
                      <p
                        className="text-earth-700 font-medium text-sm"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        Analyzing grain...
                      </p>
                      <p className="text-xs text-earth-500">
                        Running MobileNetV2 inference
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  className="btn-primary flex-1"
                  onClick={handlePredict}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      </svg>
                      Inspect Grain
                    </>
                  )}
                </button>
                <button
                  className="btn-secondary"
                  onClick={clearImage}
                  disabled={loading}
                >
                  Clear
                </button>
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
              <strong>Error:</strong> {error}
            </div>
          )}
        </div>

        {/* ── Right: Results ───────────────────────────────────────────── */}
        <div>
          {!result && !loading && (
            <div className="card card-elevated text-center py-16">
              <div className="text-earth-200 mb-4">
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 64 64"
                  fill="none"
                  className="mx-auto"
                >
                  <ellipse
                    cx="32"
                    cy="32"
                    rx="10"
                    ry="20"
                    transform="rotate(-20 32 32)"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="24"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                </svg>
              </div>
              <p
                className="text-earth-400 font-medium"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Inspection result will appear here
              </p>
              <p className="text-sm text-earth-300 mt-1">
                Upload an image and click "Inspect Grain"
              </p>
            </div>
          )}

          {loading && !result && (
            <div className="card card-elevated text-center py-16">
              <div className="spinner-grain mx-auto mb-4" />
              <p
                className="text-earth-600 font-medium"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Running model inference...
              </p>
              <p className="text-sm text-earth-400 mt-1">
                Processing image through MobileNetV2
              </p>
            </div>
          )}

          {result && <ResultCard result={result} />}
        </div>
      </div>
    </div>
  );
}

/* ─── Result Card ──────────────────────────────────────────────────────────── */

function ResultCard({ result }) {
  const {
    predicted_class,
    confidence,
    probabilities,
    inference_time_ms,
    model,
  } = result;

  const classColor = CLASS_COLORS[predicted_class] || '#666';

  /* Sort probabilities descending */
  const sortedProbs = Object.entries(probabilities).sort(
    ([, a], [, b]) => b - a,
  );

  return (
    <div className="space-y-5 fade-in-up">
      {/* Main result */}
      <div
        className="card card-elevated"
        style={{ borderLeftWidth: '4px', borderLeftColor: classColor }}
      >
        <p
          className="text-xs font-semibold uppercase tracking-wider text-earth-400 mb-2"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Grain Inspection Result
        </p>

        <div className="flex items-end justify-between mb-4">
          <div>
            <p className="text-sm text-earth-500 mb-0.5">Prediction</p>
            <h2
              className="text-3xl font-bold"
              style={{ color: classColor, fontFamily: 'var(--font-heading)' }}
            >
              {predicted_class}
            </h2>
          </div>
          <div className="text-right">
            <p className="text-sm text-earth-500 mb-0.5">Confidence</p>
            <p
              className="text-3xl font-bold text-earth-900"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {(confidence * 100).toFixed(1)}%
            </p>
          </div>
        </div>

        {/* Probability bars */}
        <div className="space-y-3 mt-6">
          <p
            className="text-xs font-semibold uppercase tracking-wider text-earth-400"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Class Probabilities
          </p>
          {sortedProbs.map(([cls, prob]) => (
            <div key={cls}>
              <div className="flex justify-between items-baseline mb-1">
                <span
                  className="text-sm font-medium"
                  style={{
                    color:
                      cls === predicted_class ? classColor : 'var(--color-earth-600)',
                    fontFamily: 'var(--font-heading)',
                  }}
                >
                  {cls}
                </span>
                <span
                  className="text-sm font-semibold"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {(prob * 100).toFixed(2)}%
                </span>
              </div>
              <div className="prob-bar-track">
                <div
                  className="prob-bar-fill"
                  style={{
                    width: `${(prob * 100).toFixed(1)}%`,
                    backgroundColor:
                      cls === predicted_class
                        ? classColor
                        : 'var(--color-earth-300)',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Metadata */}
      <div className="card">
        <p
          className="text-xs font-semibold uppercase tracking-wider text-earth-400 mb-3"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Inference Details
        </p>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="metric-label">Model</p>
            <p
              className="text-sm font-semibold text-earth-800"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {model}
            </p>
          </div>
          <div>
            <p className="metric-label">Input Size</p>
            <p
              className="text-sm font-semibold text-earth-800"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              224 × 224 px
            </p>
          </div>
          <div>
            <p className="metric-label">Inference</p>
            <p
              className="text-sm font-semibold text-earth-800"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {inference_time_ms.toFixed(1)} ms
            </p>
          </div>
        </div>
      </div>

      {/* Explanation */}
      <div className="card bg-rice-50 border-rice-200">
        <p
          className="text-xs font-semibold uppercase tracking-wider text-rice-700 mb-2"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Classification Note
        </p>
        <p className="text-sm text-earth-600 leading-relaxed">
          {CLASS_DESCRIPTIONS[predicted_class]}
        </p>
      </div>
    </div>
  );
}
