import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Introduction from '@/components/Introduction';
import Services from '@/components/Services';
import CaseStudies from '@/components/CaseStudies';
import Clients from '@/components/Clients';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Introduction />
      <Services />
      <CaseStudies />
      <Clients />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Index;
