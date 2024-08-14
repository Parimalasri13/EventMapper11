import './App.css';
import { Routes,Route } from 'react-router-dom';
import Slokas from './Pages/chatwithus';
import Navbar from './Pages/Navbar';
import Footer from './Pages/Footer';
import MythPageHandle from './Pages/EventsPage/MythPageHandle'
import Home from './Pages/Home';
import About from './Pages/About';
import Signin from './Pages/SignUP';
import EventPage from './Pages/EventsPage/EventPage';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div>
    <Toaster
    position="bottom-left"
        containerStyle={{
          position: 'fixed',
          bottom: '0',
          left: '0',
          margin: '16px',
          zIndex: '9999', // Ensure it's above other content
        }}
        toastOptions={{
          style: {
            marginBottom: '4px', // Space between toasts
          },
        }} />
      <Navbar/>
     
      <Routes>
        <Route path='/Read' element={<Slokas/>}/>
        <Route path='/Myths' element={<MythPageHandle/>}/>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Signin" element={<Signin />} />
        {/* <Route path='/Desavataras' element={<Desavataras/>}/>  */}
         <Route path="/:mythName" element={<EventPage />} /> 
      </Routes>
      <Footer/> 
      
    </div>
  );
}

export default App;
