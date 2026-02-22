import { ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import { mainTheme } from './cubicTheme';
import { CubicRoutes } from './Routes';

function App() {
  const queryClient = new QueryClient();

  return (
    <ThemeProvider theme={mainTheme}>
      <QueryClientProvider client={queryClient}>
        <CubicRoutes>
        </CubicRoutes>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App
