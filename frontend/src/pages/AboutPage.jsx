import { MODELS, DATASET, CLASSES, AUGMENTATION } from '../data/constants';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="text-center mb-12">
        <h1
          className="text-3xl md:text-4xl font-bold text-earth-900 mb-3"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          About This Project
        </h1>
        <p className="text-earth-500 max-w-xl mx-auto">
          An overview of the research context, methodology, and evaluation
          framework for this deep learning project.
        </p>
      </div>

      {/* ── Problem Statement ──────────────────────────────────────────────── */}
      <AboutSection title="Problem Statement">
        <p>
          Rice grain quality is traditionally assessed through manual inspection,
          which is time-consuming, subjective, and difficult to scale. This
          project investigates the use of deep learning-based image classification
          to automate the process, enabling consistent and efficient quality
          assessment of rice grains.
        </p>
        <p className="mt-3">
          Given a single image of a rice grain, the system classifies it into one
          of four quality categories:
        </p>
        <div className="flex flex-wrap gap-3 mt-3">
          {CLASSES.map((cls) => (
            <span
              key={cls.name}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium"
              style={{
                backgroundColor: cls.colorLight,
                color: cls.color,
                border: `1px solid ${cls.color}30`,
              }}
            >
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: cls.color }}
              />
              {cls.name}
            </span>
          ))}
        </div>
      </AboutSection>

      {/* ── Approach ───────────────────────────────────────────────────────── */}
      <AboutSection title="Approach">
        <p>
          The project employs <strong>transfer learning</strong> using three
          convolutional neural network (CNN) architectures pretrained on the
          ImageNet dataset. The pretrained feature extractors are fine-tuned on
          the rice grain dataset to adapt the learned representations for
          grain-quality classification.
        </p>
        <div className="mt-4 space-y-3">
          {MODELS.map((m) => (
            <div key={m.id} className="flex gap-3 items-start">
              <span className="w-1.5 h-1.5 rounded-full bg-rice-500 mt-2 flex-shrink-0" />
              <div>
                <span
                  className="font-semibold text-earth-800"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {m.name}
                </span>
                <span className="text-earth-500"> — {m.description}</span>
              </div>
            </div>
          ))}
        </div>
      </AboutSection>

      {/* ── Dataset ────────────────────────────────────────────────────────── */}
      <AboutSection title="Dataset">
        <p>
          The dataset consists of {DATASET.total.toLocaleString()} rice grain
          images divided into {DATASET.classes} classes, split into training,
          validation, and test partitions.
        </p>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="card text-center py-4">
            <p
              className="text-2xl font-bold text-rice-600"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {DATASET.training.toLocaleString()}
            </p>
            <p className="metric-label">Training</p>
          </div>
          <div className="card text-center py-4">
            <p
              className="text-2xl font-bold text-paddy-600"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {DATASET.validation.toLocaleString()}
            </p>
            <p className="metric-label">Validation</p>
          </div>
          <div className="card text-center py-4">
            <p
              className="text-2xl font-bold text-earth-600"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {DATASET.testing.toLocaleString()}
            </p>
            <p className="metric-label">Test</p>
          </div>
        </div>
        <p className="text-sm text-earth-500 mt-3">
          All images are resized to {DATASET.imageSize} and normalized to [0, 1]
          before being fed to the model. Training uses data augmentation
          ({AUGMENTATION.join(', ')}) and class weighting to handle imbalance.
        </p>
      </AboutSection>

      {/* ── Evaluation ─────────────────────────────────────────────────────── */}
      <AboutSection title="Evaluation Framework">
        <p>
          Each model is evaluated on the held-out test set using the following
          metrics:
        </p>
        <div className="grid sm:grid-cols-2 gap-3 mt-4">
          {[
            ['Accuracy', 'Overall fraction of correctly classified samples'],
            ['Macro-F1 Score', 'Harmonic mean of precision and recall, averaged across all classes'],
            ['Confusion Matrix', 'Per-class breakdown of predictions vs. ground truth'],
            ['Parameter Count', 'Total trainable parameters in the model'],
            ['Model Size', 'On-disk size of the saved .keras model file'],
            ['Inference Time', 'Wall-clock time per image during model.predict()'],
          ].map(([metric, desc]) => (
            <div key={metric} className="flex gap-2 items-start text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-paddy-500 mt-1.5 flex-shrink-0" />
              <div>
                <span className="font-medium text-earth-800">{metric}</span>
                <span className="text-earth-500"> — {desc}</span>
              </div>
            </div>
          ))}
        </div>
      </AboutSection>

      {/* ── Research Context ───────────────────────────────────────────────── */}
      <AboutSection title="Research Context">
        <p>
          This project is situated within the broader research area of automated
          agricultural image classification. Key challenges in grain-quality
          assessment include:
        </p>
        <ul className="mt-3 space-y-2 text-earth-600">
          {[
            'Variation in lighting conditions across imaging environments',
            'Background dependency and need for controlled capture setups',
            'Smartphone-based imaging for accessibility in field settings',
            'Computational efficiency constraints for edge/mobile deployment',
            'The accuracy–efficiency trade-off in selecting appropriate architectures',
          ].map((item) => (
            <li key={item} className="flex gap-2 items-start text-sm">
              <span className="text-rice-500 mt-0.5 flex-shrink-0">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                  <ellipse cx="8" cy="8" rx="3" ry="5.5" transform="rotate(-20 8 8)" />
                </svg>
              </span>
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-earth-500 leading-relaxed">
          The experimental findings contribute to understanding which lightweight
          CNN architectures are most suitable for practical image-based grain
          inspection, balancing classification performance with computational
          resources.
        </p>
      </AboutSection>

      {/* ── Tech Stack ─────────────────────────────────────────────────────── */}
      <AboutSection title="Technology Stack">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-wider text-earth-400 mb-2"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Model Training
            </p>
            <div className="flex flex-wrap gap-2">
              {['TensorFlow 2.21', 'Keras', 'Python', 'NumPy'].map((t) => (
                <span key={t} className="badge badge-gold text-xs">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-wider text-earth-400 mb-2"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Web Application
            </p>
            <div className="flex flex-wrap gap-2">
              {['React', 'Vite', 'Tailwind CSS', 'FastAPI'].map((t) => (
                <span key={t} className="badge badge-green text-xs">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </AboutSection>
    </div>
  );
}

/* ─── Section wrapper ──────────────────────────────────────────────────────── */

function AboutSection({ title, children }) {
  return (
    <section className="mb-10">
      <h2
        className="text-xl font-bold text-earth-900 mb-4 flex items-center gap-2"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        <span className="w-1.5 h-6 bg-rice-500 rounded-full inline-block" />
        {title}
      </h2>
      <div className="text-earth-600 leading-relaxed">{children}</div>
    </section>
  );
}
