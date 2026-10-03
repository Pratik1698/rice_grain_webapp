import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home' },
  { to: '/inspect', label: 'Grain Inspection' },
  { to: '/comparison', label: 'Model Comparison' },
  { to: '/performance', label: 'Performance' },
  { to: '/about', label: 'About' },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-earth-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2.5 no-underline">
          {/* Rice-grain icon */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rice-400 to-rice-600 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="12" cy="12" rx="5" ry="9" transform="rotate(-30 12 12)" fill="white" opacity="0.9" />
              <ellipse cx="12" cy="12" rx="2.5" ry="6" transform="rotate(-30 12 12)" fill="white" opacity="0.5" />
            </svg>
          </div>
          <span
            className="text-lg font-semibold tracking-tight text-earth-800"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Rice<span className="text-rice-600">Vision</span>
          </span>
        </NavLink>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile menu button */}
        <MobileMenu />
      </div>
    </header>
  );
}

function MobileMenu() {
  return (
    <div className="md:hidden">
      <details className="relative">
        <summary className="list-none cursor-pointer p-2 rounded-lg hover:bg-rice-100 transition-colors">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </summary>
        <div className="absolute right-0 top-12 bg-white rounded-xl shadow-lg border border-earth-200 p-3 min-w-48 z-50">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `block nav-link mb-1 ${isActive ? 'active' : ''}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </details>
    </div>
  );
}
