import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import PlayersPage from "scenes/playersPage"
import LoginPage from "scenes/loginPage"; 

import { CssBaseline } from "@mui/material";

function App() {


  return (
    <div className="app">
      <BrowserRouter>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/players" element={<PlayersPage /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
