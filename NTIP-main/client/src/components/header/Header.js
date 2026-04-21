import {Link, useNavigate} from 'react-router-dom';

function Header({auth, setAuth}) {
  console.log("AUTH HEADER:", auth);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuth(false);
    navigate('/login');
  };
  return (
    <header className="bg-blue-500 p-4">
      <div className="flex flex-row mx-auto">
        <Link to="/" className="text-white text-2xl font-bold w-full">Baby Care</Link>
        <div className='flex items-center gap-6'>
          {auth ? (
            <>
              <Link to="/baby-logs" className="bg-white/40 text-gray-800 px-4 py-2 rounded-full font-medium whitespace-nowrap hover:bg-white/60 transition shadow-sm">Baby Logs</Link>
              <Link to="/activities" className="bg-white/40 text-gray-800 px-4 py-2 rounded-full font-medium whitespace-nowrap hover:bg-white/60 transition shadow-sm">Activities</Link>
            </>
          ):(
            <></>
          )}
        </div>
        <div className="flex justify-end font-bold text-white w-full">
          {!auth ? (
          <>
          <Link to="/login" className="mr-2">Login</Link>
          <Link to="/register">Register</Link>
          </>) : (
            <button onClick={handleLogout} className="mr-2">Logout</button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
