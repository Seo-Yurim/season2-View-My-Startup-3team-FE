import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StartupPage from './pages/StartupPage';
import StartupDetailPage from './pages/StartupDetailPage.js';
import MyComparisonPage from './pages/MyComparisonPage';
import ComparisonPage from './pages/ComparisonPage';
import InvestmentPage from './pages/InvestmentPage';
import App from './components/App';
import NotFoundPage from './pages/NotFoundPage.js';
import TermsPage from './pages/TermsPage.js';
import PrivacyPage from './pages/PrivacyPage.js';
import AboutPage from './pages/AboutPage.js';

export default function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<StartupPage />} />
          <Route path="/startup/:id" element={<StartupDetailPage />} />
          <Route path="/my-comparison" element={<MyComparisonPage />} />
          <Route path="/comparison" element={<ComparisonPage />} />
          <Route path="/investment" element={<InvestmentPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
