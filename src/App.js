import logo from './logo.svg';
import './App.css';
import { Route, Routes } from "react-router-dom";
import Home from './components/home/home';
import Reservations from './components/reservations/reservation';
import Dashboard from './components/home/dashboard';

function App() {
  return (
  
  <>
    <Dashboard/>
  <Routes>
<Route path='/' element={<Home />} />
{/* <Route path='/reservations' element={<Reservations />} /> */}
   </Routes>
  
  
   </>
  );
}

export default App;
