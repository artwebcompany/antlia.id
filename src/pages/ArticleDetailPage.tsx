
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Article } from "@/types/article";
import { useToast } from "@/components/ui/use-toast";

const ArticleDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("articles")
          .select("*")
          .eq("slug", slug)
          .single();

        if (error) {
          throw error;
        }

        if (data) {
          setArticle({
            id: data.id,
            title: data.title,
            slug: data.slug,
            content: data.content,
            excerpt: data.excerpt,
            author: data.author,
            authorEmail: data.author_email,
            category: data.category,
            keywords: data.keywords || [],
            createdAt: data.created_at,
            updatedAt: data.updated_at,
            publishedAt: data.published_at,
            coverImage: data.cover_image,
            status: data.status,
            readingTime: data.reading_time,
            images: data.images || [] 
          });
        }
      } catch (error: any) {
        if (error.code === 'PGRST116') {
        } else {
          toast({
            title: "Error",
            description: `Gagal mengambil artikel: ${error.message}`,
            variant: "destructive",
          });
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchArticle();
    }
  }, [slug, toast]);
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-antlia-blue"></div>
        <p className="mt-4 text-gray-600">Memuat artikel...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-xl font-bold mb-4">Artikel tidak ditemukan</h1>
        <p className="mb-8">Artikel yang Anda cari tidak tersedia atau telah dihapus.</p>
        <Button 
          onClick={() => navigate("/artikel")}
          className="bg-antlia-blue hover:bg-blue-600"
        >
          Kembali ke Daftar Artikel
        </Button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <Link to="/artikel" className="inline-flex items-center text-antlia-blue mb-6 hover:underline">
        <ArrowLeft className="h-4 w-4 mr-1" />
        Kembali ke Daftar Artikel
      </Link>
      
      <article>
  <header className="mb-8">
    <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
      {article.category && (
        <>
          <span className="bg-antlia-blue/10 text-antlia-blue px-3 py-1 rounded-full">
            {article.category}
          </span>
          <span>•</span>
        </>
      )}
      <time dateTime={article.publishedAt}>
        {new Date(article.publishedAt).toLocaleDateString('id-ID', { 
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })}
      </time>
      {article.readingTime && (
        <>
          <span>•</span>
          <span>{article.readingTime} min read</span>
        </>
      )}
    </div>

    <h1 className="text-4xl font-bold mb-4">{article.title}</h1>

    <div className="flex items-center">
      <div className="w-10 h-10 bg-antlia-purple rounded-full flex items-center justify-center text-white overflow-hidden">
        {article.authorPhoto ? (
          <img 
            src={article.authorPhoto} 
            alt={article.author} 
            className="w-full h-full object-contain"
          />
        ) : (
          article.author.charAt(0)
        )}
      </div>
      <div className="ml-3">
        <p className="font-medium">{article.author}</p>
        {article.authorEmail && (
          <p className="text-sm text-gray-600">{article.authorEmail}</p>
        )}
      </div>
    </div>
  </header>

  {article.coverImage && (
    <div className="mb-8 relative w-full aspect-[16/9] bg-gray-100 rounded-lg overflow-hidden">
      <img 
        src={article.coverImage} 
        alt={article.title} 
        className="w-full h-full object-contain"
      />
    </div>
  )}

  <div 
    className="prose prose-lg max-w-none"
    dangerouslySetInnerHTML={{ __html: article.content }}
  />

  {article.images && article.images.length > 0 && (
    <div className="mt-10 mb-8">
      <h3 className="text-2xl font-semibold mb-4">Galeri</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {article.images.map((imageUrl, index) => (
          <div key={index} className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-md bg-gray-100">
            <img 
              src={imageUrl} 
              alt={`${article.title} - Gambar ${index + 1}`}
              className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  )}

  <footer className="mt-8 pt-8 border-t border-gray-200">
    <div className="flex flex-wrap gap-2">
      {article.keywords.map((keyword) => (
        <span 
          key={keyword} 
          className="bg-antlia-light text-gray-700 px-3 py-1 rounded-full text-sm"
        >
          #{keyword}
        </span>
      ))}
    </div>
  </footer>
</article>

    </div>
  );
};

export default ArticleDetailPage;
