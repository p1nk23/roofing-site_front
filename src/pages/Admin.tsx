import React, { useState, useEffect } from 'react';
import api from '../api/client';
import { PriceItem, FaqItem } from '../types';

const Admin: React.FC = () => {
  // Цены
  const [prices, setPrices] = useState<PriceItem[]>([]);
  const [newPrice, setNewPrice] = useState({ category: '', name: '', priceRange: '' });
  const [editingPriceId, setEditingPriceId] = useState<number | null>(null);
  const [editingPrice, setEditingPrice] = useState<PriceItem | null>(null);

  // FAQ
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [newFaq, setNewFaq] = useState({ question: '', answer: '' });
  const [editingFaqId, setEditingFaqId] = useState<number | null>(null);
  const [editingFaq, setEditingFaq] = useState<FaqItem | null>(null);

  useEffect(() => {
    fetchPrices();
    fetchFaqs();
  }, []);

  const fetchPrices = async () => {
    try {
      const res = await api.get<PriceItem[]>('/prices');
      setPrices(res.data);
    } catch (error) {
      console.error('Error fetching prices:', error);
    }
  };

  const fetchFaqs = async () => {
    try {
      const res = await api.get<FaqItem[]>('/faqs');
      setFaqs(res.data);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    }
  };

  const addPrice = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/prices', newPrice);
      setPrices([...prices, res.data]);
      setNewPrice({ category: '', name: '', priceRange: '' });
    } catch (error) {
      console.error('Error adding price:', error);
    }
  };

  const updatePrice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPrice) return;

    try {
      const res = await api.put(`/prices/${editingPrice.id}`, editingPrice);
      setPrices(prices.map(p => p.id === editingPrice.id ? res.data : p));
      setEditingPriceId(null);
      setEditingPrice(null);
    } catch (error) {
      console.error('Error updating price:', error);
    }
  };

  const deletePrice = async (id: number) => {
    try {
      await api.delete(`/prices/${id}`);
      setPrices(prices.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting price:', error);
    }
  };

  const addFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/faqs', newFaq);
      setFaqs([...faqs, res.data]);
      setNewFaq({ question: '', answer: '' });
    } catch (error) {
      console.error('Error adding FAQ:', error);
    }
  };

  const updateFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaq) return;

    try {
      const res = await api.put(`/faqs/${editingFaq.id}`, editingFaq);
      setFaqs(faqs.map(f => f.id === editingFaq.id ? res.data : f));
      setEditingFaqId(null);
      setEditingFaq(null);
    } catch (error) {
      console.error('Error updating FAQ:', error);
    }
  };

  const deleteFaq = async (id: number) => {
    try {
      await api.delete(`/faqs/${id}`);
      setFaqs(faqs.filter(f => f.id !== id));
    } catch (error) {
      console.error('Error deleting FAQ:', error);
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-section-content">
        <h3>Управление услугами</h3>

        {/* Add Price Form */}
        <div className="admin-form">
          <h4>{editingPrice ? 'Редактировать услугу' : 'Добавить новую услугу'}</h4>
          <form onSubmit={editingPrice ? updatePrice : addPrice}>
            <div className="form-group">
              <label>Категория:</label>
              <input
                type="text"
                value={editingPrice ? editingPrice.category : newPrice.category}
                onChange={(e) => editingPrice
                  ? setEditingPrice({...editingPrice, category: e.target.value})
                  : setNewPrice({...newPrice, category: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label>Название:</label>
              <input
                type="text"
                value={editingPrice ? editingPrice.name : newPrice.name}
                onChange={(e) => editingPrice
                  ? setEditingPrice({...editingPrice, name: e.target.value})
                  : setNewPrice({...newPrice, name: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label>Цена:</label>
              <input
                type="text"
                value={editingPrice ? editingPrice.priceRange : newPrice.priceRange}
                onChange={(e) => editingPrice
                  ? setEditingPrice({...editingPrice, priceRange: e.target.value})
                  : setNewPrice({...newPrice, priceRange: e.target.value})}
                required
              />
            </div>

            <button type="submit" className="submit-btn">
              {editingPrice ? 'Обновить' : 'Добавить'}
            </button>

            {editingPrice && (
              <button
                type="button"
                className="cancel-btn"
                onClick={() => {
                  setEditingPriceId(null);
                  setEditingPrice(null);
                }}
              >
                Отмена
              </button>
            )}
          </form>
        </div>

        {/* Prices List */}
        <div className="admin-list">
          <h4>Список услуг ({prices.length})</h4>
          {prices.length === 0 ? (
            <p>Нет добавленных услуг</p>
          ) : (
            <div className="items-grid">
              {prices.map(price => (
                <div key={price.id} className="item-card">
                  <div className="item-info">
                    <strong>{price.name}</strong> ({price.category}) - {price.priceRange}
                  </div>
                  <div className="item-actions">
                    <button
                      className="edit-btn"
                      onClick={() => {
                        setEditingPriceId(price.id);
                        setEditingPrice(price);
                      }}
                    >
                      Редактировать
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => deletePrice(price.id)}
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <h3 style={{ marginTop: '3rem' }}>Управление вопросами</h3>

        {/* Add FAQ Form */}
        <div className="admin-form">
          <h4>{editingFaq ? 'Редактировать вопрос' : 'Добавить новый вопрос'}</h4>
          <form onSubmit={editingFaq ? updateFaq : addFaq}>
            <div className="form-group">
              <label>Вопрос:</label>
              <input
                type="text"
                value={editingFaq ? editingFaq.question : newFaq.question}
                onChange={(e) => editingFaq
                  ? setEditingFaq({...editingFaq, question: e.target.value})
                  : setNewFaq({...newFaq, question: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label>Ответ:</label>
              <textarea
                value={editingFaq ? editingFaq.answer : newFaq.answer}
                onChange={(e) => editingFaq
                  ? setEditingFaq({...editingFaq, answer: e.target.value})
                  : setNewFaq({...newFaq, answer: e.target.value})}
                required
              />
            </div>

            <button type="submit" className="submit-btn">
              {editingFaq ? 'Обновить' : 'Добавить'}
            </button>

            {editingFaq && (
              <button
                type="button"
                className="cancel-btn"
                onClick={() => {
                  setEditingFaqId(null);
                  setEditingFaq(null);
                }}
              >
                Отмена
              </button>
            )}
          </form>
        </div>

        {/* FAQ List */}
        <div className="admin-list">
          <h4>Список вопросов ({faqs.length})</h4>
          {faqs.length === 0 ? (
            <p>Нет добавленных вопросов</p>
          ) : (
            <div className="items-grid">
              {faqs.map(faq => (
                <div key={faq.id} className="item-card">
                  <div className="item-info">
                    <strong>{faq.question}</strong>
                    <p>{faq.answer}</p>
                  </div>
                  <div className="item-actions">
                    <button
                      className="edit-btn"
                      onClick={() => {
                        setEditingFaqId(faq.id);
                        setEditingFaq(faq);
                      }}
                    >
                      Редактировать
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => deleteFaq(faq.id)}
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;