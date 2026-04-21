import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import RoutesList from './routes/routesList';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  const [auth, setAuth] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    // Function to fetch data
    const verifyToken = async () => {
      const authToken = localStorage.getItem("token");
      if(authToken){
        try {
          const response = await fetch('http://localhost:3001/api/auth/verify-token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          const data = await response.json();
          setAuth(data.user);
        } catch (error) {
          console.error("Token verify failed");
          setAuth(false);
        }
      }else{
        console.log("Empty token")
        setAuth(false); 
      }
    };

    // Call the verify token function
    verifyToken();
  }, []); 
  
  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
        <Header auth={auth} setAuth={setAuth} />
        <RoutesList auth={auth} setAuth={setAuth} />
        <Footer />
    </div>
  );
}

export default App;
