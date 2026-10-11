import { Link } from 'react-router-dom';
import { CLASSES, MODELS } from '../data/constants';
import heroImg from '../assets/hero-rice.jpg';

/* ─── Rice grain SVG icons for each class ──────────────────────────────────── */

const classIcons = {
  Broken: (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <ellipse cx="16" cy="28" rx="5" ry="11" transform="rotate(-25 16 28)" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" />
      <ellipse cx="34" cy="20" rx="4" ry="8" transform="rotate(15 34 20)" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" />
      <line x1="20" y1="18" x2="28" y2="30" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
    </svg>
  ),
  Chalky: (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <ellipse cx="24" cy="24" rx="7" ry="14" transform="rotate(-20 24 24)" stroke="currentColor" strokeWidth="1.5" />
      <ellipse cx="24" cy="24" rx="4" ry="8" transform="rotate(-20 24 24)" fill="currentColor" opacity="0.12" />
      <circle cx="22" cy="20" r="2" fill="currentColor" opacity="0.15" />
      <circle cx="26" cy="28" r="1.5" fill="currentColor" opacity="0.15" />
    </svg>
  ),
  Stained: (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <ellipse cx="24" cy="24" rx="7" ry="14" transform="rotate(-20 24 24)" stroke="currentColor" strokeWidth="1.5" />
      <ellipse cx="21" cy="22" rx="3" ry="4" transform="rotate(-10 21 22)" fill="currentColor" opacity="0.2" />
      <ellipse cx="27" cy="27" rx="2" ry="3" transform="rotate(5 27 27)" fill="currentColor" opacity="0.15" />
    </svg>
  ),
  Whole: (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <ellipse cx="24" cy="24" rx="7" ry="14" transform="rotate(-20 24 24)" stroke="currentColor" strokeWidth="1.5" />
      <line x1="24" y1="12" x2="24" y2="36" stroke="currentColor" strokeWidth="0.75" opacity="0.3" transform="rotate(-20 24 24)" />
    </svg>
  ),
};

/* ─── Pipeline Steps ───────────────────────────────────────────────────────── */

const pipelineSteps = [
  { label: 'Image Input', icon: '📷' },
  { label: 'Resize to 224×224', icon: '🔲' },
  { label: 'Normalize [0, 1]', icon: '⚖️' },
  { label: 'CNN Feature Extraction', icon: '🧠' },
  { label: 'Softmax Classification', icon: '📊' },
  { label: 'Quality Result', icon: '✅' },
];

