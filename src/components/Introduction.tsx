import { Button } from '@/components/ui/button';
import { IIntroduction } from '@/types/introduction';
import { ArrowRight, Target, Zap, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

const Introduction = () => {
  const [data, setData] = useState<IIntroduction>();  
  const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await fetch(
            "http://localhost:1337/api/global?populate[0]=block&populate[1]=block.introduction&populate[2]=block.introduction.ctaDiscoverMore&populate[3]=block.introduction.virtualElement"
          );
          if (!res.ok) throw new Error("Failed to fetch data");
  
          const json = await res.json();
          const items = json?.data.block[0].introduction ?? [];
          setData(items);
          console.log(items)
        } catch (err) {
          console.error("Error fetching nav items:", err);
        } finally {
          setLoading(false);
        }
      };  
      fetchData();
    }, []);
  if (loading) return <div>Loading...</div>

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
       {data && (
         <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              <span className="block text-primary">{data.heading}</span>
            </h2>
            
            {data.subHeading.map((item) => (
               <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {item.children.map((children) => (
                  children.text
                ))}
               </p>
            ))}         
            <Button className={data.ctaDiscoverMore.isButtonLink ? "btn-primary group mb-8" : "group mb-8"}>
              {data.ctaDiscoverMore.label}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

            {/* Visual Element */}
            <div className="relative items-center justify-center">
            <div className="glass-card p-8 hover-lift">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-4xl font-medium text-muted-foreground">{data.virtualHeading}</span>
                </div>           
                <div className="space-y-4">
                  {data.virtualElement.map((item) => (
                       <div className="flex justify-between text-xl mb-2">
                      <span>{item.key}</span>
                      <span className='text-primary font-bold'>{item.value}</span>
                    </div>
                  ))}
                  <div>           
                </div>                  
                   <div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-xl"></div>
          </div>
        </div>
       )}
      </div>
    </section>
  );
};

export default Introduction;