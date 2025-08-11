import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  ChevronRight,
  Phone,
  Mail,
  ArrowRight,
  CheckCircle,
  ArrowUp,
} from "lucide-react";
import HeroCarousel from "@/components/HeroCarousel";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSlider from "@/components/TestimonialsSlider";
import LogoMarquee from "@/components/LogoMarquee";
import FeatureCard from "@/components/FeatureCard";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import TeamSection from "@/components/TeamSection";
import { Article } from "@/types/article";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useTranslation } from "react-i18next"; 

const partners = [
  { id: 1, name: "Company A", logo: "/assets/partner-1.png" },
  { id: 2, name: "Company B", logo: "/assets/partner-2.png" },
  { id: 3, name: "Company C", logo: "/assets/partner-3.png" },
  { id: 4, name: "Company D", logo: "/assets/partner-4.png" },
  { id: 5, name: "Company E", logo: "/assets/partner-5.png" },
  { id: 6, name: "Company F", logo: "/assets/partner-6.png" },
];

const teamMembers = [
  {
    name: "Ahmad Rasyid",
    position: "CEO & Founder",
    image: "/assets/team-1.jpg",
    bio: "homepage.team.member1_bio", 
    linkedin: "https://linkedin.com",
    email: "ahmad@antlia.id",
  },
  {
    name: "Siti Nuraini",
    position: "CTO",
    image: "/assets/team-2.jpg",
    bio: "homepage.team.member2_bio", 
    linkedin: "https://linkedin.com",
    email: "siti@antlia.id",
  },
  {
    name: "Budi Santo",
    position: "Lead Developer",
    image: "/assets/team-3.jpg",
    bio: "homepage.team.member3_bio",
    linkedin: "https://linkedin.com",
    email: "budi@antlia.id",
  },
  {
    name: "Maya Putri",
    position: "UX Design Lead",
    image: "/assets/team-4.jpg",
    bio: "homepage.team.member4_bio", 
    linkedin: "https://linkedin.com",
    email: "maya@antlia.id",
  },
];

