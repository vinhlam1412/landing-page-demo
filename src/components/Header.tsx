import { useState, useEffect } from 'react';
import { ChevronDown, Globe, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { IMenuItem } from '@/types/navItem';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    { name: 'Marketing Số', href: '#digital' },
    { name: 'Thương mại', href: '#trade' },
    { name: 'Tiếp thị liên kết', href: '#affiliate' },
    { name: 'Công nghệ Marketing', href: '#martech' }
  ];

  const caseStudies = [
    { name: 'Theo ngành nghề', href: '#industry' },
    { name: 'Theo dịch vụ', href: '#service' }
  ];

  const [navItemsData, setNavItemsData] = useState<IMenuItem[]>([]);
  const [logo, setLogo] = useState();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNavItems = async () => {
      try {
        const res = await fetch(
          "https://strapi-demo-zp2l.onrender.com/api/global?populate[header_menu][populate][menu_items][populate]=childrens"
        );
        if (!res.ok) throw new Error("Failed to fetch data");

        const json = await res.json();
        const items = json?.data?.header_menu?.menu_items ?? [];
        setNavItemsData(items);
        console.log(items)
      } catch (err) {
        console.error("Error fetching nav items:", err);
      } finally {
        setLoading(false);
      }
    };

     const fetchLogo = async () => {
      try {
        const res = await fetch(
          //"https://strapi-demo-zp2l.onrender.com/api/global?populate[header][populate][0]=logo.image"
          "https://strapi-demo-zp2l.onrender.com/api/global?populate=header_menu.logo_header"
        );
        if (!res.ok) throw new Error("Failed to fetch data");

        const json = await res.json();
        const items = json?.data?.header_menu?.logo_header.formats.thumbnail.url ?? [];
        setLogo(items);
        console.log(items)
      } catch (err) {
        console.error("Error fetching nav items:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLogo();
    fetchNavItems();
  }, []);
if (loading) return <div>Loading...</div>
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'glass-nav shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
             <img className='w-36' src={"https://strapi-demo-zp2l.onrender.com" + logo} alt="logo-header"/>
          </div>

          {navItemsData.map((item) => (
             <div key={item.id}>
              {/* Desktop Navigation */}
                <nav key={item.id} className="hidden lg:flex items-center space-x-8">  
                  {/* Services Dropdown */}
                  {item.childrens.length > 0 ? (
                      <div 
                          className="relative"
                          onMouseEnter={() => setActiveDropdown(item.title)}
                          onMouseLeave={() => setActiveDropdown(null)}
                        >
                          <button className="flex items-center text-foreground hover:text-primary transition-colors">
                            {item.title} <ChevronDown className="ml-1 w-4 h-4" />
                          </button>
                          {activeDropdown === item.title && (
                            <div className="absolute top-full left-0 mt-2 glass-card min-w-48 py-2">
                              {item.childrens.map((service) => (
                                <a
                                  key={service.id}
                                  href={service.url}
                                  className="block px-4 py-2 text-foreground hover:text-primary hover:bg-white/10 transition-colors"
                                >
                                  {service.title}
                                </a>
                              ))}
                            </div>
                          )}
                      </div>    
                  ) : (
                    item.isButtonLink === true ? (
                      <div className="hidden lg:flex items-center space-x-4">
                        {/* <button className="flex items-center text-foreground hover:text-primary transition-colors">
                          <Globe className="w-4 h-4 mr-1" />
                          VNI / ENG
                        </button> */}
                        <Button className="btn-primary">
                          {item.title}
                        </Button>
                      </div>
                      ) : (
                      <a href="" className="text-foreground hover:text-primary transition-colors">
                        {item.title}
                      </a>
                    )               
                  )}     
                </nav>   

              {/* Mobile Menu Button */}
              <button 
                className="lg:hidden text-foreground"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X /> : <Menu />}
              </button>
             </div>
          ))}      
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden glass-card mt-4 p-4">
            <nav className="space-y-4">
              <a href="#home" className="block text-foreground hover:text-primary transition-colors">
                Home
              </a>
              <a href="#about" className="block text-foreground hover:text-primary transition-colors">
                About
              </a>
              <div>
                <p className="font-medium text-foreground mb-2">Services</p>
                <div className="ml-4 space-y-2">
                  {services.map((service) => (
                    <a
                      key={service.name}
                      href={service.href}
                      className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {service.name}
                    </a>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-medium text-foreground mb-2">Case Studies</p>
                <div className="ml-4 space-y-2">
                  {caseStudies.map((study) => (
                    <a
                      key={study.name}
                      href={study.href}
                      className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {study.name}
                    </a>
                  ))}
                </div>
              </div>
              <a href="#partners" className="block text-foreground hover:text-primary transition-colors">
                Partners & Clients
              </a>
              <a href="#news" className="block text-foreground hover:text-primary transition-colors">
                News / Blog
              </a>
              <a href="#contact" className="block text-foreground hover:text-primary transition-colors">
                Contact
              </a>
              <div className="pt-4 border-t border-white/20">
                <button className="flex items-center text-foreground hover:text-primary transition-colors mb-4">
                  <Globe className="w-4 h-4 mr-1" />
                  VNI / ENG
                </button>
                <Button className="btn-primary w-full">
                  Request Consultation
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;