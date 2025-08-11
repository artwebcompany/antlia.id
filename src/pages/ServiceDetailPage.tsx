import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle } from "lucide-react";
import PageHero from "@/components/PageHero";
import { useTranslation } from "react-i18next";

interface Process {
  title: string;
  description: string;
}

interface ServiceDetail {
  id: number;
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  image: string;
  icon: string;
  category: string;
  deliverables: string[];
  benefits: string[];
}

const ServiceDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation("service_detail");

  const services: ServiceDetail[] = [
    {
      id: 1,
      slug: "it-consulting",
      name: t("services.it-consulting.name"),
      description: t("services.it-consulting.description"),
      longDescription: t("services.it-consulting.longDescription"),
      image: "/assets/service-1.jpg",
      icon: "Settings",
      category: t("categories.consulting"),
      deliverables: t("services.it-consulting.deliverables", { returnObjects: true }) as string[],
      benefits: t("services.it-consulting.benefits", { returnObjects: true }) as string[],
    },
    {
      id: 2,
      slug: "business-operations-consulting",
      name: t("services.business-operations-consulting.name"),
      description: t("services.business-operations-consulting.description"),
      longDescription: t("services.business-operations-consulting.longDescription"),
      image: "/assets/service-2.jpg",
      icon: "BarChart",
      category: t("categories.consulting"),
      deliverables: t("services.business-operations-consulting.deliverables", { returnObjects: true }) as string[],
      benefits: t("services.business-operations-consulting.benefits", { returnObjects: true }) as string[],
    },
    {
      id: 3,
      slug: "excel-training-course",
      name: t("services.excel-training-course.name"),
      description: t("services.excel-training-course.description"),
      longDescription: t("services.excel-training-course.longDescription"),
      image: "/assets/service-3.jpg",
      icon: "FileSpreadsheet",
      category: t("categories.training"),
      deliverables: t("services.excel-training-course.deliverables", { returnObjects: true }) as string[],
      benefits: t("services.excel-training-course.benefits", { returnObjects: true }) as string[],
    },
    {
      id: 4,
      slug: "workplace-communication-training",
      name: t("services.workplace-communication-training.name"),
      description: t("services.workplace-communication-training.description"),
      longDescription: t("services.workplace-communication-training.longDescription"),
      image: "/assets/service-4.jpg",
      icon: "MessageSquare",
      category: t("categories.training"),
      deliverables: t("services.workplace-communication-training.deliverables", { returnObjects: true }) as string[],
      benefits: t("services.workplace-communication-training.benefits", { returnObjects: true }) as string[],
    }
  ];

  const processSteps: Process[] = [
    {
      title: t("process.step1.title"),
      description: t("process.step1.description"),
    },
    {
      title: t("process.step2.title"),
      description: t("process.step2.description"),
    },
    {
      title: t("process.step3.title"),
      description: t("process.step3.description"),
    }
  ];

  const service = services.find(s => s.slug === slug);
  
  useEffect(() => {
    if (!service) {
      return;
    }
    
    window.scrollTo(0, 0); 
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
  }, [service]);

  if (!service) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-xl font-bold mb-4">{t("notFound.title")}</h1>
        <p className="mb-6">{t("notFound.description")}</p>
        <Link to="/layanan" className="text-antlia-blue hover:underline flex items-center">
          <ArrowLeft className="mr-2" /> {t("notFound.backButton")}
        </Link>
      </div>
    );
  }

  return (
    <>
      <PageHero 
        title={service.name} 
        subtitle={t("hero.category", { category: service.category })}
        backgroundImage="/assets/solutions-hero-bg.jpg"
      />
      
      {/* Service Introduction */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="w-full lg:w-1/2 animate-on-scroll">
              <img 
                src={service.image} 
                alt={service.name} 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
            
            <div className="w-full lg:w-1/2 animate-on-scroll" style={{animationDelay: "200ms"}}>
              <Link to="/layanan" className="text-antlia-blue hover:underline flex items-center mb-6">
                <ArrowLeft className="mr-2 w-4 h-4" /> {t("introduction.backButton")}
              </Link>
              <h1 className="text-4xl font-bold mb-6">{service.name}</h1>
              <p className="text-gray-700 mb-6">{service.longDescription}</p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-antlia-blue hover:bg-antlia-blue/80">
                  <Link to="/kontak" className="flex items-center">
                    {t("introduction.discussButton")}
                  </Link>
                </Button>
                <Button variant="outline" className="border-antlia-blue text-antlia-blue hover:bg-antlia-blue/10">
                  <a 
                    href="https://wa.me/6281573635143" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    {t("introduction.whatsappButton")}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Process */}
      <section className="py-16 bg-antlia-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-on-scroll">
            <span className="subtitle block mb-2">{t("process.subtitle")}</span>
            <h2 className="text-xl font-bold mb-4">{t("process.title")}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t("process.description", { serviceName: service.name })}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processSteps.map((step, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300 animate-on-scroll" style={{animationDelay: `${index * 100}ms`}}>
                <CardContent className="p-6">
                  <div className="flex flex-col items-start">
                    <div className="w-12 h-12 rounded-full bg-antlia-blue/10 flex items-center justify-center mb-4 text-antlia-blue font-bold">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Deliverables & Benefits */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Deliverables */}
            <div className="animate-on-scroll">
              <span className="subtitle block mb-2">{t("deliverables.subtitle")}</span>
              <h2 className="text-xl font-bold mb-6">{t("deliverables.title")}</h2>
              <div className="bg-antlia-light p-6 rounded-lg">
                <ul className="space-y-4">
                  {service.deliverables.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-antlia-blue mr-3 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Benefits */}
            <div className="animate-on-scroll" style={{animationDelay: "200ms"}}>
              <span className="subtitle block mb-2">{t("benefits.subtitle")}</span>
              <h2 className="text-xl font-bold mb-6">{t("benefits.title")}</h2>
              <div className="bg-antlia-light p-6 rounded-lg">
                <ul className="space-y-4">
                  {service.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-antlia-blue mr-3 flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
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
                  {t("cta.description", { serviceName: service.name })}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Button className="bg-antlia-blue hover:bg-antlia-blue/80">
                    <a 
                      href="https://wa.me/6281573635143" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                      {t("cta.discussButton")}
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

export default ServiceDetailPage;
