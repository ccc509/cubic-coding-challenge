import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Result } from './pages/Result';
import { URLS } from './utils/urls';

export function CubicRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path={URLS.SEARCH} element={<Home />} />
        <Route path={URLS.RESULT} element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}
