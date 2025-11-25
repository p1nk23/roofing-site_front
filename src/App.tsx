import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Services from './pages/Services';
import Prices from './pages/Prices';
import Faq from './pages/Faq';
import EstimateForm from './pages/EstimateForm';
import Admin from './pages/Admin';
import './App.css'
import './index.css'

const App: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const navigate = useNavigate();

  // Admin credentials
  const validUsername = 'admin';
  const validPassword = 'password123'; // In a real app, this would be handled securely

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminUsername === validUsername && adminPassword === validPassword) {
      setIsAdmin(true);
      setShowAdminLogin(false);
      setAdminUsername('');
      setAdminPassword('');
    } else {
      alert('Неверный логин или пароль');
    }
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
  };

  // Scroll to section function
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Prevent routing to individual pages by redirecting to home
  useEffect(() => {
    const handlePopState = () => {
      navigate('/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);

  return (
    <div className="app">
      {/* Header */}
      <header className="site-header">
        <div className="container">
          <div className="header-content">
            <h1 className="logo">Моя кровельная компания</h1>
            <nav className="nav-menu">
              <button onClick={() => scrollToSection('services')} className="nav-link">Услуги</button>
              <button onClick={() => scrollToSection('prices')} className="nav-link">Цены</button>
              <button onClick={() => scrollToSection('faq')} className="nav-link">Вопросы</button>
              <button onClick={() => scrollToSection('estimate')} className="nav-link">Узнать стоимость</button>
              {!isAdmin ? (
                <button
                  onClick={() => setShowAdminLogin(!showAdminLogin)}
                  className="admin-login-btn"
                >
                  Админка
                </button>
              ) : (
                <button
                  onClick={handleAdminLogout}
                  className="admin-logout-btn"
                >
                  Выйти
                </button>
              )}
            </nav>
          </div>
        </div>

        {/* Admin Login Modal */}
        {showAdminLogin && !isAdmin && (
          <div className="admin-login-modal">
            <div className="admin-login-form">
              <h3>Вход в админку</h3>
              <form onSubmit={handleAdminLogin}>
                <input
                  type="text"
                  placeholder="Логин"
                  value={adminUsername}
                  onChange={(e) => setAdminUsername(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Пароль"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  required
                />
                <button type="submit">Войти</button>
              </form>
              <button
                className="close-modal-btn"
                onClick={() => setShowAdminLogin(false)}
              >
                Закрыть
              </button>
            </div>
          </div>
        )}
      </header>

      <main className="main-content">
        {/* Hero Section */}
        <section id="hero" className="hero-section">
          <div className="container">
            <h1>Профессиональные кровельные работы</h1>
            <p>Качественные услуги по ремонту и монтажу кровли любой сложности</p>
            <button
              onClick={() => scrollToSection('estimate')}
              className="cta-button"
            >
              Заказать расчет
            </button>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="section">
          <div className="container">
            <h2>Наши услуги</h2>
            <Services />
          </div>
        </section>

        {/* Prices Section */}
        <section id="prices" className="section">
          <div className="container">
            <h2>Цены</h2>
            <Prices />
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="section">
          <div className="container">
            <h2>Часто задаваемые вопросы</h2>
            <Faq />
          </div>
        </section>

        {/* Estimate Section */}
        <section id="estimate" className="section">
          <div className="container">
            <h2>Узнать стоимость</h2>
            <EstimateForm />
          </div>
        </section>

        {/* Admin Section (only visible to admin) */}
        {isAdmin && (
          <section id="admin" className="section admin-section">
            <div className="container">
              <h2>Панель управления</h2>
              <Admin />
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <div className="container">
          <p>© {new Date().getFullYear()} Моя кровельная компания. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;