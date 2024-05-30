import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import PlayersPage from "scenes/playersPage"
import LoginPage from "scenes/loginPage"; 
import NewsPage from "scenes/newsPage";
import ShopPage from "scenes/shopPage/Store"
import ProductPage from "scenes/shopPage/ProductPage";

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
          <Route path="/news/:id" element={<NewsPage /> } />
          <Route path="/store" element={<ShopPage /> } />
          <Route path="/productName:id" element={<ProductPage /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
