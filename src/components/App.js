import { Outlet, useLocation } from 'react-router-dom';
import Nav from './Nav/Nav.js';
import Container from './Container.js';
import Footer from './Footer/Footer.js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useEffect, useState } from 'react';

const queryClient = new QueryClient();

export default function App() {
  const location = useLocation();
  const [fadeKey, setFadeKey] = useState(0);

  useEffect(() => {
    setFadeKey((prev) => prev + 1);
  }, [location.pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <Nav />
      <Container>
        <div key={fadeKey} className="fade-transition">
          <Outlet />
        </div>
      </Container>
      <Footer />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
