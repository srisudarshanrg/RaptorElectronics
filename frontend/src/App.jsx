import { Outlet } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';

function App() {
  const developmentBackendLink = "http://localhost:2400/";
  const productionBackendLink = "https://raptorelectronics-production.up.railway.app/";

  return (
    <div className="App">
      <HomePage />
    </div>
  );
}

export default App;
