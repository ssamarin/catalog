import React from 'react';
import {
  BrowserRouter as Router,
  Routes, Route,
  Navigate,
} from 'react-router-dom';

import Header from '../Header';
import MainPage from '../../pages/MainPage';
import AboutUs from '../../pages/AboutUs';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
