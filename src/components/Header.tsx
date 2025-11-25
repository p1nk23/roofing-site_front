import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header style={{ padding: '1rem', background: '#f8f9fa', borderBottom: '1px solid #ddd' }}>
      <nav>
        <Link to="/" style={{ marginRight: '1rem' }}>Главная</Link>
        <Link to="/services" style={{ marginRight: '1rem' }}>Услуги</Link>
        <Link to="/prices" style={{ marginRight: '1rem' }}>Цены</Link>
        <Link to="/faq" style={{ marginRight: '1rem' }}>Вопросы</Link>
        <Link to="/estimate" style={{ marginRight: '1rem' }}>Узнать стоимость</Link>
        <Link to="/admin" style={{ marginRight: '1rem', color: 'red' }}>Админка</Link>
      </nav>
    </header>
  );
};

export default Header;