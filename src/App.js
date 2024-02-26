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
import CustomerSheetPump from './pages/CustomerSheetPump';
import OrderList from './pages/OrderList';
import DismantledPumps from './pages/DismantledPumps';
import MOU from './KPI/MOU';
import EnquiryPage from './pages/EnquiryRegister/EnquiryPage';
import SpareEnquiry from './pages/EnquiryRegister/SpareEnquiry';
import PumpEnquiry from './pages/EnquiryRegister/PumpEnquiry';
import AddSpareQtn from './pages/EnquiryRegister/AddSpareQtn';
import AllSpareQtn from './pages/EnquiryRegister/AllSpareQtn';


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
        <Route path="/customersheet" element={<CustomerSheetPump />} />
        <Route path="/orderlist" element={<OrderList />} />
        <Route path="/dismantledpumps" element={<DismantledPumps />} />
        <Route path="/spares" element={<SpareMain />} />
        <Route path="/addspare" element={<AddSpare />} />
        <Route path="/enquirespare" element={<AllSpares />} />
        <Route path="/dispatchspare" element={<DispatchSpare />} />

        <Route path="/mou" element={<MOU />} />

        <Route path="/enquiry" element={<EnquiryPage />} />
        <Route path="/sparesenquiry" element={<SpareEnquiry />} />
        <Route path="/addspareqtn" element={<AddSpareQtn />} />
        <Route path="/allsparesquotation" element={<AllSpareQtn />} />
        <Route path="/pumpenquiry" element={<PumpEnquiry />} />
    </Routes>
    <ToastContainer />
    </div>
  );
}

export default App;
