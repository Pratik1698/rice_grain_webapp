import { MODELS, DATASET, CLASS_WEIGHTS, AUGMENTATION, CLASSES } from '../data/constants';

export default function PerformancePage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="text-center mb-12">
        <span className="badge badge-gold mb-3 inline-block">
          Experimental Analysis
        </span>
        <h1
          className="text-3xl md:text-4xl font-bold text-earth-900 mb-3"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Performance Analysis
        </h1>
        <p className="text-earth-500 max-w-2xl mx-auto">
          Detailed evaluation metrics and experimental configuration for the
          rice grain classification models.
        </p>
      </div>

      {/* ── A. Dataset ─────────────────────────────────────────────────────── */}
      <section className="mb-12">
        <SectionTitle>A. Dataset Overview</SectionTitle>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
          <MetricCard
            value={DATASET.training.toLocaleString()}
            label="Training Images"
            accent="rice"
          />
          <MetricCard
            value={DATASET.validation.toLocaleString()}
            label="Validation Images"
            accent="paddy"
          />
          <MetricCard
            value={DATASET.testing.toLocaleString()}
            label="Test Images"
            accent="earth"
          />
          <MetricCard value={DATASET.classes} label="Quality Classes" accent="rice" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Dataset splits */}
          <div className="card">
            <h3
              className="text-sm font-semibold uppercase tracking-wider text-earth-500 mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Configuration
            </h3>
            <div className="space-y-3">
              <ConfigRow label="Image Size" value={DATASET.imageSize} />
              <ConfigRow label="Batch Size" value={DATASET.batchSize} />
              <ConfigRow label="Framework" value="TensorFlow 2.21" />
              <ConfigRow label="Loading" value="image_dataset_from_directory" />
              <ConfigRow label="Pretrained On" value="ImageNet" />
            </div>
          </div>

          {/* Class weights & augmentation */}
          <div className="card">
            <h3
              className="text-sm font-semibold uppercase tracking-wider text-earth-500 mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Training Details
            </h3>

            <p className="text-xs text-earth-400 uppercase tracking-wider mb-2 font-semibold">
              Class Weights
            </p>
            <div className="space-y-2 mb-5">
              {CLASSES.map((cls) => (
                <div
                  key={cls.name}
                  className="flex justify-between items-center text-sm"
                >
                  <span className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full inline-block"
                      style={{ backgroundColor: cls.color }}
                    />
                    {cls.name}
                  </span>
                  <span
                    className="font-semibold text-earth-700"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {CLASS_WEIGHTS[cls.name].toFixed(3)}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-xs text-earth-400 uppercase tracking-wider mb-2 font-semibold">
              Data Augmentation
            </p>
            <div className="flex flex-wrap gap-2">
              {AUGMENTATION.map((aug) => (
                <span key={aug} className="badge badge-gold text-xs">
                  {aug}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── B. Model Performance ───────────────────────────────────────────── */}
      <section className="mb-12">
        <SectionTitle>B. Model Performance on Test Set</SectionTitle>
        <div className="card card-elevated overflow-x-auto">
          <table className="research-table">
            <thead>
              <tr>
                <th>Architecture</th>
                <th>Test Accuracy (%)</th>
                <th>Macro-F1 Score</th>
              </tr>
            </thead>
            <tbody>
              {MODELS.map((m) => (
                <tr key={m.id} className={m.highlight ? 'highlight' : ''}>
                  <td
                    className="font-semibold"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {m.name}
                  </td>
                  <td style={{ fontFamily: 'var(--font-mono)' }}>
                    {m.accuracy.toFixed(2)}%
                  </td>
                  <td style={{ fontFamily: 'var(--font-mono)' }}>
                    {m.macroF1.toFixed(4)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── C. Computational Efficiency ────────────────────────────────────── */}
      <section className="mb-12">
        <SectionTitle>C. Computational Efficiency</SectionTitle>
        <div className="card card-elevated overflow-x-auto">
          <table className="research-table">
            <thead>
              <tr>
                <th>Architecture</th>
                <th>Parameters</th>
                <th>Model Size (MB)</th>
                <th>Inference Time (ms/image)</th>
              </tr>
            </thead>
            <tbody>
              {MODELS.map((m) => (
                <tr key={m.id} className={m.highlight ? 'highlight' : ''}>
                  <td
                    className="font-semibold"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {m.name}
                  </td>
                  <td style={{ fontFamily: 'var(--font-mono)' }}>
                    {m.parameters.toLocaleString()}
                  </td>
                  <td style={{ fontFamily: 'var(--font-mono)' }}>
                    {m.modelSizeMB}
                  </td>
                  <td style={{ fontFamily: 'var(--font-mono)' }}>
                    {m.inferenceTimeMs}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Visual efficiency comparison */}
        <div className="grid md:grid-cols-3 gap-5 mt-6">
          {MODELS.map((m) => (
            <div key={m.id} className={`card ${m.highlight ? 'border-rice-400' : ''}`}>
              <h4
                className="font-semibold text-earth-800 mb-4"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {m.name}
              </h4>
              <div className="space-y-4">
                <EfficiencyBar
                  label="Params"
                  value={m.parameters}
                  max={23_595_908}
                  display={m.parametersFormatted}
                  color="var(--color-rice-500)"
                />
                <EfficiencyBar
                  label="Size"
                  value={m.modelSizeMB}
                  max={90.01}
                  display={`${m.modelSizeMB} MB`}
                  color="var(--color-paddy-500)"
                />
                <EfficiencyBar
                  label="Time"
                  value={m.inferenceTimeMs}
                  max={45.55}
                  display={`${m.inferenceTimeMs} ms`}
                  color="var(--color-earth-500)"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── E. Key Observations ────────────────────────────────────────────── */}
      <section>
        <SectionTitle>D. Key Experimental Observations</SectionTitle>
        <div className="card bg-rice-50 border-rice-200 max-w-3xl">
          <ul className="space-y-3 text-earth-700 text-sm leading-relaxed list-none">
            <ObservationItem>
              MobileNetV2 achieved the highest test accuracy (83.60%) and
              Macro-F1 score (0.8495) among the three evaluated architectures,
              while also having the lowest parameter count (2.26M) and fastest
              inference time (15.64 ms/image).
            </ObservationItem>
            <ObservationItem>
              ResNet50 achieved 80.68% test accuracy with 23.60M parameters,
              ranking second in classification performance among the evaluated
              architectures.
            </ObservationItem>
            <ObservationItem>
              EfficientNetB0 achieved 79.40% accuracy with 4.05M parameters,
              ranking third among the evaluated architectures while maintaining
              a compact 15.47 MB model size.
            </ObservationItem>
            <ObservationItem>
              Class weighting was used during training to address class
              imbalance, with the "Whole" class having the lowest weight (0.492)
              and the "Broken" and "Stained" classes having higher weights
              (~1.9), reflecting their lower representation in the dataset.
            </ObservationItem>
          </ul>
        </div>
      </section>
    </div>
  );
}

/* ─── Helpers ──────────────────────────────────────────────────────────────── */

function SectionTitle({ children }) {
  return (
    <h2
      className="text-xl font-bold text-earth-900 mb-5 flex items-center gap-2"
      style={{ fontFamily: 'var(--font-heading)' }}
    >
      <span className="w-1.5 h-6 bg-rice-500 rounded-full inline-block" />
      {children}
    </h2>
  );
}

function MetricCard({ value, label, accent = 'rice' }) {
  const colorMap = {
    rice: 'text-rice-600',
    paddy: 'text-paddy-600',
    earth: 'text-earth-600',
  };
  return (
    <div className="card text-center">
      <p className={`metric-value ${colorMap[accent]}`}>{value}</p>
      <p className="metric-label">{label}</p>
    </div>
  );
}

function ConfigRow({ label, value }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-earth-500">{label}</span>
      <span
        className="font-medium text-earth-700"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        {value}
      </span>
    </div>
  );
}

function EfficiencyBar({ label, value, max, display, color }) {
  const pct = Math.max(5, (value / max) * 100);
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-earth-500 font-medium">{label}</span>
        <span
          className="font-semibold text-earth-700"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {display}
        </span>
      </div>
      <div className="prob-bar-track">
        <div
          className="prob-bar-fill"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

function ObservationItem({ children }) {
  return (
    <li className="flex gap-2">
      <span className="text-rice-500 mt-0.5 flex-shrink-0">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <ellipse cx="8" cy="8" rx="3" ry="5.5" transform="rotate(-20 8 8)" />
        </svg>
      </span>
      <span>{children}</span>
    </li>
  );
}
