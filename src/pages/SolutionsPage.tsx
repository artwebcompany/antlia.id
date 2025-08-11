import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Laptop, Heart, Settings, Users } from "lucide-react";
import PageHero from "@/components/PageHero";
import FeatureCard from "@/components/FeatureCard";

const SolutionsPage = () => {
  const { t } = useTranslation("solutions");

  const industryCards = t("industrySolutions.cards", { returnObjects: true }) as { title: string; description: string; }[];
  const digitalTransformationCards = t("digitalTransformation.featureCards", { returnObjects: true }) as { title: string; description: string; }[];
  const methodologySteps = t("methodology.steps", { returnObjects: true }) as { title: string; description: string; }[];
  const businessOutcomesMetrics = t("businessOutcomes.metrics", { returnObjects: true }) as { metric: string; title: string; description: string; }[];

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

  return (
    <>
      <PageHero 
        title={t("hero.title")} 
        subtitle={t("hero.subtitle")}
        backgroundImage="/assets/solutions-hero-bg.jpg"
      />

      {/* Industry Solutions */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll">
              <span className="subtitle block mb-2">{t("industrySolutions.subtitle")}</span>
              <h2 className="text-xl font-bold mb-6">{t("industrySolutions.title")}</h2>
              <p className="text-gray-600 mb-6">
                {t("industrySolutions.description")}
              </p>
              <div className="grid grid-cols-2 gap-4">
                {Array.isArray(industryCards) && industryCards.map((card, index) => (
                  <Card key={index} className="border-antlia-blue/20 hover:shadow-md transition-all duration-300">
                    <CardContent className="p-4">
                      <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
                      <p className="text-sm text-gray-600">{card.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            <div className="relative animate-on-scroll" style={{animationDelay: "200ms"}}>
              <img
                src="/assets/industry-solutions.jpg"
                alt={t("industrySolutions.title")}
                className="rounded-xl shadow-xl w-full h-auto"
              />
              <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white via-white/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Transformation Solutions */}
      <section className="py-16 bg-antlia-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-on-scroll">
            <span className="subtitle block mb-2">{t("digitalTransformation.subtitle")}</span>
            <h2 className="text-xl font-bold mb-4">{t("digitalTransformation.title")}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t("digitalTransformation.description")}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array.isArray(digitalTransformationCards) && digitalTransformationCards.map((card, index) => (
              <FeatureCard 
                key={index}
                title={card.title}
                description={card.description}
                icon={index === 0 ? "Laptop" : index === 1 ? "Heart" : "Settings"}
                delay={100 * (index + 1)}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Methodology */}
      <section className="py-16 bg-antlia-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-on-scroll">
            <span className="subtitle block mb-2">{t("methodology.subtitle")}</span>
            <h2 className="text-xl font-bold mb-4">{t("methodology.title")}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t("methodology.description")}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {Array.isArray(methodologySteps) && methodologySteps.map((item, index) => (
              <Card 
                key={index} 
                className="hover:shadow-lg transition-all duration-300 border-t-4 border-t-antlia-blue animate-on-scroll" 
                style={{animationDelay: `${index * 100}ms`}}
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-antlia-blue/10 flex items-center justify-center mb-4 text-antlia-blue font-bold">
                    {`0${index + 1}`}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Business Outcomes */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-on-scroll">
            <span className="subtitle block mb-2">{t("businessOutcomes.subtitle")}</span>
            <h2 className="text-xl font-bold mb-4">{t("businessOutcomes.title")}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t("businessOutcomes.description")}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.isArray(businessOutcomesMetrics) && businessOutcomesMetrics.map((item, index) => (
              <Card 
                key={index} 
                className="hover:shadow-lg transition-all duration-300 text-center animate-on-scroll" 
                style={{animationDelay: `${index * 100}ms`}}
              >
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-antlia-blue mb-4">{item.metric}</div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-antlia-light">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-antlia-blue to-antlia-cyan rounded-xl overflow-hidden shadow-lg animate-on-scroll">
            <div className="p-8 md:p-12 text-white">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-xl font-bold mb-4">{t("cta.title")}</h2>
                <p className="mb-6">
                  {t("cta.description")}
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button className="bg-white text-antlia-blue hover:bg-white/90">
                    <Link to="/kontak" className="flex items-center">
                      {t("cta.consultationButton")}
                    </Link>
                  </Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white/10">
                    <a 
                      href="https://wa.me/6285846612211" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                      {t("cta.whatsappButton")}
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

export default SolutionsPage;