export default function HomePage() {
  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 rice-pattern-bg opacity-50" />

        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left - Text */}
            <div className="fade-in-up">
              <div className="flex items-center gap-2 mb-5">
                <span className="badge badge-green">B.Tech Project</span>
                <span className="badge badge-gold">Deep Learning</span>
              </div>

              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-earth-900 mb-2"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Rice<span className="text-rice-500">Vision</span>
              </h1>

              <p
                className="text-lg md:text-xl text-earth-600 mb-4 max-w-lg"
                style={{ fontFamily: 'var(--font-heading)', fontWeight: 400 }}
              >
                Deep Learning-Based Rice Grain Quality Classification
              </p>

              <p className="text-earth-500 mb-8 max-w-lg leading-relaxed">
                An image-based deep learning system for classifying rice grains
                into <strong>Broken</strong>, <strong>Chalky</strong>,{' '}
                <strong>Stained</strong>, and <strong>Whole</strong> categories
                using transfer learning with ImageNet-pretrained CNN
                architectures.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link to="/inspect" className="btn-primary">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  Inspect a Grain
                </Link>
                <Link to="/comparison" className="btn-secondary">
                  View Model Results
                </Link>
              </div>
            </div>

            {/* Right - Hero Image */}
            <div className="fade-in-up fade-in-up-delay-2 relative">
              <div className="rounded-2xl overflow-hidden shadow-xl border border-rice-200">
                <img
                  src={heroImg}
                  alt="Rice grains arranged for quality inspection with one grain highlighted by computer vision analysis"
                  className="w-full h-auto object-cover"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg border border-earth-200 px-4 py-3 hidden md:flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-paddy-100 flex items-center justify-center text-paddy-600 font-bold text-sm">
                  4
                </div>
                <div>
                  <p className="text-xs text-earth-500">Quality Classes</p>
                  <p className="text-sm font-semibold text-earth-800">
                    Grain Classification
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Rice Divider ──────────────────────────────────────────────────── */}
      <div className="rice-divider max-w-4xl mx-auto">
        <span className="rice-divider-dot" />
        <span className="rice-divider-dot" />
        <span className="rice-divider-dot" />
      </div>

      {/* ── Quality Classes ───────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2
            className="text-3xl font-bold text-earth-900 mb-3"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Rice Grain Quality Classes
          </h2>
          <p className="text-earth-500 max-w-2xl mx-auto">
            The model classifies each grain image into one of four quality
            categories, enabling automated inspection of rice samples.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CLASSES.map((cls, i) => (
            <div
              key={cls.name}
              className={`card text-center fade-in-up fade-in-up-delay-${i + 1}`}
              style={{ borderTopColor: cls.color, borderTopWidth: '3px' }}
            >
              <div className="mb-3" style={{ color: cls.color }}>
                {classIcons[cls.name]}
              </div>
              <h3
                className="text-lg font-semibold mb-2"
                style={{ color: cls.color, fontFamily: 'var(--font-heading)' }}
              >
                {cls.name}
              </h3>
              <p className="text-sm text-earth-500 leading-relaxed">
                {cls.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How It Works ──────────────────────────────────────────────────── */}
      <section className="bg-earth-50 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2
              className="text-3xl font-bold text-earth-900 mb-3"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              How It Works
            </h2>
            <p className="text-earth-500 max-w-xl mx-auto">
              The classification pipeline processes a rice grain image through
              preprocessing, feature extraction, and softmax classification.
            </p>
          </div>

          <div className="flex flex-col items-center">
            {pipelineSteps.map((step, i) => (
              <div key={step.label} className="text-center">
                <div className="card card-elevated inline-flex items-center gap-3 px-6 py-3">
                  <span className="text-xl">{step.icon}</span>
                  <span
                    className="font-medium text-earth-700"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {step.label}
                  </span>
                </div>
                {i < pipelineSteps.length - 1 && (
                  <div className="pipeline-arrow my-1" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Evaluated Models ──────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2
            className="text-3xl font-bold text-earth-900 mb-3"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Evaluated Architectures
          </h2>
          <p className="text-earth-500 max-w-2xl mx-auto">
            Three ImageNet-pretrained CNN architectures were fine-tuned and
            evaluated on the rice grain dataset.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {MODELS.map((model) => (
            <div
              key={model.id}
              className={`card ${model.highlight ? 'border-rice-400 card-elevated' : ''}`}
            >
              {model.highlight && (
                <div className="badge badge-gold mb-3 text-xs">Best Accuracy</div>
              )}
              <h3
                className="text-xl font-bold text-earth-900 mb-2"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {model.name}
              </h3>
              <p className="text-sm text-earth-500 mb-5 leading-relaxed">
                {model.description}
              </p>

              <div className="space-y-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-earth-500">Accuracy</span>
                  <span className="font-semibold text-earth-800">
                    {model.accuracy.toFixed(2)}%
                  </span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-earth-500">Macro-F1</span>
                  <span className="font-semibold text-earth-800">
                    {model.macroF1}
                  </span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-earth-500">Parameters</span>
                  <span className="font-semibold text-earth-800">
                    {model.parametersFormatted}
                  </span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-earth-500">Inference</span>
                  <span className="font-semibold text-earth-800">
                    {model.inferenceTimeMs} ms
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link to="/comparison" className="btn-secondary">
            View Detailed Comparison →
          </Link>
        </div>
      </section>
    </div>
  );
}
