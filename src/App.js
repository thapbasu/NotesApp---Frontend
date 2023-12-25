import logo from './logo.svg';
import './App.css';
import AllRoutes from './routes/AllRoutes';
import { Navbar } from './components/home page/navbar';

function App() {
  return (
    <div>
      <Navbar />
      <AllRoutes />
    </div>
  );
}

export default App;
