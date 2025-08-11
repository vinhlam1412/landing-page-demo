import { Button } from '@/components/ui/button';
import { IService } from '@/types/IService';
import { ArrowRight, Smartphone, TrendingUp, Users, BarChart3 } from 'lucide-react';
import { useEffect, useState } from 'react';

const Services = () => {
   const [data, setData] = useState<IService>();  
   const [loading, setLoading] = useState(true);
    
      useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await fetch(
              "https://strapi-demo-zp2l.onrender.com/api/global?populate[0]=block&populate[1]=block.feature&populate[2]=block.feature.icon&populate[3]=block.feature.featureItem&populate[4]=block.feature.ctaViewDetail"
            );
            if (!res.ok) throw new Error("Failed to fetch data");
    
            const json = await res.json();
            const items = json?.data.block[1] ?? [];
            setData(items);
            console.log("service",items)
          } catch (err) {
            console.error("Error fetching servic", err);
          } finally {
            setLoading(false);
          }
        };  
        fetchData();
      }, []);
  if (loading) return <div>Loading...</div>

  return (
    <section id="services" className="bg-background">
      <div className="container mx-auto px-4">
        {data && (
          <>
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            <span className="block text-primary">{data.title}</span>
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.feature.map((service, index) => (
            <div 
              key={index}
              className="glass-card hover-lift group cursor-pointer"
            >
                <div className={`w-16 h-16 bg-gradient-to-br rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <img src={"https://strapi-demo-zp2l.onrender.com" + service.icon.formats.thumbnail.url}/>
               </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-foreground mb-4">
                {service.title}
              </h3>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {service.featureItem.map((featureItem) => (
                  <li key={featureItem.id} className="flex items-center text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></div>
                    {featureItem.title}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                {service.ctaViewDetail.label}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          ))}
        </div>
          </>
        )}
   
      </div>
    </section>
  );
};

export default Services;