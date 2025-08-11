
import React from "react";

interface LogoMarqueeProps {
  logos: { id: number; name: string; logo: string }[];
  title?: string;
  subtitle?: string;
}

const LogoMarquee: React.FC<LogoMarqueeProps> = ({ 
  logos, 
  title = "Mitra Kerja Kami", 
  subtitle = "Beberapa perusahaan yang telah bekerja sama dengan ANTLIA" 
}) => {
  const duplicatedLogos = [...logos, ...logos];
  
  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4 mb-10">
        <div className="text-center animate-on-scroll">
          <span className="subtitle block mb-2">{title}</span>
          <h2 className="text-xl font-bold mb-4">Dipercaya oleh Perusahaan Terkemuka</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>
      </div>
      
      <div className="relative">
        <div className="flex gap-12 animate-marquee">
          {duplicatedLogos.map((logo, index) => (
            <div 
              key={`${logo.id}-${index}`} 
              className="flex-shrink-0 w-36 h-24 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500"
            >
              <img 
                src={logo.logo} 
                alt={logo.name} 
                className="max-w-full max-h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoMarquee;
