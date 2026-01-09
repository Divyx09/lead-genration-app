import { FaDollarSign, FaPaintBrush, FaHome } from 'react-icons/fa';

const Services = () => {
  const services = [
    {
      icon: <FaDollarSign className="w-12 h-12" />,
      title: 'Financial Services',
      description: 'Comprehensive financial solutions tailored to your business needs. From investment planning to financial consulting.',
      features: ['Investment Planning', 'Financial Consulting', 'Risk Management', 'Tax Optimization'],
    },
    {
      icon: <FaPaintBrush className="w-12 h-12" />,
      title: 'Creative Design',
      description: 'Stunning designs that captivate your audience and elevate your brand presence in the market.',
      features: ['Brand Identity', 'UI/UX Design', 'Marketing Materials', 'Web Design'],
    },
    {
      icon: <FaHome className="w-12 h-12" />,
      title: 'Real Estate',
      description: 'Expert real estate services to help you find the perfect property or sell at the best price.',
      features: ['Property Search', 'Market Analysis', 'Investment Advice', 'Negotiation Support'],
    },
  ];

  return (
    <section id="services" className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-gray-900 mb-4">Why Choose Us?</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-8 text-center hover:shadow-xl transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-primary mb-6 flex justify-center">{service.icon}</div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
