import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import PageHero from "@/components/PageHero";
import TeamSection from "@/components/TeamSection";
import LogoMarquee from "@/components/LogoMarquee";
import { useTranslation } from "react-i18next";

const partners = [
  { id: 1, name: "Company A", logo: "/assets/partner-1.png" },
  { id: 2, name: "Company B", logo: "/assets/partner-2.png" },
  { id: 3, name: "Company C", logo: "/assets/partner-3.png" },
  { id: 4, name: "Company D", logo: "/assets/partner-4.png" },
  { id: 5, name: "Company E", logo: "/assets/partner-5.png" },
  { id: 6, name: "Company F", logo: "/assets/partner-6.png" }
];

const teamMembers = [
  {
    name: "Ahmad Rasyid",
    position: "CEO & Founder",
    image: "/assets/team-1.jpg",
    bioKey: "aboutPage.team.member1.bio",
    linkedin: "https://linkedin.com",
    email: "ahmad@antlia.id"
  },
  {
    name: "Siti Nuraini",
    position: "CTO",
    image: "/assets/team-2.jpg",
    bioKey: "aboutPage.team.member2.bio",
    linkedin: "https://linkedin.com",
    email: "siti@antlia.id"
  },
  {
    name: "Budi Santoso",
    position: "Lead Developer",
    image: "/assets/team-3.jpg",
    bioKey: "aboutPage.team.member3.bio",
    linkedin: "https://linkedin.com",
    email: "budi@antlia.id"
  },
  {
    name: "Maya Putri",
    position: "UX Design Lead",
    image: "/assets/team-4.jpg",
    bioKey: "aboutPage.team.member4.bio",
    linkedin: "https://linkedin.com",
    email: "maya@antlia.id"
  }
];

