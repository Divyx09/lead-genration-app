import Header from '../components/landing/Header';
import Hero from '../components/landing/Hero';
import Services from '../components/landing/Services';
import About from '../components/landing/About';
import Projects from '../components/landing/Projects';
import Testimonials from '../components/landing/Testimonials';
import Footer from '../components/landing/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <About />
      <Projects />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default LandingPage;
