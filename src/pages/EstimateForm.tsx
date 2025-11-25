import React, { useState } from 'react';
import api from '../api/client';

const EstimateForm: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('phone', phone);
    if (message) formData.append('message', message);
    if (image) formData.append('image', image);

    try {
      await api.post('/estimates', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setSuccess(true);
      setName('');
      setPhone('');
      setMessage('');
      setImage(null);
    } catch (err) {
      alert('Ошибка отправки заявки');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="estimate-form-container">
      {success ? (
        <div className="success-message">
          <h3>Спасибо за заявку!</h3>
          <p>Мы свяжемся с вами в ближайшее время для уточнения деталей.</p>
          <button
            className="reset-form-btn"
            onClick={() => setSuccess(false)}
          >
            Отправить ещё одну заявку
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="estimate-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Имя *</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                placeholder="Ваше имя"
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Телефон *</label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                required
                placeholder="+7 (___) ___-__-__"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="message">Сообщение</label>
            <textarea
              id="message"
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Опишите вашу задачу или задайте вопрос"
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Фото крыши (необязательно)</label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={e => setImage(e.target.files?.[0] || null)}
            />
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Отправляем...' : 'Получить расчет'}
          </button>
        </form>
      )}
    </div>
  );
};

export default EstimateForm;