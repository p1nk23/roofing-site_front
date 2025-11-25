import React, { useState } from 'react';
import api from '../api/client';

const EstimateForm: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
    } catch (err) {
      alert('Ошибка отправки заявки');
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Узнать стоимость</h1>
      {success ? (
        <p style={{ color: 'green' }}>Заявка отправлена! Мы скоро свяжемся с вами.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label>Имя: <input value={name} onChange={e => setName(e.target.value)} required /></label>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Телефон: <input value={phone} onChange={e => setPhone(e.target.value)} required /></label>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Сообщение: <textarea value={message} onChange={e => setMessage(e.target.value)} /></label>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Фото крыши: <input type="file" accept="image/*" onChange={e => setImage(e.target.files?.[0] || null)} /></label>
          </div>
          <button type="submit">Отправить</button>
        </form>
      )}
    </div>
  );
};

export default EstimateForm;