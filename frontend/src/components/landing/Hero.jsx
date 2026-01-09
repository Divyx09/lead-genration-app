import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import heroImage from '../../assets/images/young-couple-examining-blueprints-with-real-estate-agent-while-buying-new-home 1.svg';

const Hero = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/leads`, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        message: 'Contact from lead generation form'
      });
      toast.success('Request submitted successfully!');
      setFormData({ name: '', email: '', phone: '', city: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit request');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="home" className="relative pt-16 pb-16 bg-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute  z-0">
        <img
          src={heroImage}
          alt="Business Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/20 to-transparent"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[600px]">
          {/* Left Content */}
          <div className="animate-slide-in">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Consultation,<br />
              Design,<br />
              <span className="text-primary">& Marketing</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
              We help businesses grow by connecting them with high-quality leads. 
              Our proven strategies ensure you reach your target audience effectively.
            </p>
          </div>

          {/* Right Appointment Form */}
          <div className="animate-fade-in">
            <div className="bg-[#2C4A6E] text-white rounded-lg shadow-2xl p-8 max-w-md ml-auto">
              <h2 className="text-3xl font-bold mb-6 leading-tight">MAKE AN<br />APPOINTMENT</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 bg-transparent border border-white/40 rounded text-white placeholder-white/80 focus:outline-none focus:border-white transition-colors"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Enter Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 bg-transparent border border-white/40 rounded text-white placeholder-white/80 focus:outline-none focus:border-white transition-colors"
                    required
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Mobile Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 bg-transparent border border-white/40 rounded text-white placeholder-white/80 focus:outline-none focus:border-white transition-colors"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Area, City"
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    className="w-full px-4 py-3 bg-transparent border border-white/40 rounded text-white placeholder-white/80 focus:outline-none focus:border-white transition-colors"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'SUBMITTING...' : 'Get Quick Quote'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
