import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PageHero from "@/components/PageHero";
import { useTranslation } from "react-i18next";

interface Client {
  id: number;
  nameKey: string;
  logo: string;
  industryKey: string;
  featured: boolean;
}

interface CaseStudy {
  id: number;
  clientKey: string;
  titleKey: string;
  descriptionKey: string;
  resultKey: string;
  image: string;
  industryKey: string;
}

interface Testimonial {
  name: string;
  position: string;
  company: string;
  content: string;
}

const clients: Client[] = [
  { id: 1, nameKey: "clientsPage.featuredClients.clients.0.name", logo: "/assets/partner-1.png", industryKey: "clientsPage.featuredClients.clients.0.industry", featured: true },
  { id: 2, nameKey: "clientsPage.featuredClients.clients.1.name", logo: "/assets/partner-1.png", industryKey: "clientsPage.featuredClients.clients.1.industry", featured: true },
  { id: 3, nameKey: "clientsPage.featuredClients.clients.2.name", logo: "/assets/partner-1.png", industryKey: "clientsPage.featuredClients.clients.2.industry", featured: true },
  { id: 4, nameKey: "clientsPage.featuredClients.clients.3.name", logo: "/assets/partner-1.png", industryKey: "clientsPage.featuredClients.clients.3.industry", featured: true },
];

const caseStudies: CaseStudy[] = [
  {
    id: 1,
    clientKey: "clientsPage.caseStudies.studies.0.clientName",
    titleKey: "clientsPage.caseStudies.studies.0.title",
    descriptionKey: "clientsPage.caseStudies.studies.0.description",
    resultKey: "clientsPage.caseStudies.studies.0.result",
    image: "/assets/product-3.jpg",
    industryKey: "clientsPage.caseStudies.studies.0.industry"
  },
  {
    id: 2,
    clientKey: "clientsPage.caseStudies.studies.1.clientName",
    titleKey: "clientsPage.caseStudies.studies.1.title",
    descriptionKey: "clientsPage.caseStudies.studies.1.description",
    resultKey: "clientsPage.caseStudies.studies.1.result",
    image: "/assets/product-2.jpg",
    industryKey: "clientsPage.caseStudies.studies.1.industry"
  },
  {
    id: 3,
    clientKey: "clientsPage.caseStudies.studies.2.clientName",
    titleKey: "clientsPage.caseStudies.studies.2.title",
    descriptionKey: "clientsPage.caseStudies.studies.2.description",
    resultKey: "clientsPage.caseStudies.studies.2.result",
    image: "/assets/product-4.jpg",
    industryKey: "clientsPage.caseStudies.studies.2.industry"
  }
];

