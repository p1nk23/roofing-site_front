import React, { useEffect, useState } from 'react';
import api from '../api/client';
import { FaqItem } from '../types';

const Faq: React.FC = () => {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);

  useEffect(() => {
    api.get<FaqItem[]>('/faqs').then(res => setFaqs(res.data));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Вопросы и ответы</h1>
      {faqs.map(faq => (
        <div key={faq.id} style={{ marginBottom: '1.5rem' }}>
          <h3>{faq.question}</h3>
          <p>{faq.answer}</p>
        </div>
      ))}
    </div>
  );
};

export default Faq;