const HomePage = () => {
  const { t } = useTranslation("homepage"); 
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [latestArticles, setLatestArticles] = useState<Article[]>([]);
  const [isLoadingArticles, setIsLoadingArticles] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchLatestArticles = async () => {
      try {
        setIsLoadingArticles(true);
        const { data, error } = await supabase
          .from("articles")
          .select("*")
          .eq("status", "published")
          .order("published_at", { ascending: false })
          .limit(3);
        if (error) {
          throw error;
        }
        if (data) {
          const mappedArticles: Article[] = data.map((article) => ({
            id: article.id,
            title: article.title,
            slug: article.slug,
            content: article.content,
            excerpt: article.excerpt,
            author: article.author,
            authorEmail: article.author_email,
            category: article.category,
            keywords: article.keywords || [],
            createdAt: article.created_at,
            updatedAt: article.updated_at,
            publishedAt: article.published_at,
            coverImage: article.cover_image,
            status: article.status,
            readingTime: article.reading_time,
            images: article.images || [],
          }));
          setLatestArticles(mappedArticles);
        }
      } catch (error: any) {
        console.error("Error fetching latest articles:", error);
        toast({
          title: t("article_fetch_error.title"),
          description: `${t("article_fetch_error.description")}: ${error.message}`,
          variant: "destructive",
        });
      } finally {
        setIsLoadingArticles(false);
      }
    };
    fetchLatestArticles();
  }, [toast, t]);

  useEffect(() => {
    const animatedElements = document.querySelectorAll(".animate-on-scroll");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      },
    );
    animatedElements.forEach((el) => {
      observer.observe(el);
    });
    return () => {
      animatedElements.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="flex flex-col w-full">
      <HeroCarousel />

      {/* Value Proposition Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-on-scroll">
            <span className="subtitle block mb-2">{t("value_prop.subtitle")}</span>
            <h2 className="text-3xl font-bold mb-4">{t("value_prop.title")}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t("value_prop.description")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              className="rounded-lg overflow-hidden p-[2px]"
              style={{
                background: "linear-gradient(135deg, #05b2fd, #6f42c1, #e17a9e)",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <FeatureCard
                title={t("value_prop.features.feature1_title")}
                description={t("value_prop.features.feature1_description")}
                icon="CheckCircle"
                delay={100}
                className="bg-white h-full"
              />
            </div>
            <div
              className="rounded-lg overflow-hidden p-[2px]"
              style={{
                background: "linear-gradient(135deg, #05b2fd, #6f42c1, #e17a9e)",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <FeatureCard
                title={t("value_prop.features.feature2_title")}
                description={t("value_prop.features.feature2_description")}
                icon="CheckCircle"
                delay={200}
                className="bg-white h-full"
              />
            </div>
            <div
              className="rounded-lg overflow-hidden p-[2px]"
              style={{
                background: "linear-gradient(135deg, #05b2fd, #6f42c1, #e17a9e)",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <FeatureCard
                title={t("value_prop.features.feature3_title")}
                description={t("value_prop.features.feature3_description")}
                icon="CheckCircle"
                delay={300}
                className="bg-white h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <ServicesSection />

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-on-scroll">
            <span className="subtitle block mb-2">{t("products.subtitle")}</span>
            <h2 className="text-3xl font-bold mb-4">{t("products.title")}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t("products.description")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "ANTLIA CRM",
                description: t("products.product1_desc"),
                image: "/assets/product-1.jpg",
              },
              {
                title: "ANTLIA ERP",
                description: t("products.product2_desc"),
                image: "/assets/product-2.jpg",
              },
              {
                title: "ANTLIA Analytics",
                description: t("products.product3_desc"),
                image: "/assets/product-3.jpg",
              },
            ].map((product, index) => (
              <Card
                key={index}
                className="product-card overflow-hidden animate-on-scroll"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="h-52 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="product-overlay">
                    <h3 className="text-xl font-bold mb-2">{product.title}</h3>
                    <Button className="mt-4 bg-antlia-blue hover:bg-antlia-blue/80">
                      <Link to="/produk-layanan">{t("products.view_details_link")}</Link>
                    </Button>
                  </div>
                </div>
                <CardContent className="p-5">
                  <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <Link
                    to="/produk-layanan"
                    className="text-antlia-blue hover:underline flex items-center font-medium"
                  >
                    {t("products.view_details_link")} <ArrowRight className="ml-1 w-4 h-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-10 animate-on-scroll">
            <Button className="bg-antlia-blue hover:bg-antlia-blue/80">
              <Link to="/produk-layanan" className="flex items-center">
                {t("products.view_all_products_button")} <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
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
                <h2 className="text-3xl font-bold mb-4">{t("cta.title")}</h2>
                <p className="text-gray-600 mb-6 max-w-xl">
                  {t("cta.description")}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Button className="bg-antlia-blue hover:bg-antlia-blue/80">
                    <Link to="/kontak" className="flex items-center">
                      {t("cta.contact_button")} <ArrowRight size={16} className="ml-2" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="border-antlia-blue text-antlia-blue hover:bg-antlia-blue/10"
                  >
                    <a
                      href="https://wa.me/6281573635143"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                      WhatsApp <Phone size={16} className="ml-2" />
                    </a>
                  </Button>
                </div>
              </div>
              <div className="w-full md:w-1/3">
                <img
                  src="/assets/cta-image.png"
                  alt={t("cta.image_alt")}
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Logos */}
      <LogoMarquee logos={partners} />
      
      {/* Blog Preview Section - Updated to use real articles from Supabase */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-on-scroll">
            <span className="subtitle block mb-2">{t("articles.subtitle")}</span>
            <h2 className="text-3xl font-bold mb-4">{t("articles.title")}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t("articles.description")}
            </p>
          </div>

          {isLoadingArticles ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-antlia-blue"></div>
            </div>
          ) : latestArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestArticles.map((article, index) => (
                <div
                  key={article.id}
                  className="rounded-lg overflow-hidden p-[2px] flex flex-col"
                  style={{
                    background: "linear-gradient(135deg, #05b2fd, #6f42c1, #e17a9e)",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Card
                    className="border-0 bg-white flex flex-col h-full animate-on-scroll"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardHeader>
                      <CardTitle className="line-clamp-2">{article.title}</CardTitle>
                      <CardDescription>
                        {new Date(article.publishedAt).toLocaleDateString("id-ID")}
                        {article.category && (
                          <span className="inline-block bg-antlia-blue/10 text-antlia-blue px-2 py-1 text-xs rounded-full ml-2">
                            {article.category}
                          </span>
                        )}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col">
                      <div className="relative w-full aspect-[4/3] bg-gray-100 rounded-md mb-4 flex items-center justify-center overflow-hidden">
                        {article.coverImage ? (
                          <img
                            src={article.coverImage}
                            alt={article.title}
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <div className="w-full h-full bg-antlia-light/30 flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-16 w-16 text-antlia-blue/50"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                      <p className="text-gray-600 line-clamp-3">
                        {article.excerpt}
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Link
                        to={`/artikel/${article.slug}`}
                        className="text-antlia-blue hover:underline flex items-center"
                      >
                        {t("articles.read_more_link")} <ChevronRight className="ml-1 w-4 h-4" />
                      </Link>
                    </CardFooter>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">{t("articles.no_articles_message")}</p>
            </div>
          )}
          <div className="text-center mt-12">
            <Button variant="outline" asChild>
              <Link to="/artikel" className="flex items-center">
                {t("articles.view_all_articles_button")} <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Scroll to top button */}
      {isScrolled && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-antlia-blue text-white shadow-lg hover:bg-antlia-blue/90 transition-colors z-50"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
};

export default HomePage;
