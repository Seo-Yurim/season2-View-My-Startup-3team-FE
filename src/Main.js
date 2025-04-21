import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StartupPage from './pages/StartupPage';
import StartupDetailPage from './pages/StartupDetailPage';
import MyComparisonPage from './pages/MyComparisonPage';
import ComparisonPage from './pages/ComparisonPage';
import InvestmentPage from './pages/InvestmentPage';
import App from './components/App.jsx';
import NotFoundPage from './pages/NotFoundPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import AboutPage from './pages/AboutPage';

export default function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/startup" element={<StartupPage />} />
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