const AboutUsPage = () => {
  const { t } = useTranslation("about");

  useEffect(() => {
    // Animate elements on scroll
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
        title={t("aboutPage.hero.title")} 
        subtitle={t("aboutPage.hero.subtitle")}
        backgroundImage="/assets/about-hero-bg.jpg"
      />
      
      {/* History Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll">
              <span className="subtitle block mb-2">{t("aboutPage.history.subtitle")}</span>
              <h2 className="text-xl font-bold mb-6">{t("aboutPage.history.title")}</h2>
              <p className="text-gray-600 mb-4">
                {t("aboutPage.history.p1")}
              </p>
              <p className="text-gray-600 mb-4">
                {t("aboutPage.history.p2")}
              </p>
              <p className="text-gray-600">
                {t("aboutPage.history.p3")}
              </p>
            </div>
            <div className="relative animate-on-scroll" style={{animationDelay: "200ms"}}>
              <img
                src="/assets/about-image.jpg"
                alt={t("aboutPage.history.title")}
                className="rounded-xl shadow-xl w-full h-auto"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-lg shadow-lg">
                <p className="text-xl font-bold text-antlia-blue">{t("aboutPage.history.experienceYears")}</p>
                <p className="text-gray-600">{t("aboutPage.history.experienceLabel")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline (kept commented out as in original code) */}
      {/* <section className="py-16 bg-antlia-light overflow-x-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-on-scroll">
            <span className="subtitle block mb-2">{t("aboutPage.timeline.subtitle")}</span>
            <h2 className="text-xl font-bold mb-4">{t("aboutPage.timeline.title")}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t("aboutPage.timeline.description")}
            </p>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-antlia-blue/20 transform -translate-x-1/2"></div>
            
            {[
              {
                year: t("aboutPage.timeline.milestone1.year"),
                title: t("aboutPage.timeline.milestone1.title"),
                description: t("aboutPage.timeline.milestone1.description")
              },
              {
                year: t("aboutPage.timeline.milestone2.year"),
                title: t("aboutPage.timeline.milestone2.title"),
                description: t("aboutPage.timeline.milestone2.description")
              },
              {
                year: t("aboutPage.timeline.milestone3.year"),
                title: t("aboutPage.timeline.milestone3.title"),
                description: t("aboutPage.timeline.milestone3.description")
              },
              {
                year: t("aboutPage.timeline.milestone4.year"),
                title: t("aboutPage.timeline.milestone4.title"),
                description: t("aboutPage.timeline.milestone4.description")
              },
              {
                year: t("aboutPage.timeline.milestone5.year"),
                title: t("aboutPage.timeline.milestone5.title"),
                description: t("aboutPage.timeline.milestone5.description")
              },
              {
                year: t("aboutPage.timeline.milestone6.year"),
                title: t("aboutPage.timeline.milestone6.title"),
                description: t("aboutPage.timeline.milestone6.description")
              }
            ].map((milestone, index) => (
              <div 
                key={index} 
                className={`relative flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center mb-12 animate-on-scroll`}
                style={{animationDelay: `${index * 150}ms`}}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                  <div className="mb-1 text-antlia-blue font-bold">{milestone.year}</div>
                  <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-white border-4 border-antlia-blue flex items-center justify-center text-antlia-blue font-bold z-10">
                  {index + 1}
                </div>
                <div className="w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Vision & Mission */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-on-scroll">
            <span className="subtitle block mb-2">{t("aboutPage.visionMission.subtitle")}</span>
            <h2 className="text-xl font-bold mb-4">{t("aboutPage.visionMission.title")}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t("aboutPage.visionMission.description")}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="hover:shadow-lg transition-shadow duration-300 border-t-4 border-t-antlia-blue animate-on-scroll">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-antlia-blue">{t("aboutPage.visionMission.visionTitle")}</h3>
                <p className="text-gray-600 mb-6">
                  {t("aboutPage.visionMission.visionText")}
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow duration-300 border-t-4 border-t-antlia-cyan animate-on-scroll" style={{animationDelay: "200ms"}}>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-antlia-cyan">{t("aboutPage.visionMission.missionTitle")}</h3>
                <p className="text-gray-600 mb-6">
                  {t("aboutPage.visionMission.missionText")}
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-antlia-cyan mr-2 flex-shrink-0" />
                    <span>{t("aboutPage.visionMission.missionItem1")}</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-antlia-cyan mr-2 flex-shrink-0" />
                    <span>{t("aboutPage.visionMission.missionItem2")}</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-antlia-cyan mr-2 flex-shrink-0" />
                    <span>{t("aboutPage.visionMission.missionItem3")}</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-antlia-cyan mr-2 flex-shrink-0" />
                    <span>{t("aboutPage.visionMission.missionItem4")}</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-antlia-cyan mr-2 flex-shrink-0" />
                    <span>{t("aboutPage.visionMission.missionItem5")}</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-antlia-cyan mr-2 flex-shrink-0" />
                    <span>{t("aboutPage.visionMission.missionItem6")}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Core Values (kept commented out) */}
      {/* <section className="py-16 bg-antlia-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-on-scroll">
            <span className="subtitle block mb-2">{t("aboutPage.coreValues.subtitle")}</span>
            <h2 className="text-xl font-bold mb-4">{t("aboutPage.coreValues.title")}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t("aboutPage.coreValues.description")}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                value: t("aboutPage.coreValues.value1.value"),
                description: t("aboutPage.coreValues.value1.description"),
                color: "from-antlia-blue to-antlia-cyan"
              },
              {
                value: t("aboutPage.coreValues.value2.value"),
                description: t("aboutPage.coreValues.value2.description"),
                color: "from-antlia-cyan to-green-400"
              },
              {
                value: t("aboutPage.coreValues.value3.value"),
                description: t("aboutPage.coreValues.value3.description"),
                color: "from-green-400 to-yellow-400"
              },
              {
                value: t("aboutPage.coreValues.value4.value"),
                description: t("aboutPage.coreValues.value4.description"),
                color: "from-yellow-400 to-antlia-purple"
              }
            ].map((item, index) => (
              <Card 
                key={index} 
                className="hover:shadow-lg transition-all duration-300 overflow-hidden animate-on-scroll" 
                style={{animationDelay: `${index * 100}ms`}}
              >
                <CardContent className="p-0">
                  <div className={`h-2 bg-gradient-to-r ${item.color}`}></div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3">{item.value}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      
      {/* Team Section (kept commented out) */}
      {/* <TeamSection 
        title={t("aboutPage.team.title")} 
        subtitle={t("aboutPage.team.subtitle")}
        description={t("aboutPage.team.description")}
        members={teamMembers.map(member => ({
          ...member,
          bio: t(member.bioKey)
        }))}
      /> */}
      
      {/* Partners */}
      <LogoMarquee 
        logos={partners}
        title={t("aboutPage.partners.title")}
        subtitle={t("aboutPage.partners.subtitle")}
      />
      
      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-antlia-blue to-antlia-cyan rounded-xl overflow-hidden shadow-lg animate-on-scroll">
            <div className="p-8 md:p-12 text-white">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-xl font-bold mb-4">{t("aboutPage.cta.title")}</h2>
                <p className="mb-6">
                  {t("aboutPage.cta.description")}
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button className="bg-white text-antlia-blue hover:bg-white/90">
                    <Link to="/kontak" className="flex items-center">
                      {t("aboutPage.cta.contactButton")}
                    </Link>
                  </Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white/10">
                    <Link to="/karir" className="flex items-center">
                      {t("aboutPage.cta.careersButton")}
                    </Link>
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

export default AboutUsPage;
