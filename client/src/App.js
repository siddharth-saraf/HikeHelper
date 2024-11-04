import logo from './logo.svg';
import Map from './Map.js';
import HikeSelect from './HikeSelect.js'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HikeSelect />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </Router>
  );
}

export default App;
