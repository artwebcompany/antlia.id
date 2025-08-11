import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Article } from "@/types/article";
import { useToast } from "@/components/ui/use-toast";
import { useTranslation } from "react-i18next";

const ArticlesPage = () => {
  const { t, i18n } = useTranslation("articles");
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid"); // default view
  const { toast } = useToast();

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("articles")
          .select("*")
          .eq("status", "published")
          .order("published_at", { ascending: false });

        if (error) {
          throw error;
        }

        if (data) {
          const mappedArticles: Article[] = data.map(article => ({
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
            readingTime: article.reading_time
          }));

          setArticles(mappedArticles);
        }
      } catch (error: any) {
        toast({
          title: t("toast.errorTitle"),
          description: t("toast.errorMessage", { message: error.message }),
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, [t, toast]);

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.keywords.some(keyword =>
      keyword.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-2 text-center">{t("hero.title")}</h1>
      <p className="text-gray-600 mb-8 text-center">
        {t("hero.subtitle")}
      </p>

      <div className="mb-8 flex items-center gap-2">
        <input
          type="text"
          placeholder={t("search.placeholder")}
          className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-antlia-blue"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button
          onClick={() => setViewMode("grid")}
          className={`w-10 h-10 flex items-center justify-center rounded ${
            viewMode === "grid"
              ? "bg-antlia-blue text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          aria-label={t("viewToggle.gridLabel")}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
          </svg>
        </button>

        <button
          onClick={() => setViewMode("list")}
          className={`w-10 h-10 flex items-center justify-center rounded ${
            viewMode === "list"
              ? "bg-antlia-blue text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          aria-label={t("viewToggle.listLabel")}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="8" y1="6" x2="21" y2="6"></line>
            <line x1="8" y1="12" x2="21" y2="12"></line>
            <line x1="8" y1="18" x2="21" y2="18"></line>
            <circle cx="3" cy="6" r="1"></circle>
            <circle cx="3" cy="12" r="1"></circle>
            <circle cx="3" cy="18" r="1"></circle>
          </svg>
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-16">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-antlia-blue"></div>
          <p className="mt-4 text-gray-600">{t("status.loading")}</p>
        </div>
      ) : filteredArticles.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-xl text-gray-600">{t("status.noArticles")}</p>
        </div>
      ) : (
        <>
          {viewMode === "grid" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
                  <CardHeader className="p-0">
                    <div className="relative w-full aspect-[4/3] bg-antlia-light flex items-center justify-center overflow-hidden">
                      {article.coverImage ? (
                        <img 
                          src={article.coverImage} 
                          alt={article.title} 
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="w-16 h-16 text-antlia-blue">
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" 
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-6 flex-grow flex flex-col">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-500">
                        {new Date(article.publishedAt).toLocaleDateString(i18n.language)}
                      </span>
                      {article.category && (
                        <span className="inline-block bg-antlia-blue/10 text-antlia-blue px-2 py-1 text-xs rounded-full">
                          {article.category}
                        </span>
                      )}
                    </div>
                    <Link to={`/artikel/${article.slug}`}>
                      <h3 className="text-xl font-bold mb-2 hover:text-antlia-blue transition-colors">
                        {article.title}
                      </h3>
                    </Link>
                    <p className="text-gray-600 line-clamp-3">{article.excerpt}</p>
                  </CardContent>
                  
                  <CardFooter className="flex items-center justify-between pt-0">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-antlia-purple rounded-full flex items-center justify-center text-white">
                        {article.author.charAt(0)}
                      </div>
                      <span className="text-sm ml-2 text-gray-700">{article.author}</span>
                    </div>
                    {article.readingTime && (
                      <span className="text-sm text-gray-500">{t("readingTime", { count: article.readingTime })}</span>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}

          {viewMode === "list" && (
            <div className="space-y-6">
              {filteredArticles.map((article) => (
                <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-6 flex flex-col">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-500">
                        {new Date(article.publishedAt).toLocaleDateString(i18n.language)}
                      </span>
                      {article.category && (
                        <span className="inline-block bg-antlia-blue/10 text-antlia-blue px-2 py-1 text-xs rounded-full">
                          {article.category}
                        </span>
                      )}
                    </div>
                    <Link to={`/artikel/${article.slug}`}>
                      <h3 className="text-xl font-bold mb-2 hover:text-antlia-blue transition-colors">
                        {article.title}
                      </h3>
                    </Link>
                    <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
                    
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-antlia-purple rounded-full flex items-center justify-center text-white">
                          {article.author.charAt(0)}
                        </div>
                        <span className="text-sm ml-2 text-gray-700">{article.author}</span>
                      </div>
                      {article.readingTime && (
                        <span className="text-sm text-gray-500">{t("readingTime", { count: article.readingTime })}</span>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ArticlesPage;
