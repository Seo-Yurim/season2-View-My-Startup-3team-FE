import { Outlet } from 'react-router-dom';
import Nav from './Nav/Nav.js';
import Container from './Container.js';
import Footer from './Footer/Footer.js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Nav />
      <Container>
        <Outlet />
      </Container>
      <Footer />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
