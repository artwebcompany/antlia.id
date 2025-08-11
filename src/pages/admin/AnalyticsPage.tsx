import React, { useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Globe, TrendingUp, Clock, FileDown, PieChart as PieChartIcon } from 'lucide-react';
import { useQuery } from "@tanstack/react-query";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Button } from '@/components/ui/button';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

// Pastikan Anda telah menginstal pustaka ini dengan:
// npm install recharts jspdf html2canvas

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];

const AnalyticsPage = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  // =========================================================================
  //                  SESUAIKAN URL API ANDA DI SINI
  // =========================================================================
  const API_URL = "http://localhost/antlia-backend/api.php";
  // =========================================================================

  // Fetching data total pengunjung
  const { data: totalVisitorsData, isLoading: isLoadingVisitors } = useQuery({
    queryKey: ['totalVisitors'],
    queryFn: () =>
      fetch(`${API_URL}?type=totalVisitors`).then(res => res.json())
  });

  // Fetching data rata-rata waktu sesi
  const { data: averageSessionData, isLoading: isLoadingAverageTime } = useQuery({
    queryKey: ['averageSessionTime'],
    queryFn: () =>
      fetch(`${API_URL}?type=averageSessionTime`).then(res => res.json())
  });

  // Fetching data kunjungan per negara
  const { data: visitorsByCountryData, isLoading: isLoadingCountry } = useQuery({
    queryKey: ['visitorsByCountry'],
    queryFn: () =>
      fetch(`${API_URL}?type=visitorsByCountry`).then(res => res.json())
  });

  // Fetching data kunjungan per browser
  const { data: visitorsByBrowserData, isLoading: isLoadingBrowser } = useQuery({
    queryKey: ['visitorsByBrowser'],
    queryFn: () =>
      fetch(`${API_URL}?type=visitorsByBrowser`).then(res => res.json())
  });

  // Fetching data kunjungan per halaman
  const { data: pageViewsData, isLoading: isLoadingPageViews } = useQuery({
    queryKey: ['pageViews'],
    queryFn: () =>
      fetch(`${API_URL}?type=pageViews`).then(res => res.json())
  });

  const formatSeconds = (seconds: number) => {
    if (seconds < 60) return `${seconds} detik`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} menit ${remainingSeconds} detik`;
  };

  const handleExportPdf = async () => {
    if (!pageRef.current) return;
    const canvas = await html2canvas(pageRef.current, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps= pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save("laporan-analitik.pdf");
  };

  return (
    <div className="space-y-6" ref={pageRef}>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Analitik Website</h1>
        <Button onClick={handleExportPdf} className="flex items-center gap-2">
          <FileDown className="h-4 w-4" />
          Ekspor ke PDF
        </Button>
      </div>
      <p className="text-lg text-gray-600">
        Dashboard ini menampilkan data trafik website secara real-time.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Card untuk Total Pengunjung */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Pengunjung
            </CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            {isLoadingVisitors ? (
              <div className="text-2xl font-bold">Memuat...</div>
            ) : (
              <div className="text-2xl font-bold">{totalVisitorsData?.data?.totalVisitors ?? 0}</div>
            )}
            <p className="text-xs text-gray-500">Berdasarkan session ID unik</p>
          </CardContent>
        </Card>
        
        {/* Card untuk Rata-rata Waktu Sesi */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Rata-rata Waktu Sesi
            </CardTitle>
            <Clock className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            {isLoadingAverageTime ? (
              <div className="text-2xl font-bold">Memuat...</div>
            ) : (
              <div className="text-2xl font-bold">
                {formatSeconds(averageSessionData?.data?.averageTime ?? 0)}
              </div>
            )}
            <p className="text-xs text-gray-500">Waktu rata-rata per kunjungan</p>
          </CardContent>
        </Card>

        {/* Card untuk Kunjungan per Negara */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Negara Terpopuler
            </CardTitle>
            <Globe className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            {isLoadingCountry ? (
              <div className="text-2xl font-bold">Memuat...</div>
            ) : (
              <div className="text-2xl font-bold">
                {visitorsByCountryData?.data?.[0]?.country ?? 'N/A'}
              </div>
            )}
            <p className="text-xs text-gray-500">Berdasarkan kunjungan</p>
          </CardContent>
        </Card>

        {/* Card untuk Kunjungan per Browser */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Browser Terpopuler
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            {isLoadingBrowser ? (
              <div className="text-2xl font-bold">Memuat...</div>
            ) : (
              <div className="text-2xl font-bold">
                {visitorsByBrowserData?.data?.[0]?.browser ?? 'N/A'}
              </div>
            )}
            <p className="text-xs text-gray-500">Berdasarkan kunjungan</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Grafik Kunjungan per Halaman */}
        <Card>
          <CardHeader>
            <CardTitle>Kunjungan per Halaman</CardTitle>
            <CardDescription>Grafik batang yang menunjukkan kunjungan per URL.</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingPageViews ? (
              <div className="h-[350px] w-full flex items-center justify-center text-gray-500">Memuat grafik...</div>
            ) : (
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={pageViewsData?.data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="pageUrl" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" name="Jumlah Kunjungan" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Grafik Kunjungan per Browser (Pie Chart) */}
        <Card>
          <CardHeader>
            <CardTitle>Pengunjung Berdasarkan Browser</CardTitle>
            <CardDescription>Visualisasi persentase pengunjung dari setiap browser.</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingBrowser ? (
              <div className="h-[350px] w-full flex items-center justify-center text-gray-500">Memuat grafik...</div>
            ) : (
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={visitorsByBrowserData?.data}
                      dataKey="count"
                      nameKey="browser"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      label
                    >
                      {visitorsByBrowserData?.data?.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Tabel Kunjungan per Halaman */}
      <Card>
        <CardHeader>
          <CardTitle>Kunjungan per Halaman</CardTitle>
          <CardDescription>Daftar lengkap kunjungan per URL.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="max-h-[400px] overflow-auto">
            {isLoadingPageViews ? (
              <div>Memuat data...</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>URL Halaman</TableHead>
                    <TableHead className="text-right">Jumlah Kunjungan</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pageViewsData?.data?.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.pageUrl}</TableCell>
                      <TableCell className="text-right">{item.count}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Tabel Kunjungan per Negara */}
      <Card>
        <CardHeader>
          <CardTitle>Kunjungan per Negara</CardTitle>
          <CardDescription>Daftar kunjungan berdasarkan negara.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="max-h-[400px] overflow-auto">
            {isLoadingCountry ? (
              <div>Memuat data...</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Negara</TableHead>
                    <TableHead className="text-right">Jumlah Kunjungan</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {visitorsByCountryData?.data?.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.country}</TableCell>
                      <TableCell className="text-right">{item.count}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsPage;
