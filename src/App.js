import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Nav from './component/Nav';
import Sidebar from './component/Sidebar';
import Dashboard from './component/Dashboard';
import Task from './component/Task';
import OngoingProcess from './component/OngoingProcess';
import InitiatedByMe from './component/InitiatedByMe';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from './Themes';
import { Login } from './component/Login';
// import LoadingPage from './component/LoadingPage';
import Popup from './component/Popup';
import EditedPDFViewer from './component/EditedPDFViewer';
// import '../src/index.css';


const ProtectedRoute = ({ loggedin, isAuthenticated }) => {
  return isAuthenticated || loggedin ? <Navigate to="/login" /> : null;
};

function App(props) {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [isAuthenticated, setIsAuthenticated] =  useState(
    !!localStorage.getItem('isloggedin')); 
  const{handleLogout} = props
  const{handleout} =props
  const loggedin = window.localStorage.getItem("isloggedin")

  const handleLogin = () => {
    setIsAuthenticated(true); 
    window.localStorage.setItem("isloggedin", "true");
    console.log(handleLogin)
  };

  return (
    <ColorModeContext.Provider value={colorMode}>

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Nav setIsSidebar={setIsSidebar} handleLogout={handleLogout} handleout={handleout} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/task" element={<Task />} />
              <Route path="/ongoingprocess" element={<OngoingProcess />} />
              <Route path="/initiatedbyme" element={<InitiatedByMe />} />
              {/* <Route path="/sidebar" element={<Sidebar />} /> */}
              {/* Use a conditional to render Login */}
              {isAuthenticated || loggedin ? (
                <Route path="/login" element={<Navigate to="/" />} />
              ) : (
                <Route path="/login" element={<Login handleLogin={handleLogin} />} />
              )}
            </Routes>
          </main>
{/* <Sidebar/> */}
        </div>
      </ThemeProvider>

    </ColorModeContext.Provider>
  );
}

export default App;
