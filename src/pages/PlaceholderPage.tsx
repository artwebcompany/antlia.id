
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock, CheckCircle } from "lucide-react";
import FeatureCard from "@/components/FeatureCard";

const PlaceholderPage = () => {
  const location = useLocation();
  const path = location.pathname.substring(1); 
  
  const pageConfig = {
    "tentang-kami": {
      title: "Tentang",
      subtitle: "Kenali lebih dalam mengenai sejarah, visi, misi, dan nilai-nilai yang mendorong inovasi kami.",
      backgroundImage: "/assets/about-hero-bg.jpg",
      content: "tentang-kami"
    },
    "produk-layanan": {
      title: "Produk & Layanan",
      subtitle: "Solusi lengkap dari ANTLIA untuk memenuhi kebutuhan digital bisnis Anda.",
      backgroundImage: "/assets/services-hero-bg.jpg",
      content: "produk-layanan"
    },
    "solusi": {
      title: "Solusi",
      subtitle: "Pendekatan komprehensif untuk tantangan bisnis dengan teknologi terkini.",
      backgroundImage: "/assets/solutions-hero-bg.jpg",
      content: "solusi"
    },
    "klien": {
      title: "Klien Kami",
      subtitle: "Cerita sukses dari klien yang telah mempercayai layanan ANTLIA.",
      backgroundImage: "/assets/clients-hero-bg.jpg",
      content: "klien"
    },
  };
  
  const { title, subtitle, backgroundImage, content } = pageConfig[path as keyof typeof pageConfig] || {
    title: "Halaman",
    subtitle: "Informasi lengkap untuk Anda",
    backgroundImage: "/assets/hero-bg-alt.jpg",
    content: "default"
  };
  
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

  const renderContent = () => {
    switch (content) {
      case "tentang-kami":
        return renderAboutUs();
      case "produk-layanan":
        return renderProductsServices();
      case "solusi":
        return renderSolutions();
      case "klien":
        return renderClients();
      default:
        return (
          <div className="py-16 text-center">
            <h2 className="text-2xl font-bold mb-4">Halaman Dalam Pengembangan</h2>
            <p className="text-gray-600">Mohon maaf, halaman ini sedang dalam tahap pengembangan.</p>
          </div>
        );
    }
  };

  const renderAboutUs = () => (
    <>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll">
              <h2 className="text-xl font-bold mb-6">Sejarah ANTLIA</h2>
              <p className="text-gray-600 mb-4">
                Didirikan pada tahun 2013, ANTLIA bermula sebagai startup kecil dengan visi besar: 
                menghadirkan solusi teknologi kelas dunia yang dapat diakses oleh perusahaan Indonesia.
              </p>
              <p className="text-gray-600 mb-4">
                Setelah satu dekade berkarya, kami telah berkembang menjadi perusahaan teknologi 
                terkemuka dengan tim yang terdiri dari lebih dari 50 ahli di bidangnya masing-masing.
              </p>
              <p className="text-gray-600">
                Perjalanan kami dilandasi oleh komitmen kuat untuk selalu berinovasi dan memberikan 
                pelayanan terbaik kepada klien, menciptakan hubungan jangka panjang yang berlandaskan 
                kepercayaan dan hasil nyata.
              </p>
            </div>
            <div className="relative animate-on-scroll" style={{animationDelay: '200ms'}}>
              <img
                src="/assets/about-image.jpg"
                alt="Tim ANTLIA"
                className="rounded-lg shadow-lg w-full h-auto"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                <p className="text-2xl font-bold text-antlia-blue">10+</p>
                <p className="text-gray-600">Tahun Pengalaman</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-antlia-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 className="text-xl font-bold mb-4">Visi & Misi</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Komitmen kami untuk masa depan yang lebih baik melalui teknologi
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="hover:shadow-md transition-shadow duration-300 animate-on-scroll">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-antlia-blue">Visi Kami</h3>
                <p className="text-gray-600 mb-4">
                  Menjadi pemimpin inovasi teknologi di Indonesia yang mendorong 
                  transformasi digital dengan solusi yang inklusif dan berkelanjutan.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-antlia-blue mr-2" />
                    <span>Mendorong adopsi teknologi terdepan</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-antlia-blue mr-2" />
                    <span>Menjembatani kesenjangan digital</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-antlia-blue mr-2" />
                    <span>Menciptakan ekosistem teknologi yang berkelanjutan</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow duration-300 animate-on-scroll" style={{animationDelay: '200ms'}}>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-antlia-cyan">Misi Kami</h3>
                <p className="text-gray-600 mb-4">
                  Menghadirkan solusi teknologi yang inovatif, efektif, dan sesuai kebutuhan 
                  untuk membantu bisnis berkembang di era digital yang kompetitif.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-antlia-cyan mr-2" />
                    <span>Mengembangkan talenta digital Indonesia</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-antlia-cyan mr-2" />
                    <span>Memberikan solusi teknologi yang disesuaikan dengan kebutuhan lokal</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-antlia-cyan mr-2" />
                    <span>Mendukung UKM dalam adopsi teknologi</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 className="text-xl font-bold mb-4">Tim Kami</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Didukung oleh profesional berpengalaman yang berdedikasi untuk memberikan yang terbaik
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {name: "Ahmad Rasyid", position: "CEO & Founder", image: "/assets/team-1.jpg"},
              {name: "Siti Nuraini", position: "CTO", image: "/assets/team-2.jpg"},
              {name: "Budi Santoso", position: "Lead Developer", image: "/assets/team-3.jpg"},
              {name: "Maya Putri", position: "UX Design Lead", image: "/assets/team-4.jpg"}
            ].map((member, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow duration-300 overflow-hidden animate-on-scroll" style={{animationDelay: `${index * 100}ms`}}>
                <CardContent className="p-0">
                  <div className="h-48 overflow-hidden">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                    <p className="text-gray-600">{member.position}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );

  const renderProductsServices = () => (
    <>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 className="text-xl font-bold mb-4">Produk Unggulan Kami</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Solusi digital terbaik yang dirancang khusus untuk memenuhi kebutuhan bisnis Anda
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              title="ANTLIA CRM" 
              description="Sistem manajemen pelanggan komprehensif untuk mengoptimalkan hubungan dengan klien Anda"
              icon="Users"
              delay={100}
            />
            <FeatureCard 
              title="ANTLIA ERP" 
              description="Solusi Enterprise Resource Planning terintegrasi untuk efisiensi operasional bisnis"
              icon="BarChart"
              delay={200}
            />
            <FeatureCard 
              title="ANTLIA Analytics" 
              description="Platform analitik data untuk mengubah data mentah menjadi wawasan bisnis yang berharga"
              icon="PieChart"
              delay={300}
            />
          </div>
        </div>
      </section>

      <section className="py-16 bg-antlia-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 className="text-xl font-bold mb-4">Layanan Profesional</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Jasa konsultasi dan implementasi teknologi oleh tim ahli berpengalaman
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Pengembangan Aplikasi Kustom",
                description: "Membangun aplikasi yang disesuaikan dengan kebutuhan spesifik bisnis Anda",
                icon: "Code"
              },
              {
                title: "Konsultasi IT",
                description: "Pemetaan strategi teknologi untuk mendukung tujuan bisnis Anda",
                icon: "MessageSquare"
              },
              {
                title: "Cloud Migration",
                description: "Migrasi sistem ke cloud dengan aman dan efisien untuk skalabilitas yang lebih baik",
                icon: "Cloud"
              },
              {
                title: "Keamanan Cyber",
                description: "Lindungi aset digital Anda dengan solusi keamanan siber komprehensif",
                icon: "Shield"
              },
              {
                title: "Pengembangan Web & Mobile",
                description: "Wujudkan kehadiran digital Anda dengan aplikasi web dan mobile yang responsif",
                icon: "Smartphone"
              },
              {
                title: "Analisis Data & BI",
                description: "Ekstrak nilai dari data Anda untuk pengambilan keputusan yang lebih baik",
                icon: "Database"
              }
            ].map((service, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow duration-300 animate-on-scroll" style={{animationDelay: `${index * 100}ms`}}>
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="mr-4 p-2 bg-antlia-blue/10 rounded-lg">
                      <CheckCircle className="w-6 h-6 text-antlia-blue" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                      <p className="text-gray-600">{service.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 animate-on-scroll">
              <h2 className="text-xl font-bold mb-6">Dukungan & Pelatihan</h2>
              <p className="text-gray-600 mb-6">
                Kami memastikan keberhasilan implementasi dengan dukungan teknis 24/7 dan 
                program pelatihan komprehensif untuk tim Anda.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mr-4 p-2 bg-antlia-cyan/10 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-antlia-cyan" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-1">Dukungan Teknis 24/7</h4>
                    <p className="text-gray-600">Tim support siap membantu kapanpun Anda membutuhkan</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 p-2 bg-antlia-cyan/10 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-antlia-cyan" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-1">Program Pelatihan</h4>
                    <p className="text-gray-600">Sesi pelatihan interaktif untuk memaksimalkan nilai dari solusi kami</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 p-2 bg-antlia-cyan/10 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-antlia-cyan" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-1">Dokumentasi Lengkap</h4>
                    <p className="text-gray-600">Panduan pengguna dan dokumentasi teknis yang komprehensif</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2 animate-on-scroll" style={{animationDelay: '200ms'}}>
              <img
                src="/assets/support-training.jpg"
                alt="Dukungan dan Pelatihan"
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );

  const renderSolutions = () => (
    <>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll">
              <h2 className="text-xl font-bold mb-6">Solusi Industri</h2>
              <p className="text-gray-600 mb-6">
                ANTLIA menyediakan solusi yang dirancang khusus untuk berbagai sektor industri, 
                memahami tantangan unik yang dihadapi oleh setiap sektor dan menghadirkan teknologi 
                yang relevan untuk mengatasi tantangan tersebut.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <Card className="border-antlia-blue/20">
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold mb-2">Perbankan & Keuangan</h3>
                    <p className="text-sm text-gray-600">Solusi keamanan dan analitik untuk lembaga keuangan</p>
                  </CardContent>
                </Card>
                <Card className="border-antlia-blue/20">
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold mb-2">Ritel & E-commerce</h3>
                    <p className="text-sm text-gray-600">Platform omnichannel untuk pengalaman pelanggan terbaik</p>
                  </CardContent>
                </Card>
                <Card className="border-antlia-blue/20">
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold mb-2">Manufaktur</h3>
                    <p className="text-sm text-gray-600">Otomatisasi dan optimasi proses produksi</p>
                  </CardContent>
                </Card>
                <Card className="border-antlia-blue/20">
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold mb-2">Kesehatan</h3>
                    <p className="text-sm text-gray-600">Sistem manajemen data pasien dan telemedicine</p>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="relative animate-on-scroll" style={{animationDelay: '200ms'}}>
              <img
                src="/assets/industry-solutions.jpg"
                alt="Solusi Industri"
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-antlia-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 className="text-xl font-bold mb-4">Solusi Transformasi Digital</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Pendekatan holistik untuk transformasi digital bisnis Anda
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              title="Digital Workplace" 
              description="Platform kolaborasi dan produktivitas untuk lingkungan kerja modern dan fleksibel"
              icon="Laptop"
              delay={100}
            />
            <FeatureCard 
              title="Customer Experience" 
              description="Solusi yang mengutamakan pengalaman pelanggan di semua titik kontak digital"
              icon="Heart"
              delay={200}
            />
            <FeatureCard 
              title="Digital Operations" 
              description="Otomatisasi dan optimasi proses bisnis untuk efisiensi operasional yang lebih tinggi"
              icon="Settings"
              delay={300}
            />
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 className="text-xl font-bold mb-4">Metodologi Kami</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Pendekatan terstruktur untuk memastikan kesuksesan proyek transformasi digital Anda
            </p>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-antlia-blue/20 transform -translate-x-1/2"></div>
            
            {[
              {
                step: "01",
                title: "Penilaian & Perencanaan",
                description: "Menganalisis kebutuhan dan menyusun roadmap transformasi digital yang sesuai"
              },
              {
                step: "02",
                title: "Desain & Pengembangan",
                description: "Merancang dan membangun solusi dengan metodologi agile"
              },
              {
                step: "03",
                title: "Implementasi & Integrasi",
                description: "Menerapkan solusi dan mengintegrasikannya dengan sistem yang ada"
              },
              {
                step: "04",
                title: "Pelatihan & Adopsi",
                description: "Memastikan tim Anda siap mengoptimalkan solusi baru"
              },
              {
                step: "05",
                title: "Evaluasi & Pengembangan",
                description: "Mengukur hasil dan terus meningkatkan solusi berdasarkan feedback"
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className={`relative flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center mb-12 animate-on-scroll`}
                style={{animationDelay: `${index * 150}ms`}}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-white border-4 border-antlia-blue flex items-center justify-center text-antlia-blue font-bold">
                  {item.step}
                </div>
                <div className="w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );

  const renderClients = () => (
    <>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 className="text-xl font-bold mb-4">Klien Kami</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Perusahaan terkemuka yang mempercayakan transformasi digital mereka kepada ANTLIA
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-16">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <div key={num} className="flex items-center justify-center p-6 bg-white rounded-lg shadow-sm border animate-on-scroll" style={{animationDelay: `${num * 50}ms`}}>
                <img 
                  src={`/assets/client-${num}.png`} 
                  alt={`Client ${num}`} 
                  className="max-h-16 w-auto grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </div>
          
          <div className="text-center animate-on-scroll">
            <h3 className="text-2xl font-semibold mb-6">Industri Kami Layani</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                "Perbankan & Keuangan", 
                "Teknologi", 
                "Ritel & E-commerce", 
                "Manufaktur",
                "Kesehatan", 
                "Pendidikan", 
                "Transportasi & Logistik",
                "Media & Hiburan"
              ].map((industry, index) => (
                <span 
                  key={index} 
                  className="px-4 py-2 bg-antlia-blue/10 text-antlia-blue rounded-full text-sm font-medium animate-on-scroll"
                  style={{animationDelay: `${index * 50}ms`}}
                >
                  {industry}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-antlia-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 className="text-xl font-bold mb-4">Studi Kasus</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Kisah sukses transformasi digital bersama klien kami
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                client: "Bank Nusantara",
                title: "Transformasi Digital Core Banking",
                description: "Modernisasi sistem perbankan inti untuk meningkatkan keamanan dan pengalaman nasabah",
                image: "/assets/case-study-1.jpg",
                result: "30% peningkatan efisiensi operasional"
              },
              {
                client: "MegaRetail Group",
                title: "Solusi Omnichannel Terintegrasi",
                description: "Implementasi platform ritel omnichannel untuk pengalaman belanja yang mulus",
                image: "/assets/case-study-2.jpg",
                result: "45% peningkatan penjualan online"
              },
              {
                client: "IndiManufactur",
                title: "Smart Factory Implementation",
                description: "Otomatisasi dan digitalisasi proses produksi untuk efisiensi yang lebih tinggi",
                image: "/assets/case-study-3.jpg",
                result: "25% pengurangan biaya operasional"
              }
            ].map((study, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-300 animate-on-scroll" style={{animationDelay: `${index * 100}ms`}}>
                <div className="h-48 overflow-hidden">
                  <img 
                    src={study.image} 
                    alt={study.title} 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="text-sm font-medium text-antlia-blue mb-2">{study.client}</div>
                  <h3 className="text-xl font-semibold mb-2">{study.title}</h3>
                  <p className="text-gray-600 mb-4">{study.description}</p>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <div className="text-sm font-medium">Hasil:</div>
                    <div className="text-sm text-antlia-blue font-medium">{study.result}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-antlia-blue to-antlia-cyan rounded-xl overflow-hidden shadow-lg">
            <div className="p-8 md:p-12 text-white">
              <h2 className="text-xl font-bold mb-4">Bergabunglah dengan Klien Kami</h2>
              <p className="mb-6 max-w-2xl">
                Mulai perjalanan transformasi digital bersama ANTLIA dan rasakan perbedaannya. 
                Tim kami siap membantu Anda menavigasi tantangan dan memanfaatkan peluang era digital.
              </p>
              <Button className="bg-white text-antlia-blue hover:bg-white/90">
                <a 
                  href="https://wa.me/6281573635143" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <Phone className="w-4 h-4 mr-2" /> Hubungi Kami
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );

  return (
    <div>
      <PageHero title={title} subtitle={subtitle} backgroundImage={backgroundImage} />
      {renderContent()}
    </div>
  );
};

export default PlaceholderPage;
