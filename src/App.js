import './App.css';
import AddPump from './pages/AddPump';
import LandingPage from './pages/LandingPage';
import { Routes, Route } from "react-router-dom";
import PumpMain from './pages/PumpMain';
import AllPumps from './pages/AllPumps';
import SpareMain from './pages/SpareMain';
import AddSpare from './pages/AddSpare';
import 'react-toastify/dist/ReactToastify.css';
import DispatchPump from './pages/DispatchPump';
import AllSpares from './pages/AllSpares';
import DispatchSpare from './pages/DispatchSpare';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';


function App() {  
  return (
    <div className="">
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/pumps" element={<PumpMain />} />
        <Route path="/addpump" element={<AddPump />} />
        <Route path="/enquirepump" element={<AllPumps />} />
        <Route path="/dispatchedpumps" element={<DispatchPump />} />
        <Route path="/spares" element={<SpareMain />} />
        <Route path="/addspare" element={<AddSpare />} />
        <Route path="/enquirespare" element={<AllSpares />} />
        <Route path="/dispatchspare" element={<DispatchSpare />} />
    </Routes>
    <ToastContainer />
    </div>
  );
}

export default App;
