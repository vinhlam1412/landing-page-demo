import { IClient } from '@/types/client';
import { Star, Quote } from 'lucide-react';
import { useEffect, useState } from 'react';

const Clients = () => {
    const [data, setData] = useState<IClient>();  
    const [loading, setLoading] = useState(true);
    
      useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await fetch(
              "http://localhost:1337/api/global?populate[0]=block&populate[1]=block.clientLogo&populate[2]=block.clientLogo.image&populate[3]=block.testimonial"
            );
            if (!res.ok) throw new Error("Failed to fetch data");
    
            const json = await res.json();
            const items = json?.data.block[3] ?? [];
            setData(items);
            console.log("client",items)
          } catch (err) {
            console.error("Error fetching client", err);
          } finally {
            setLoading(false);
          }
        };  
        fetchData();
      }, []);
  if (loading) return <div>Loading...</div>


  return (
  <section id="clients" className="py-20 bg-background">
    <div className="container mx-auto px-4">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
          <span className="block text-primary">{data.title}</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {data.description}
        </p>
      </div>

      {/* Client Logos */}
      <div className="glass-card p-12 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-20 items-center">
          {data.clientLogo.map((client, index) => (
            <div 
              key={client.id}
              className="text-center group cursor-pointer"
            >
              <div className="bg-white/10 rounded-xl p-2 h-20 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <span className="text-foreground font-semibold text-sm opacity-70 group-hover:opacity-100 transition-opacity">
                    <img className='mb-2' src={"http://localhost:1337" + client.image.formats.thumbnail.url}/>               
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid lg:grid-cols-2 gap-8">
          {data.testimonial.map((testimonial, index) => (
            <div key={index} className="glass-card hover-lift">
              {/* Quote Icon */}
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <Quote className="w-6 h-6 text-primary" />
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-lg text-foreground mb-6 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="border-t border-white/20 pt-4">
                <div className="font-semibold text-foreground">
                  {testimonial.author}
                </div>
                <div className="text-sm text-muted-foreground">
                  {testimonial.position}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;