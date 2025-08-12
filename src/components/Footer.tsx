import { ArrowUp, Facebook, Linkedin, MessageCircle, Mail, Phone, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { IFooter } from '@/types/footer';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://www.facebook.com/Creativepointvietnam' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/company/point-creative-vn/mycompany/' },
    { name: 'Zalo OA', icon: MessageCircle, href: '#zalo' }
  ];

  const [footerDatas, setFootersData] = useState<IFooter>();
  
      const [loading, setLoading] = useState(true);
      const baseUrl = import.meta.env.VITE_API_URL;

      useEffect(() => {
        const fetchFootersData = async () => {
          try {
            const res = await fetch(
              baseUrl+ "/api/footer?populate[block1][populate]=logo_footer&populate[block2][populate]&populate[block3][populate]&populate[block4][populate]=social_icon"
            );
            if (!res.ok) throw new Error("Failed to fetch data");
    
            const json = await res.json();
            const items = json?.data ?? [];
            setFootersData(items);
            console.log(items)
          } catch (err) {
            console.error("Error fetching footer:", err);
          } finally {
            setLoading(false);
          }
        };      
        fetchFootersData();
      }, []);
    if (loading) return <div>Loading...</div>

  return (
    <footer className="relative bg-background border-t border-white/10">
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 glass opacity-60"></div>
      
      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {footerDatas && (
             <>
               {/* Company Info */}
              <div className="space-y-6">
              <div>
                <img src={import.meta.env.VITE_API_URL + footerDatas.block1[0].logo_footer.formats.thumbnail.url} alt="logo-footer"/>
              </div>             
            </div>

            {/* Quick Links */}
            <div>
              <ul className="space-y-3">
                {footerDatas.block2.map((link) => (
                  <li key={link.title}>
                    <a 
                      href={link.link}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <ul className="space-y-3">
                {footerDatas.block3.map((service) => (
                  <li key={service.title}>
                    <a 
                      href={service.link}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {service.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="font-semibold text-foreground mb-3">Follow Us</h4>
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors group"
                    aria-label={social.name}
                  >                
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
             </>
            )}
        
            {/* Bottom Bar */}
            <div className="border-t border-white/20">
              <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                  {/* Back to Top */}
                  <Button
                    onClick={scrollToTop}
                    variant="outline"
                    size="sm"
                    className="btn-glass group"
                  >
                    Back to Top
                    <ArrowUp className="ml-2 w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/20">
              <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                  <p className="text-sm text-muted-foreground">
                    © 2025 CreativePoint. All rights reserved.
                  </p>                
                </div>
              </div>
            </div>
      </div>
    </footer>
  );
};

export default Footer;