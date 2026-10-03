import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import InspectPage from './pages/InspectPage';
import ComparisonPage from './pages/ComparisonPage';
import PerformancePage from './pages/PerformancePage';
import AboutPage from './pages/AboutPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-rice-50">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/inspect" element={<InspectPage />} />
            <Route path="/comparison" element={<ComparisonPage />} />
            <Route path="/performance" element={<PerformancePage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
