import './App.css';
import Home from './pages/Home';
import Header from './components/Header';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Planmytrip from './pages/Planmytrip';
import Test1 from './pages/Test1';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Recommendation from './pages/Recommendation';

function App() {

  const theme = createTheme();
  return (
    <BrowserRouter>
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header />

        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/recommendation" element={<Recommendation />}></Route>
          <Route exact path="/planmytrip" element={<Planmytrip />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/signup" element={<Signup />}></Route>
          <Route exact path="/test1" element={<Test1 />}></Route>

        </Routes>

      </div>
    </ThemeProvider>
      
    </BrowserRouter>
  );
}

export default App;
