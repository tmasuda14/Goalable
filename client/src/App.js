import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
// pages and components
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Create from './components/Create'

import Browse from './pages/Browse'
import EditGoal from './components/EditGoal'
// import Register from './components/Register'
// import Login from './components/Login'
import Register from './pages/Register'
import Login from './pages/Login'
import Pledge from './components/Pledge'
import Contribute from './components/Contribute'
// import Calendar from 'react-calendar'

function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
                path="/"
                element={<Browse />}
              />
            <Route
              path="/home"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/create"
              element={user ? <Create /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/home" />}
            />
            <Route
              path="/edit/:id"
              element={<EditGoal />}
            />
             <Route
              path="/register"
              element={!user ? <Register /> : <Navigate to="/home" />}
            />
            <Route
              path="/:id"
              element={user ? <Pledge /> : <Navigate to="/login" />}
            />
            <Route
              path="/:id"
              element={user ? <Contribute /> : <Navigate to="/login" />}
            />
            
            
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
