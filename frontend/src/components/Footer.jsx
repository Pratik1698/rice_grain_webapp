export default function Footer() {
  return (
    <footer className="mt-auto border-t border-earth-200 bg-earth-50">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Branding */}
          <div className="text-center md:text-left">
            <h3
              className="text-lg font-semibold text-earth-800 mb-1"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Rice<span className="text-rice-600">Vision</span>
            </h3>
            <p className="text-sm text-earth-500 max-w-md">
              Deep Learning-Based Rice Grain Quality Classification — a B.Tech
              project exploring transfer learning for automated grain inspection.
            </p>
          </div>

          {/* Tech stack badges */}
          <div className="flex flex-wrap gap-2 justify-center">
            {['TensorFlow', 'MobileNetV2', 'FastAPI', 'React'].map((tech) => (
              <span key={tech} className="badge badge-gold text-xs">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="rice-divider mt-6 mb-4">
          <span className="rice-divider-dot" />
          <span className="rice-divider-dot" />
          <span className="rice-divider-dot" />
        </div>

        <p className="text-center text-xs text-earth-400">
          B.Tech Deep Learning Project · Built with TensorFlow 2.21 &amp; React
        </p>
      </div>
    </footer>
  );
}
