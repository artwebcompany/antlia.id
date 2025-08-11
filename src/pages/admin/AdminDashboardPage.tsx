import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";

const AdminDashboardPage = () => {
  const [statistics, setStatistics] = useState({
    totalArticles: 0,
    publishedArticles: 0,
    draftArticles: 0,
    uniqueAuthors: 0,
    monthlyArticles: 0,
  });
  const [recentArticles, setRecentArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Fetch dashboard data from Supabase
  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        const { data: allArticles, error: articlesError } = await supabase
          .from("articles")
          .select("*")
          .order("updated_at", { ascending: false });

        if (articlesError) throw articlesError;

        if (allArticles) {
          const published = allArticles.filter((a) => a.status === "published").length;
          const drafts = allArticles.filter((a) => a.status === "draft").length;
          const uniqueAuthors = new Set(allArticles.map((a) => a.author)).size;

          const now = new Date();
          const currentMonth = now.getMonth();
          const currentYear = now.getFullYear();

          const monthlyArticles = allArticles.filter((article) => {
            const date = new Date(article.published_at);
            return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
          }).length;

          setStatistics({
            totalArticles: allArticles.length,
            publishedArticles: published,
            draftArticles: drafts,
            uniqueAuthors,
            monthlyArticles,
          });

          setRecentArticles(allArticles.slice(0, 5));
        }
      } catch (error: any) {
        toast({
          title: "Error",
          description: `Gagal mengambil data: ${error.message}`,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [toast]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-400"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 bg-gray-50 min-h-screen p-6">
      {/* Gradient Header Container */}
      <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 text-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-extrabold">Dashboard Admin</h1>
        <p className="text-sm mt-1 opacity-90">Selamat datang di panel admin ANTLIA.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border border-gray-200 shadow hover:shadow-md transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Artikel
            </CardTitle>
            <FileText className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{statistics.totalArticles}</div>
            <p className="text-sm text-gray-600 mt-1">
              {statistics.publishedArticles} dipublikasikan, {statistics.draftArticles} draft
            </p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow hover:shadow-md transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Penulis
            </CardTitle>
            <Users className="h-5 w-5 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{statistics.uniqueAuthors}</div>
            <p className="text-sm text-gray-600 mt-1">
              Total penulis aktif
            </p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow hover:shadow-md transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Bulan Ini
            </CardTitle>
            <Calendar className="h-5 w-5 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{statistics.monthlyArticles}</div>
            <p className="text-sm text-gray-600 mt-1">
              Artikel dipublikasikan bulan ini
            </p>
          </CardContent>
        </Card>
      </div>

      <Card
  className="shadow bg-white rounded-xl overflow-hidden border border-transparent"
  style={{
    borderImage: "linear-gradient(to right, #3b82f6, #8b5cf6, #ef4444) 1",
    borderImageSlice: 1,
  }}
>
  <CardHeader>
    <CardTitle>Artikel Terbaru</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="relative overflow-x-auto">
      <table className="w-full text-left border-separate border-spacing-0">
        <thead className="text-sm uppercase bg-gradient-to-r from-blue-500 via-purple-600 to-red-500 text-white">
          <tr>
            <th className="px-4 py-3 border-r border-white">No</th>
            <th className="px-6 py-3 border-r border-white">Judul</th>
            <th className="px-6 py-3 border-r border-white">Penulis</th>
            <th className="px-6 py-3 border-r border-white">Status</th>
            <th className="px-6 py-3">Tanggal</th>
          </tr>
        </thead>
        <tbody>
          {recentArticles.length > 0 ? (
            recentArticles.map((article: any, index: number) => (
              <tr
                key={article.id}
                style={{
                  borderBottom: "2px solid",
                  borderImage: "linear-gradient(to right, #93c5fd, #ddd6fe, #fecaca) 1",
                }}
                className="bg-white"
              >
                <td className="px-4 py-4 border-r border-gray-200 text-gray-700 whitespace-nowrap overflow-hidden text-ellipsis max-w-[60px]">
                  {index + 1}
                </td>
                <td className="px-6 py-4 border-r border-gray-200 font-medium text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]">
                  <Link to={`/admin/articles/edit/${article.id}`} className="hover:text-blue-600">
                    {article.title}
                  </Link>
                </td>
                <td className="px-6 py-4 border-r border-gray-200 whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px]">
                  {article.author}
                </td>
                <td className="px-6 py-4 border-r border-gray-200 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    article.status === "published"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {article.status === "published" ? "Dipublikasikan" : "Draft"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                  {new Date(article.updated_at).toLocaleDateString("id-ID")}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                Belum ada artikel
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </CardContent>
</Card>

    </div>
  );
};

export default AdminDashboardPage;