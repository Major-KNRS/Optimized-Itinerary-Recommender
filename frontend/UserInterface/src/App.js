import { useEffect } from 'react';
import './App.css';
import Home from './pages/Home';
import Header from './components/Header';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Test1 from './pages/Test1';
import Login from './pages/Login/Login';
import Signup from './pages/Signup';
import PlanmytripA from './pages/AfterLoggedIn/PlanmytripA';
import RecommendationA from './pages/AfterLoggedIn/RecommendationA';
import LoginA from './pages/AfterLoggedIn/LoginA';

function App() {
  const theme = createTheme();

  return (
    <BrowserRouter>
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header />

        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/recommendation" element={<RecommendationA/>}></Route>
          <Route exact path="/planmytrip" element={<PlanmytripA/>}> </Route>
          <Route exact path="/login" element={<LoginA />}></Route>
          <Route exact path="/signup" element={<Signup/>}></Route>
          <Route exact path="/test1" element={<Test1 />}></Route>

        </Routes>

      </div>
    </ThemeProvider>
      
    </BrowserRouter>
  );
}

export default App;
