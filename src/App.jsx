import { Routes, Route } from 'react-router-dom';
import Portfolio from './pages/Portfolio';
import AdminLayout from './admin/AdminLayout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/admin/*" element={<AdminLayout />} />
    </Routes>
  );
}

export default App;
