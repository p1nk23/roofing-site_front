import React, { useEffect, useState } from 'react';
import api from '../api/client';
import { PriceItem } from '../types';

const Prices: React.FC = () => {
  const [prices, setPrices] = useState<PriceItem[]>([]);

  useEffect(() => {
    api.get<PriceItem[]>('/prices').then(res => setPrices(res.data));
  }, []);

  // Group by categories
  const grouped = prices.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, PriceItem[]>);

  return (
    <div className="prices-container">
      <p className="prices-intro">Точный расчёт возможен после осмотра специалистом.</p>

      {Object.entries(grouped).map(([category, items]) => (
        <div key={category} className="price-category">
          <h3 className="category-title">{category}</h3>
          <div className="price-items-grid">
            {items.map(item => (
              <div key={item.id} className="price-item-card">
                <div className="price-name">{item.name}</div>
                <div className="price-value">{item.priceRange}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Prices;