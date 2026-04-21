import { Routes, Route } from 'react-router-dom';
import Login from '../pages/login/Login'
import Register from '../pages/register/Register'
import Dashboard from '../pages/dashboard/Dashboard'
import Activities from '../pages/activities/Activities'
import BabyLogs from '../pages/baby-logs/BabyLogs'
import Body from '../components/body/Body'
import AddBabyLog from '../pages/baby-logs/addBabyLog'
import AddActivity from '../pages/activities/addActivity'
import EditBabyLog from '../pages/baby-logs/editBabyLog'

function RoutesList({auth, setAuth}) {
  
  return (
      <Routes>
      <Route path="/" element={<Body />}>
        <Route index element={auth ? <Dashboard /> : <Login setAuth={setAuth} />} />
        <Route path="login" element={<Login setAuth={setAuth} />} />
        <Route path="register" element={<Register />} />
        <Route path="baby-logs" element={auth ? <BabyLogs /> : <Login setAuth={setAuth} />} />
        <Route path="add-baby-log" element={auth ? <AddBabyLog /> : <Login setAuth={setAuth} />} />
        <Route path="edit-baby-log/:id" element={<EditBabyLog />} />
        <Route path="activities" element={auth ? <Activities /> : <Login setAuth={setAuth} />} />
        <Route path="add-activity" element={auth ? <AddActivity /> : <Login setAuth={setAuth} />} />
      </Route>
      </Routes>
  );
}

export default RoutesList;