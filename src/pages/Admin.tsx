import React, { useState, useEffect } from 'react';
import api from '../api/client';
import { PriceItem, FaqItem } from '../types';

const Admin: React.FC = () => {
  // Цены
  const [prices, setPrices] = useState<PriceItem[]>([]);
  const [newPrice, setNewPrice] = useState({ category: '', name: '', priceRange: '' });

  // FAQ
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [newFaq, setNewFaq] = useState({ question: '', answer: '' });

  useEffect(() => {
    api.get<PriceItem[]>('/prices').then(res => setPrices(res.data));
    api.get<FaqItem[]>('/faqs').then(res => setFaqs(res.data));
  }, []);

  const addPrice = async () => {
    const res = await api.post('/prices', newPrice);
    setPrices([...prices, res.data]);
    setNewPrice({ category: '', name: '', priceRange: '' });
  };

  const addFaq = async () => {
    const res = await api.post('/faqs', newFaq);
    setFaqs([...faqs, res.data]);
    setNewFaq({ question: '', answer: '' });
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Админка</h1>

      <h2>Добавить услугу</h2>
      <div>
        <input placeholder="Категория" value={newPrice.category} onChange={e => setNewPrice({...newPrice, category: e.target.value})} />
        <input placeholder="Название" value={newPrice.name} onChange={e => setNewPrice({...newPrice, name: e.target.value})} />
        <input placeholder="Цена" value={newPrice.priceRange} onChange={e => setNewPrice({...newPrice, priceRange: e.target.value})} />
        <button onClick={addPrice}>Добавить</button>
      </div>

      <h2>Добавить вопрос</h2>
      <div>
        <input placeholder="Вопрос" value={newFaq.question} onChange={e => setNewFaq({...newFaq, question: e.target.value})} />
        <textarea placeholder="Ответ" value={newFaq.answer} onChange={e => setNewFaq({...newFaq, answer: e.target.value})} />
        <button onClick={addFaq}>Добавить</button>
      </div>

      <h2>Текущие данные</h2>
      <details><summary>Цены ({prices.length})</summary><pre>{JSON.stringify(prices, null, 2)}</pre></details>
      <details><summary>FAQ ({faqs.length})</summary><pre>{JSON.stringify(faqs, null, 2)}</pre></details>
    </div>
  );
};

export default Admin;