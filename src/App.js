import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { AuthProvider } from './context/AuthContext';
import FraisAdd from './pages/FraisAdd';
import FraisEdit from './components/FraisEdit';
import FraisHorsForfait from './pages/FraisHorsForfait';
import FraisHorsForfaitAdd from './pages/FraisHorsForfaitAdd';
import FraisHorsForfaitEdit from './pages/FraisHorsForfaitEdit'

function App() {
  return (
  <AuthProvider>
    <BrowserRouter>
        <div>
          <Navbar/>
        </div>
            <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/frais/ajouter" element={<FraisAdd />} />
              <Route path="/frais/modifier/:id" element={<FraisEdit />} />
              <Route path="/frais/:id/hors-forfait" element={<FraisHorsForfait />} />
              <Route path="/frais/:id/hors-forfait/ajouter" element={<FraisHorsForfaitAdd />} />
              <Route path="/frais/:id/hors-forfait/modifier/:idHF" element={<FraisHorsForfaitEdit />} />
            </Routes>
    </BrowserRouter>
  </AuthProvider>
  );
}

export default App;
