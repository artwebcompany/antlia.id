import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Users, Code, Cloud, Shield, Smartphone, Database } from "lucide-react";
import PageHero from "@/components/PageHero";
import { useTranslation } from "react-i18next";

interface Service {
  id: number;
  slug: string;
  name: string;
  shortDescription: string;
  icon: React.ReactNode;
  image: string;
  category: string;
  featured: boolean;
}

const ServicesPage = () => {
  const { t } = useTranslation("services");

  const services: Service[] = [
    {
      id: 1,
      slug: "it-consulting",
      name: t("services.it-consulting.name"),
      shortDescription: t("services.it-consulting.shortDescription"),
      icon: <Code className="w-6 h-6" />,
      image: "/assets/service-1.jpg",
      category: t("categories.consulting"),
      featured: true
    },
    {
      id: 2,
      slug: "business-operations-consulting",
      name: t("services.business-operations-consulting.name"),
      shortDescription: t("services.business-operations-consulting.shortDescription"),
      icon: <Users className="w-6 h-6" />,
      image: "/assets/service-2.jpg",
      category: t("categories.consulting"),
      featured: true
    },
    {
      id: 3,
      slug: "excel-training-course",
      name: t("services.excel-training-course.name"),
      shortDescription: t("services.excel-training-course.shortDescription"),
      icon: <Database className="w-6 h-6" />,
      image: "/assets/service-3.jpg",
      category: t("categories.training"),
      featured: true
    },
    {
      id: 4,
      slug: "workplace-communication-training",
      name: t("services.workplace-communication-training.name"),
      shortDescription: t("services.workplace-communication-training.shortDescription"),
      icon: <Shield className="w-6 h-6" />,
      image: "/assets/service-4.jpg",
      category: t("categories.training"),
      featured: true
    }
  ];

  useEffect(() => {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => observer.observe(el));
    
    return () => {
      animatedElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  const featuredServices = services.filter(service => service.featured);
  const regularServices = services.filter(service => !service.featured);

  return (
    <>
      <PageHero 
        title={t("hero.title")} 
        subtitle={t("hero.subtitle")}
        backgroundImage="/assets/solutions-hero-bg.jpg"
      />

      {/* Featured Services */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-on-scroll">
            <span className="subtitle block mb-2">{t("featuredServices.subtitle")}</span>
            <h2 className="text-xl font-bold mb-4">{t("featuredServices.title")}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t("featuredServices.description")}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredServices.map((service, index) => (
              <Card key={service.id} className="service-card animate-on-scroll" style={{animationDelay: `${index * 100}ms`}}>
                <CardContent className="p-0 h-full flex flex-col">
                  <div className="relative h-48">
                    <img 
                      src={service.image} 
                      alt={service.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-antlia-blue text-white text-xs font-bold px-3 py-1 rounded-full">
                      {service.category}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="w-12 h-12 bg-antlia-blue/10 rounded-lg flex items-center justify-center mb-4 text-antlia-blue">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{service.name}</h3>
                    <p className="text-gray-600 mb-6 flex-grow">{service.shortDescription}</p>
                    <Link 
                      to={`/layanan/${service.slug}`} 
                      className="text-antlia-blue hover:underline flex items-center font-medium self-start mt-auto"
                    >
                      {t("common.viewDetails")} <ArrowRight className="ml-1 w-4 h-4" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* All Services */}
      <section className="py-16 bg-antlia-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-on-scroll">
            <span className="subtitle block mb-2">{t("allServices.subtitle")}</span>
            <h2 className="text-xl font-bold mb-4">{t("allServices.title")}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t("allServices.description")}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularServices.map((service, index) => (
              <Card key={service.id} className="service-card h-full animate-on-scroll" style={{animationDelay: `${index * 100}ms`}}>
                <CardContent className="p-6 h-full flex flex-col">
                  <div className="flex items-start mb-4">
                    <div className="w-10 h-10 bg-antlia-blue/10 rounded-lg flex items-center justify-center mr-4 text-antlia-blue">
                      {service.icon}
                    </div>
                    <div>
                      <span className="text-xs font-medium text-antlia-blue/80">{service.category}</span>
                      <h3 className="text-lg font-semibold">{service.name}</h3>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6 flex-grow">{service.shortDescription}</p>
                  <Link 
                    to={`/layanan/${service.slug}`} 
                    className="text-antlia-blue hover:underline flex items-center font-medium self-start mt-auto"
                  >
                    {t("common.viewDetails")} <ArrowRight className="ml-1 w-4 h-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-antlia-blue/10 to-antlia-cyan/10">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 relative overflow-hidden animate-on-scroll">
            <div className="absolute top-0 right-0 w-64 h-64 bg-antlia-blue/10 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-antlia-cyan/10 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
              <div className="mb-8 md:mb-0 md:mr-8 text-center md:text-left">
                <h2 className="text-xl font-bold mb-4">{t("cta.title")}</h2>
                <p className="text-gray-600 mb-6 max-w-xl">
                  {t("cta.description")}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Button className="bg-antlia-blue hover:bg-antlia-blue/80">
                    <Link to="/kontak" className="flex items-center">
                      {t("cta.contactUs")} <ArrowRight size={16} className="ml-2" />
                    </Link>
                  </Button>
                  <Button className="bg-antlia-blue hover:bg-antlia-blue/80">
                  <a 
                      href="https://wa.me/6281573635143" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                      {t("cta.contactWhatsApp")}
                    </a>
                  </Button>
                </div>
              </div>
              <div className="w-full md:w-1/3">
                <img 
                  src="/assets/cta-image.png" 
                  alt={t("cta.imageAlt")} 
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesPage;
