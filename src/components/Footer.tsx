import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer style={{ padding: '1rem', textAlign: 'center', borderTop: '1px solid #ddd', marginTop: '2rem' }}>
      © {new Date().getFullYear()} Моя кровельная компания
    </footer>
  );
};

export default Footer;