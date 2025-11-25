import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Prices from './pages/Prices';
import Faq from './pages/Faq';
import EstimateForm from './pages/EstimateForm';
import Admin from './pages/Admin';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/prices" element={<Prices />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/estimate" element={<EstimateForm />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;