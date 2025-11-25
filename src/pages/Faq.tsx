import React, { useEffect, useState } from 'react';
import api from '../api/client';
import { FaqItem } from '../types';

const Faq: React.FC = () => {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    api.get<FaqItem[]>('/faqs').then(res => setFaqs(res.data));
  }, []);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={faq.id} className="faq-item">
            <button
              className={`faq-question ${openIndex === index ? 'active' : ''}`}
              onClick={() => toggleAccordion(index)}
            >
              {faq.question}
              <span className={`faq-icon ${openIndex === index ? 'open' : ''}`}>+</span>
            </button>
            <div className={`faq-answer ${openIndex === index ? 'visible' : ''}`}>
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;