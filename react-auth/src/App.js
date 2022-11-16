import './App.css';
import Register from './components/Register'
import Login from './components/Login';
import Home from './components/Home';
import Layout  from './components/Layout';
import Unauthorized from './components/Unauthorized';
import {Routes, Route} from 'react-router-dom';


const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
}

function App() {
  return (
    <main className="App">
      <Routes>
        <Route path='/' element={<Layout/>}>
        <Route path='login' element={<Login/>}/>
        <Route path='register' element={<Register/>}/>

        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="/" element={<Home />} />
        </Route>

       
        </Route>
      </Routes>
    </main>
  );
}

export default App;