const ClientsPage = () => {
  const { t } = useTranslation("clients");

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

  const industries = Array.from(new Set(clients.map(client => t(client.industryKey))));

  return (
    <>
      <PageHero 
        title={t("clientsPage.hero.title")} 
        subtitle={t("clientsPage.hero.subtitle")}
        backgroundImage="/assets/clients-hero-bg.jpg"
      />

      {/* Featured Clients */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-on-scroll">
            <span className="subtitle block mb-2">{t("clientsPage.featuredClients.subtitle")}</span>
            <h2 className="text-xl font-bold mb-4">{t("clientsPage.featuredClients.title")}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t("clientsPage.featuredClients.description")}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {clients
              .filter(client => client.featured)
              .map((client) => (
                <Card 
                  key={client.id} 
                  className="hover:shadow-lg transition-all duration-300 text-center p-6 animate-on-scroll"
                  style={{animationDelay: `${client.id * 100}ms`}}
                >
                  <CardContent className="p-0">
                    <div className="h-32 flex items-center justify-center mb-4">
                      <img 
                        src={client.logo} 
                        alt={t(client.nameKey)}
                        className="max-h-20 max-w-full transition-all duration-300 hover:scale-110" 
                      />
                    </div>
                    <h3 className="text-xl font-semibold mb-1">{t(client.nameKey)}</h3>
                    <p className="text-gray-600 text-sm">{t(client.industryKey)}</p>
                  </CardContent>
                </Card>
              ))
            }
          </div>
        </div>
      </section>
      
      {/* Case Studies */}
      <section className="py-16 bg-antlia-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-on-scroll">
            <span className="subtitle block mb-2">{t("clientsPage.caseStudies.subtitle")}</span>
            <h2 className="text-xl font-bold mb-4">{t("clientsPage.caseStudies.title")}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t("clientsPage.caseStudies.description")}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study) => (
              <Card key={study.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 animate-on-scroll" style={{animationDelay: `${study.id * 200}ms`}}>
                <div className="h-56 overflow-hidden">
                  <img 
                    src={study.image} 
                    alt={t(study.titleKey)}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="text-sm font-medium text-antlia-blue mb-2">{t(study.clientKey)}</div>
                  <h3 className="text-xl font-semibold mb-2">{t(study.titleKey)}</h3>
                  <p className="text-gray-600 mb-4">{t(study.descriptionKey)}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="text-sm font-medium">{t("clientsPage.caseStudies.resultLabel")}</div>
                    <div className="text-sm text-antlia-blue font-medium">{t(study.resultKey)}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-8 text-center animate-on-scroll" style={{animationDelay: "400ms"}}>
            <Button variant="outline" className="border-antlia-blue text-antlia-blue hover:bg-antlia-blue/10">
              {t("clientsPage.caseStudies.button")}
            </Button>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-on-scroll">
            <span className="subtitle block mb-2">{t("clientsPage.testimonials.subtitle")}</span>
            <h2 className="text-xl font-bold mb-4">{t("clientsPage.testimonials.title")}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t("clientsPage.testimonials.description")}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(t("clientsPage.testimonials.testimonialsList", { returnObjects: true }) as Testimonial[]).map((testimonial, index) => (
              <Card 
                key={index} 
                className="hover:shadow-lg transition-all duration-300 border-t-4 border-t-antlia-blue animate-on-scroll"
                style={{animationDelay: `${index * 150}ms`}}
              >
                <CardContent className="p-6">
                  <div className="flex items-start mb-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden mr-4">
                      <img 
                        src="/assets/avatar-1.jpg" 
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                      <p className="text-sm text-gray-600">{testimonial.position}, {testimonial.company}</p>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="absolute -top-3 -left-2 text-4xl text-antlia-blue/20">"</div>
                    <p className="relative text-gray-700 italic">{testimonial.content}</p>
                    <div className="absolute -bottom-3 -right-2 text-4xl text-antlia-blue/20">"</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* All Clients */}
      <section className="py-16 bg-antlia-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-on-scroll">
            <span className="subtitle block mb-2">{t("clientsPage.allClients.subtitle")}</span>
            <h2 className="text-xl font-bold mb-4">{t("clientsPage.allClients.title")}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t("clientsPage.allClients.description")}
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center mb-8 gap-4 animate-on-scroll">
            {industries.map((industry, index) => (
              <Button 
                key={industry}
                variant="outline" 
                className="border-antlia-blue text-antlia-blue hover:bg-antlia-blue/10"
                style={{animationDelay: `${index * 50}ms`}}
              >
                {industry}
              </Button>
            ))}
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {clients.map((client) => (
              <div 
                key={client.id} 
                className="p-6 bg-white rounded-lg shadow-sm border flex items-center justify-center h-32 animate-on-scroll" 
                style={{animationDelay: `${client.id * 50}ms`}}
              >
                <img 
                  src={client.logo} 
                  alt={t(client.nameKey)}
                  className="max-h-16 max-w-full grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-antlia-blue to-antlia-cyan rounded-xl overflow-hidden shadow-lg animate-on-scroll">
            <div className="p-8 md:p-12 text-white">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-xl font-bold mb-4">{t("clientsPage.cta.title")}</h2>
                <p className="mb-6">
                  {t("clientsPage.cta.description")}
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button className="bg-white text-antlia-blue hover:bg-white/90">
                    <Link to="/kontak" className="flex items-center">
                      {t("clientsPage.cta.contactButton")}
                    </Link>
                  </Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white/10">
                    <a 
                      href="https://wa.me/6281573635143" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                      {t("clientsPage.cta.consultationButton")}
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ClientsPage;
