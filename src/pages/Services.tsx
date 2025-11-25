import React from 'react';

const Services: React.FC = () => {
  // Mock data for services
  const services = [
    {
      id: 1,
      title: 'Монтаж новой кровли',
      description: 'Профессиональный монтаж кровли из различных материалов: металлочерепица, профнастил, битумная черепица и другие.',
      image: 'roof-installation'
    },
    {
      id: 2,
      title: 'Ремонт кровли',
      description: 'Качественный ремонт существующей кровли с использованием современных материалов и технологий.',
      image: 'roof-repair'
    },
    {
      id: 3,
      title: 'Утепление кровли',
      description: 'Утепление чердачных и мансардных помещений с применением энергоэффективных материалов.',
      image: 'roof-insulation'
    },
    {
      id: 4,
      title: 'Гидроизоляция',
      description: 'Полная гидроизоляция кровли и подкровельного пространства для защиты от протечек.',
      image: 'waterproofing'
    },
    {
      id: 5,
      title: 'Обустройство водостоков',
      description: 'Установка и ремонт систем водоотведения с гарантией надежной работы.',
      image: 'gutter-installation'
    },
    {
      id: 6,
      title: 'Обслуживание кровли',
      description: 'Регулярное обслуживание и профилактика кровли для продления срока службы.',
      image: 'roof-maintenance'
    }
  ];

  return (
    <div className="services-container">
      <div className="services-grid">
        {services.map(service => (
          <div key={service.id} className="service-card">
            <div className="service-icon">
              <div className="icon-placeholder">{service.image}</div>
            </div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;