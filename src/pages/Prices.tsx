import React, { useEffect, useState } from 'react';
import api from '../api/client';
import { PriceItem } from '../types';

const Prices: React.FC = () => {
  const [prices, setPrices] = useState<PriceItem[]>([]);

  useEffect(() => {
    api.get<PriceItem[]>('/prices').then(res => setPrices(res.data));
  }, []);

  // Группировка по категориям
  const grouped = prices.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, PriceItem[]>);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Цены на кровельные работы</h1>
      <p>Точный расчёт возможен после осмотра специалистом.</p>

      {Object.entries(grouped).map(([category, items]) => (
        <div key={category} style={{ marginBottom: '2rem' }}>
          <h2>{category}</h2>
          <table border={1} cellPadding={8} style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>Услуга</th>
                <th>Цена</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.priceRange}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default Prices;