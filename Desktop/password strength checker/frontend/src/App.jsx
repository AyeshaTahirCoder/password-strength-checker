import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Analyze from './pages/Analyze';
import Transform from './pages/Transform';
import Generate from './pages/Generate';
import Batch from './pages/Batch';
import Academy from './pages/Academy';
import Game from './pages/Game';
import { AnimatePresence } from 'framer-motion';

function App() {
  return (
    <Router>
      <Layout>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/analyze" element={<Analyze />} />
            <Route path="/transform" element={<Transform />} />
            <Route path="/generate" element={<Generate />} />
            <Route path="/batch" element={<Batch />} />
            <Route path="/academy" element={<Academy />} />
            <Route path="/game" element={<Game />} />
          </Routes>
        </AnimatePresence>
      </Layout>
    </Router>
  );
}

export default App;
