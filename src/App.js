import './App.css';
import { Navigation } from './routes/Navigation';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context/AuthContext';
function App() {
  return (
    <AuthProvider>
      <Navigation />
      <ToastContainer
        position='bottom-center'
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
    </AuthProvider>
  );
}

export default App;
