import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';
import { useEffect, useState } from 'react';
import { IHeroBanner } from '@/types/heroBanner';

const Hero = () => {
  const [heroBannerDatas, setHeroBannerDatas] = useState<IHeroBanner>();  
  const [loading, setLoading] = useState(true);
      
  useEffect(() => {
    const fetchHeroBannerDatas = async () => {
      try {
        const res = await fetch(
          "http://localhost:1337/api/global?populate[0]=heroBanner&populate[1]=heroBanner.primaryCTA&populate[2]=heroBanner.secondaryCTA&populate[3]=heroBanner.backgroundMedia&populate[4]=heroBanner.card"
        );
        if (!res.ok) throw new Error("Failed to fetch data");

        const json = await res.json();
        const items = json?.data.heroBanner ?? [];
        setHeroBannerDatas(items);
        console.log(items)
      } catch (err) {
        console.error("Error fetching hero banner:", err);
      } finally {
        setLoading(false);
      }
    };      
    fetchHeroBannerDatas();
  }, []);
  if (loading) return <div>Loading...</div>

  return ( 
     <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
    {heroBannerDatas && (
     <>
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={"http://localhost:1337"+ heroBannerDatas.backgroundMedia.formats.large.url} 
          alt="Digital technology background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 gradient-hero"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            {heroBannerDatas.title}
            {/* Marketing Số */}
            {/* <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Xuất Sắc
            </span> */}
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            {heroBannerDatas.slogan}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button className="btn-primary group">
              {heroBannerDatas.primaryCTA.label}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" className="btn-glass text-black border-white/30 hover:bg-white/20">
              <Play className="mr-2 w-5 h-5" />
              {heroBannerDatas.secondaryCTA.label}
            </Button>
          </div>

          {/* Stats or Trust Indicators */}
          {/* <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {heroBannerDatas.card.map((item) => (
               <div className="glass-card text-center">
              <h3 className="text-3xl font-bold text-black mb-2">{item.title}</h3>
              <p className="text-black/80">{item.description}</p>
            </div>
            ))}         
          </div> */}
        </div>
      </div>
     </>
    )}
    </section>
  );
};

export default Hero;