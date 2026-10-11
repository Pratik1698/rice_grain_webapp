import { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { MODELS } from '../data/constants';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

/* ─── Chart color palette (rice-themed) ──────────────────────────────────── */

const BAR_COLORS = ['#D4A843', '#95C785', '#B5A898'];
const BAR_BORDERS = ['#B8922F', '#6BAF56', '#968672'];

/* ─── Reusable chart config builder ──────────────────────────────────────── */

function makeChartData(labels, dataPoints, label) {
  return {
    labels,
    datasets: [
      {
        label,
        data: dataPoints,
        backgroundColor: BAR_COLORS,
        borderColor: BAR_BORDERS,
        borderWidth: 1,
        borderRadius: 6,
        maxBarThickness: 64,
      },
    ],
  };
}

function chartOptions(title, unit = '', beginAtZero = true, suggestedMin = undefined) {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: title,
        font: { family: 'Outfit', size: 14, weight: '600' },
        color: '#3B3229',
        padding: { bottom: 16 },
      },
      tooltip: {
        callbacks: {
          label: (ctx) =>
            `${typeof ctx.parsed.y === 'number' && unit === '%' ? ctx.parsed.y.toFixed(2) : ctx.parsed.y}${unit}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero,
        suggestedMin,
        grid: { color: '#E8E2D9' },
        ticks: {
          font: { family: 'Inter', size: 12 },
          color: '#756656',
          callback: (v) => `${v}${unit}`,
        },
      },
      x: {
        grid: { display: false },
        ticks: {
          font: { family: 'Outfit', size: 13, weight: '500' },
          color: '#574B3E',
        },
      },
    },
  };
}

export default function ComparisonPage() {
  const modelNames = MODELS.map((m) => m.name);

  const accuracyData = useMemo(
    () => makeChartData(modelNames, MODELS.map((m) => m.accuracy), 'Accuracy'),
    [modelNames],
  );
  const f1Data = useMemo(
    () => makeChartData(modelNames, MODELS.map((m) => m.macroF1), 'Macro-F1'),
    [modelNames],
  );
  const paramData = useMemo(
    () =>
      makeChartData(
        modelNames,
        MODELS.map((m) => +(m.parameters / 1e6).toFixed(2)),
        'Parameters (M)',
      ),
    [modelNames],
  );
  const timeData = useMemo(
    () =>
      makeChartData(
        modelNames,
        MODELS.map((m) => m.inferenceTimeMs),
        'Inference Time (ms)',
      ),
    [modelNames],
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="text-center mb-12">
        <span className="badge badge-gold mb-3 inline-block">Experimental Results</span>
        <h1
          className="text-3xl md:text-4xl font-bold text-earth-900 mb-3"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Model Comparison
        </h1>
        <p className="text-earth-500 max-w-2xl mx-auto">
          Comparative analysis of three ImageNet-pretrained CNN architectures
          fine-tuned on the rice grain dataset. All metrics are measured on the
          held-out test set of 994 images.
        </p>
      </div>

      {/* Summary Table */}
      <div className="card card-elevated mb-10 overflow-x-auto">
        <table className="research-table">
          <thead>
            <tr>
              <th>Architecture</th>
              <th>Accuracy (%)</th>
              <th>Macro-F1</th>
              <th>Parameters</th>
              <th>Model Size</th>
              <th>Inference Time</th>
            </tr>
          </thead>
          <tbody>
            {MODELS.map((m) => (
              <tr key={m.id} className={m.highlight ? 'highlight' : ''}>
                <td className="font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>
                  {m.name}
                  {m.highlight && (
                    <span className="badge badge-gold ml-2 text-xs">Best</span>
                  )}
                </td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>{m.accuracy.toFixed(2)}%</td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>{m.macroF1.toFixed(4)}</td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>{m.parametersFormatted}</td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>{m.modelSizeMB} MB</td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>{m.inferenceTimeMs} ms</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Charts Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="card card-elevated">
          <div className="h-72">
            <Bar data={accuracyData} options={chartOptions('Test Accuracy', '%', false, 75)} />
          </div>
        </div>
        <div className="card card-elevated">
          <div className="h-72">
            <Bar data={f1Data} options={chartOptions('Macro-F1 Score', '', false, 0.75)} />
          </div>
        </div>
        <div className="card card-elevated">
          <div className="h-72">
            <Bar
              data={paramData}
              options={chartOptions('Parameter Count (Millions)', 'M')}
            />
          </div>
        </div>
        <div className="card card-elevated">
          <div className="h-72">
            <Bar
              data={timeData}
              options={chartOptions('Inference Time per Image', ' ms')}
            />
          </div>
        </div>
      </div>

      {/* Key Observation */}
      <div className="card bg-paddy-50 border-paddy-200 max-w-3xl mx-auto">
        <h3
          className="text-sm font-semibold uppercase tracking-wider text-paddy-700 mb-2"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Key Observation
        </h3>
        <p className="text-earth-700 leading-relaxed">
          MobileNetV2 achieved the highest test accuracy (83.60%) and Macro-F1
          score (0.8495) among the three evaluated architectures, while also
          having the fewest parameters (2.26M) and the shortest measured
          inference time (15.64 ms/image). This suggests a favorable
          accuracy–efficiency trade-off for practical deployment in grain
          inspection systems.
        </p>
      </div>
    </div>
  );
}
