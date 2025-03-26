import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Navbar from "./components/Navbar";
import ArticlesPage from "./pages/ArticlesPage";
import UploadPage from "./pages/UploadPage";
import "./App.css";

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="app">
          <Navbar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<ArticlesPage />} />
              <Route path="/subida" element={<UploadPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
