import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Proyectos } from './pages/Proyectos';
import { Formacion } from './pages/Formacion';
import { Recursos } from './pages/Recursos';
import './styles/global.css';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/proyectos" element={<Proyectos />} />
          <Route path="/formacion" element={<Formacion />} />
          <Route path="/recursos" element={<Recursos />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
