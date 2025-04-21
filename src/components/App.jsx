import { Outlet } from "react-router-dom";
import Nav from "./Nav/Nav";
import Container from "./Common/Container/Container";
import Footer from "./Footer/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Nav />
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </QueryClientProvider>
  );
}
