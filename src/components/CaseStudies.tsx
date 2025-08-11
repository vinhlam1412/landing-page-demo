import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp, Users, Target } from 'lucide-react';
import caseKfc from '@/assets/case-kfc.jpg';
import caseShiseido from '@/assets/case-shiseido.jpg';
import caseTotal from '@/assets/case-total.jpg';
import { useEffect, useState } from 'react';
import { ICaseStudy } from '@/types/caseStudy';

const CaseStudies = () => {
  const cases = [
    {
      client: 'KFC',
      title: 'Digital Campaign Revolution',
      image: caseKfc,
      challenge: 'Increase brand engagement and drive foot traffic across 200+ locations',
      result: '350% increase in social engagement, 45% boost in store visits',
      metrics: [
        { icon: TrendingUp, label: 'Engagement', value: '+350%' },
        { icon: Users, label: 'Reach', value: '2.5M' },
        { icon: Target, label: 'Conversion', value: '+45%' }
      ],
      color: 'from-red-500 to-orange-500'
    },
    {
      client: 'Shiseido',
      title: 'Premium Beauty Marketing',
      image: caseShiseido,
      challenge: 'Launch new skincare line and establish premium brand positioning',
      result: '280% ROI in first quarter, 60% market share growth',
      metrics: [
        { icon: TrendingUp, label: 'ROI', value: '+280%' },
        { icon: Users, label: 'New Customers', value: '15K' },
        { icon: Target, label: 'Market Share', value: '+60%' }
      ],
      color: 'from-pink-500 to-purple-500'
    },
    {
      client: 'TotalEnergies',
      title: 'B2B Digital Transformation',
      image: caseTotal,
      challenge: 'Modernize B2B marketing approach and generate qualified leads',
      result: '420% increase in qualified leads, 85% faster sales cycle',
      metrics: [
        { icon: TrendingUp, label: 'Lead Quality', value: '+420%' },
        { icon: Users, label: 'Enterprise Clients', value: '150+' },
        { icon: Target, label: 'Sales Cycle', value: '-85%' }
      ],
      color: 'from-green-500 to-blue-500'
    }
  ];


  const [data, setData] = useState<ICaseStudy>();  
     const [loading, setLoading] = useState(true);
      
        useEffect(() => {
          const fetchData = async () => {
            try {
              const res = await fetch(
                "https://strapi-demo-zp2l.onrender.com/api/global?populate[0]=block&populate[1]=block.caseStudy&populate[2]=block.caseStudy.image&populate[3]=block.ctaRead"
              );
              if (!res.ok) throw new Error("Failed to fetch data");
      
              const json = await res.json();
              const items = json?.data.block[2] ?? [];
              setData(items);
              console.log("case study",items)
            } catch (err) {
              console.error("Error fetching case study", err);
            } finally {
              setLoading(false);
            }
          };  
          fetchData();
        }, []);
    if (loading) return <div>Loading...</div>

  return (
    <section id="case-studies" className="py-20 bg-muted/30">
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

        {/* Case Studies Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {data.caseStudy.map((caseStudy, index) => (
            <div 
              key={caseStudy.client}
              className="glass-card hover-lift group overflow-hidden"
            >
              {/* Image */}
              <div className="relative overflow-hidden rounded-xl mb-6">
                <img 
                  src={"https://strapi-demo-zp2l.onrender.com"+ caseStudy.image.formats.thumbnail.url} 
                  alt={`${caseStudy.client} case study`}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {caseStudy.client}
                  </h3>
                  <h4 className="text-lg font-semibold text-primary mb-3">
                    {caseStudy.title}
                  </h4>
                </div>

                <div>
                  <h5 className="font-semibold text-foreground mb-2">Challenge:</h5>
                  <p className="text-sm text-muted-foreground mb-4">
                    {caseStudy.Challenge}
                  </p>
                </div>

                <div>
                  <h5 className="font-semibold text-foreground mb-2">Result:</h5>
                  <p className="text-sm text-primary font-medium mb-6">
                    {caseStudy.Result}
                  </p>
                </div>
                <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                  {data.ctaRead.label}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;