
import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, Star, CheckCircle } from "lucide-react";
import PageHero from "@/components/PageHero";

interface Feature {
  title: string;
  description: string;
}

interface Benefit {
  title: string;
  description: string;
}

interface ProductDetail {
  id: number;
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  image: string;
  gallery: string[];
  category: string;

  features: Feature[];
  benefits: Benefit[];
  useCases: string[];
  specs: Record<string, string>;
}

const products: ProductDetail[] = [
  {
    id: 1,
    slug: "antlia-crm",
    name: "ANTLIA CRM",
    description: "Sistem manajemen pelanggan komprehensif dengan fitur otomatisasi dan analitik",
    longDescription: "ANTLIA CRM adalah platform manajemen hubungan pelanggan yang dirancang untuk membantu bisnis dari segala ukuran mengelola interaksi dengan pelanggan secara lebih efektif. Dengan fitur otomatisasi pemasaran, manajemen penjualan, dan dukungan pelanggan yang terintegrasi, ANTLIA CRM memungkinkan bisnis untuk meningkatkan retensi pelanggan, mengoptimalkan proses penjualan, dan mendorong pertumbuhan bisnis.",
    image: "/assets/product-1.jpg",
    gallery: [],
    category: "Software",
    features: [
      {
        title: "Manajemen Kontak",
        description: "Kelola dan organisasikan informasi kontak pelanggan dengan fitur segmentasi dan pencarian lanjutan."
      },
      {
        title: "Otomatisasi Pemasaran",
        description: "Buat dan jalankan kampanye pemasaran otomatis yang dipersonalisasi berdasarkan perilaku pelanggan."
      },
      {
        title: "Manajemen Pipeline Penjualan",
        description: "Pantau dan kelola pipeline penjualan dengan visual drag-and-drop dan pelaporan real-time."
      },
      {
        title: "Analitik Pelanggan",
        description: "Analisis data pelanggan untuk mendapatkan wawasan yang dapat ditindaklanjuti dan prediksi perilaku pelanggan."
      },
      {
        title: "Integrasi Multi-Platform",
        description: "Terintegrasi dengan berbagai platform seperti email, sosial media, dan alat bisnis lainnya."
      },
      {
        title: "Mobile Access",
        description: "Akses CRM dari perangkat mobile untuk mengelola hubungan pelanggan kapan saja dan di mana saja."
      }
    ],
    benefits: [
      {
        title: "Peningkatan Retensi Pelanggan",
        description: "Tingkatkan loyalitas pelanggan dengan layanan yang lebih personal dan responsif berdasarkan data yang akurat."
      },
      {
        title: "Efisiensi Operasional",
        description: "Otomatisasi tugas rutin menghemat waktu dan mengurangi kesalahan manusia, sehingga meningkatkan efisiensi operasional."
      },
      {
        title: "Pengambilan Keputusan Berbasis Data",
        description: "Dapatkan wawasan yang dapat ditindaklanjuti dari data pelanggan untuk membuat keputusan bisnis yang lebih baik."
      },
      {
        title: "Peningkatan Konversi Penjualan",
        description: "Tingkatkan tingkat konversi dengan pengelolaan pipeline yang lebih efektif dan komunikasi yang tepat waktu."
      }
    ],
    useCases: [
      "Bisnis ritel yang ingin membangun hubungan pelanggan yang lebih kuat",
      "Perusahaan B2B yang ingin mengoptimalkan proses penjualan",
      "Perusahaan jasa yang membutuhkan manajemen kasus pelanggan yang efisien",
      "Startup yang ingin menskalakan operasi penjualan dan pemasaran mereka"
    ],
    specs: {
      "Deployment": "Cloud / On-premise",
      "Bahasa Antarmuka": "Bahasa Indonesia, English",
      "Platform": "Web, iOS, Android",
      "Integrasi": "API, Zapier, Webhooks",
      "Keamanan": "Enkripsi End-to-end, 2FA",
      "Penyimpanan": "Tidak Terbatas"
    },
  },

  {
    id: 2,
    slug: "antlia-pos",
    name: "ANTLIA POS",
    description: "Sistem kasir digital yang memudahkan transaksi jual beli secara langsung maupun online.",
    longDescription: "ANTLIA POS adalah sistem point of sale (POS) berbasis cloud yang dirancang khusus untuk mendukung UMKM di Indonesia. Cocok digunakan di berbagai bidang usaha seperti kuliner, ritel, laundry, barbershop, hingga layanan jasa lainnya. Dengan biaya langganan mulai dari Rp150.000 per bulan dan antarmuka yang ramah pengguna, ANTLIA POS membantu pelaku usaha mengelola transaksi, stok, dan laporan bisnis dengan mudah dan efisien.",
    image: "/assets/product-2.jpg",
    gallery: [],
    category: "Software + Hardware",
    features: [
      {
        title: "Transaksi Otomatis & Real-Time",
        description: "Penjualan tercatat secara otomatis tanpa risiko kehilangan data atau kesalahan hitungan."
      },
      {
        title: "Akses Mudah via HP atau Tablet",
        description: "Gunakan smartphone Android atau tablet sebagai mesin kasir tanpa investasi perangkat mahal."
      },
      {
        title: "Laporan Penjualan Instan",
        description: "Lihat omset harian, barang terlaris, jam sibuk, dan performa karyawan hanya dalam beberapa klik."
      },
      {
        title: "Manajemen Stok Cerdas",
        description: "Stok akan berkurang secara otomatis setelah transaksi dan memberikan notifikasi saat stok menipis."
      },
      {
        title: "Dukungan Berbagai Pembayaran",
        description: "Terima pembayaran tunai, QRIS, e-wallet, serta kartu debit/kredit yang langsung tercatat."
      },
      {
        title: "Manajemen Karyawan & Akses Terbatas",
        description: "Setiap kasir memiliki akun login sendiri untuk menjaga keamanan dan transparansi data transaksi."
      }
    ],
    benefits: [
      {
        title: "Efisiensi Biaya Operasional",
        description: "Biaya langganan dan implementasi terjangkau, cocok untuk UMKM dengan anggaran terbatas."
      },
      {
        title: "Kemudahan Penggunaan",
        description: "Antarmuka user-friendly yang mudah dipakai bahkan oleh pemula yang baru go digital."
      },
      {
        title: "Pengelolaan Bisnis Lebih Akurat",
        description: "Data transaksi dan inventaris selalu tersedia real-time, meminimalkan kesalahan manual."
      },
      {
        title: "Fleksibilitas Akses",
        description: "Monitor bisnis dari mana saja melalui dashboard berbasis cloud kapan pun Anda butuhkan."
      }
    ],
    useCases: [
      "Warung makan dan kedai kopi yang ingin meningkatkan kecepatan layanan",
      "Toko retail yang membutuhkan manajemen stok otomatis",
      "Usaha laundry atau barbershop yang ingin mengelola transaksi lebih cepat",
      "UMKM jasa yang ingin mengadopsi teknologi digital dalam operasional"
    ],
    specs: {
      "Deployment": "Cloud",
      "Bahasa Antarmuka": "Bahasa Indonesia, English",
      "Platform": "Web, Android",
      "Integrasi": "API, Printer Thermal, Barcode Scanner",
      "Keamanan": "Login Multi-Level, Enkripsi Data",
      "Penyimpanan": "Tidak Terbatas (berbasis langganan)"
    },
  },

  {
    id: 3,
    slug: "antlia-erp",
    name: "ANTLIA ERP",
    description: "Sistem Enterprise Resource Planning untuk mengintegrasikan dan mengotomatisasi berbagai proses bisnis perusahaan.",
    longDescription: "ANTLIA ERP adalah solusi teknologi yang membantu perusahaan mengelola dan mengintegrasikan berbagai proses bisnis secara efisien. Dengan kemampuan otomatisasi dan integrasi data antar departemen seperti keuangan, sumber daya manusia, produksi, dan distribusi, ANTLIA ERP memudahkan pengambilan keputusan serta meningkatkan produktivitas dan efisiensi operasional. Cocok untuk perusahaan dari berbagai ukuran yang ingin tumbuh secara skalabel dan profesional.",
    image: "/assets/product-3.jpg",
    gallery: [],
    category: "Software",
    features: [
      {
        title: "Manajemen Keuangan",
        description: "Fitur akuntansi umum, pengelolaan anggaran, dan pelaporan keuangan yang terintegrasi."
      },
      {
        title: "Manajemen Sumber Daya Manusia",
        description: "Kelola data karyawan, sistem penggajian, rekrutmen, hingga program pelatihan secara terpadu."
      },
      {
        title: "Manajemen Rantai Pasok",
        description: "Pantau inventaris, proses pengadaan, dan distribusi barang secara real-time dan terkoordinasi."
      },
      {
        title: "Manufaktur & Produksi",
        description: "Atur jadwal produksi, kendali kualitas, dan pemeliharaan peralatan secara efisien."
      },
      {
        title: "Customer Relationship Management (CRM)",
        description: "Integrasikan interaksi pelanggan, penjualan, dan layanan purna jual dalam satu platform."
      },
      {
        title: "Business Intelligence",
        description: "Akses dashboard dan laporan analitik mendalam untuk memantau dan mengevaluasi kinerja bisnis."
      },
      {
        title: "Kustomisasi & Pelatihan",
        description: "Solusi yang dapat disesuaikan dengan kebutuhan bisnis Anda, dilengkapi dukungan implementasi dan pelatihan."
      }
    ],
    benefits: [
      {
        title: "Integrasi Data Terpusat",
        description: "Hapus duplikasi data dan tingkatkan konsistensi informasi di seluruh departemen perusahaan."
      },
      {
        title: "Otomatisasi Proses Bisnis",
        description: "Kurangi pekerjaan manual dan minimalkan kesalahan dengan otomatisasi yang cepat dan akurat."
      },
      {
        title: "Pengambilan Keputusan Berbasis Data",
        description: "Dukungan laporan real-time dan analisis mendalam untuk pengambilan keputusan strategis."
      },
      {
        title: "Skalabilitas Tinggi",
        description: "Sistem yang mudah dikembangkan seiring pertumbuhan dan perubahan kebutuhan bisnis Anda."
      },
      {
        title: "Keamanan Data Perusahaan",
        description: "Perlindungan menyeluruh terhadap akses tidak sah dan ancaman keamanan lainnya."
      }
    ],
    useCases: [
      "Perusahaan manufaktur yang ingin mengintegrasikan alur kerja produksi dan logistik",
      "Bisnis ritel besar yang membutuhkan sinkronisasi antara gudang, toko, dan keuangan",
      "Perusahaan jasa yang ingin mengelola SDM, keuangan, dan CRM dalam satu sistem",
      "Startup atau UKM yang siap beralih ke sistem enterprise untuk pertumbuhan berkelanjutan"
    ],
    specs: {
      "Deployment": "Cloud / On-premise",
      "Bahasa Antarmuka": "Bahasa Indonesia, English",
      "Platform": "Web",
      "Integrasi": "API, Integrasi Internal Antar Modul, Webhooks",
      "Keamanan": "Role-Based Access Control, Enkripsi End-to-End, Backup Otomatis",
      "Penyimpanan": "Tidak Terbatas (berdasarkan paket langganan)"
    },
  },

  {
    id: 4,
    slug: "antlia-wms",
    name: "ANTLIA WMS",
    description: "Sistem manajemen gudang untuk meningkatkan efisiensi operasional dengan integrasi teknologi barcode/RFID.",
    longDescription: "ANTLIA WMS adalah sistem manajemen gudang berbasis teknologi terkini yang membantu perusahaan mengelola proses penerimaan, penyimpanan, pengambilan, hingga pengiriman barang secara otomatis dan real-time. Dengan dukungan teknologi barcode dan RFID, antarmuka intuitif, serta kemampuan skalabilitas tinggi, ANTLIA WMS memastikan pengelolaan inventaris lebih akurat, cepat, dan efisien untuk bisnis dari segala ukuran.",
    image: "/assets/product-4.jpg",
    gallery: [],
    category: "Software",
    features: [
      {
        title: "Manajemen Penerimaan Barang (Receiving)",
        description: "Pencatatan dan pelacakan barang masuk secara akurat dan efisien."
      },
      {
        title: "Penempatan Barang (Putaway)",
        description: "Mengoptimalkan lokasi penyimpanan barang di gudang untuk aksesibilitas maksimal."
      },
      {
        title: "Pengambilan Barang (Picking)",
        description: "Dukungan metode FIFO dan lainnya untuk memastikan pengambilan barang yang tepat."
      },
      {
        title: "Pengemasan & Pengiriman (Packing & Shipping)",
        description: "Memastikan keakuratan proses pengemasan dan waktu pengiriman yang optimal."
      },
      {
        title: "Pelacakan Inventaris Real-Time",
        description: "Visibilitas stok secara real-time untuk pengelolaan inventaris yang lebih baik."
      }
    ],
    benefits: [
      {
        title: "Efisiensi Operasional Gudang",
        description: "Otomatisasi tugas manual mengurangi waktu dan tenaga kerja yang diperlukan."
      },
      {
        title: "Pengurangan Kesalahan Human Error",
        description: "Teknologi pelacakan otomatis mengurangi risiko kesalahan dalam pengambilan dan pengiriman."
      },
      {
        title: "Antarmuka Ramah Pengguna",
        description: "Kemudahan pengoperasian tanpa pelatihan intensif bagi karyawan baru."
      },
      {
        title: "Skalabilitas Tinggi",
        description: "Solusi fleksibel yang dapat disesuaikan dengan pertumbuhan dan kebutuhan bisnis."
      },
      {
        title: "Peningkatan Kepuasan Pelanggan",
        description: "Proses logistik yang cepat dan akurat meningkatkan kepuasan dan loyalitas pelanggan."
      }
    ],
    useCases: [
      "Perusahaan e-commerce dengan volume pengiriman tinggi",
      "Gudang distribusi besar yang ingin meningkatkan akurasi inventaris",
      "Industri manufaktur yang membutuhkan manajemen bahan baku dan hasil produksi",
      "Logistik internal perusahaan ritel"
    ],
    specs: {
      "Deployment": "Cloud / On-premise",
      "Bahasa Antarmuka": "Bahasa Indonesia, English",
      "Platform": "Web",
      "Integrasi": "Barcode Scanner, RFID Reader, API",
      "Keamanan": "Role-Based Access Control, Enkripsi Data",
      "Penyimpanan": "Tidak Terbatas (berdasarkan langganan)"
    },
  },

  {
    id: 5,
    slug: "antlia-tms",
    name: "ANTLIA TMS",
    description: "Sistem manajemen transportasi untuk optimasi logistik, pengurangan biaya, dan peningkatan kepuasan pelanggan.",
    longDescription: "ANTLIA TMS adalah solusi digital yang dirancang untuk membantu perusahaan mengelola seluruh aspek transportasi dan logistik secara efisien. Sistem ini menawarkan otomatisasi proses seperti perencanaan rute, pemilihan carrier, pelacakan pengiriman, dan analisis biaya transportasi. Integrasi kuat dengan ERP dan WMS membuat aliran data lancar, visibilitas rantai pasok meningkat, dan pengambilan keputusan menjadi lebih cepat dan akurat.",
    image: "/assets/product-5.jpg",
    gallery: [],
    category: "Software",
    features: [
      {
        title: "Perencanaan Rute & Pemilihan Carrier",
        description: "Optimalkan rute pengiriman dan pilih carrier terbaik berdasarkan biaya, waktu, dan kapasitas."
      },
      {
        title: "Pelacakan Pengiriman Real-Time",
        description: "Pantau status pengiriman dari titik awal hingga tujuan secara langsung."
      },
      {
        title: "Manajemen Armada",
        description: "Kelola kondisi kendaraan, jadwal pemeliharaan, dan ketersediaan armada."
      },
      {
        title: "Analisis & Pelaporan",
        description: "Akses laporan menyeluruh tentang kinerja transportasi, biaya, dan kepuasan pelanggan."
      },
      {
        title: "Integrasi dengan Sistem Lain",
        description: "Terintegrasi dengan ERP, WMS, dan sistem bisnis lainnya untuk sinkronisasi data yang mulus."
      }
    ],
    benefits: [
      {
        title: "Efisiensi Operasional Transportasi",
        description: "Otomatisasi proses mengurangi beban kerja manual dan meningkatkan akurasi."
      },
      {
        title: "Pengurangan Biaya Logistik",
        description: "Analisis biaya dan optimasi rute membantu meningkatkan profitabilitas."
      },
      {
        title: "Visibilitas & Kontrol Penuh",
        description: "Monitor seluruh aktivitas transportasi untuk pengambilan keputusan yang lebih baik."
      },
      {
        title: "Peningkatan Kepuasan Pelanggan",
        description: "Pengiriman yang tepat waktu dan akurat meningkatkan loyalitas pelanggan."
      },
      {
        title: "Fleksibilitas & Skalabilitas",
        description: "Cocok untuk bisnis kecil maupun besar dan bisa berkembang seiring kebutuhan."
      }
    ],
    useCases: [
      "Perusahaan logistik yang ingin meningkatkan efisiensi armada",
      "E-commerce dengan kebutuhan distribusi luas",
      "Perusahaan manufaktur yang mengelola pengiriman produk",
      "Bisnis retail dengan cabang banyak dan pengiriman rutin"
    ],
    specs: {
      "Deployment": "Cloud / On-premise",
      "Bahasa Antarmuka": "Bahasa Indonesia, English",
      "Platform": "Web",
      "Integrasi": "API, ERP, WMS",
      "Keamanan": "Login Multi-Level, Enkripsi End-to-End",
      "Penyimpanan": "Tidak Terbatas (berdasarkan paket langganan)"
    },
  },

  {
    id: 6,
    slug: "antlia-iot",
    name: "ANTLIA IoT",
    description: "Solusi Internet of Things untuk pemantauan real-time aset dan proses bisnis melalui dashboard cloud.",
    longDescription: "ANTLIA IoT adalah platform Internet of Things (IoT) yang membantu perusahaan memantau dan mengelola aset fisik serta proses bisnis secara real-time melalui perangkat terhubung dan dashboard berbasis cloud. Solusi ini dapat terintegrasi dengan ERP, WMS, dan TMS, sehingga memberikan visibilitas penuh, meningkatkan efisiensi operasional, serta mendukung pengambilan keputusan berbasis data secara real-time.",
    image: "/assets/product-6.jpg",
    gallery: [],
    category: "Software + Hardware",
    features: [
      {
        title: "Dashboard Pemantauan",
        description: "Antarmuka intuitif untuk memantau kondisi aset dan proses bisnis secara real-time."
      },
      {
        title: "Integrasi Perangkat IoT",
        description: "Dukungan sensor suhu, kelembaban, GPS, dan perangkat IoT lainnya."
      },
      {
        title: "Penyimpanan Data Cloud",
        description: "Data aman dan dapat diakses kapan saja dari mana saja melalui infrastruktur cloud."
      },
      {
        title: "Notifikasi & Peringatan Otomatis",
        description: "Sistem akan memberikan notifikasi jika ada kondisi yang memerlukan tindakan segera."
      },
      {
        title: "Analisis Data",
        description: "Alat analitik untuk mengevaluasi data dan mendukung pengambilan keputusan strategis."
      }
    ],
    benefits: [
      {
        title: "Pemantauan Real-Time",
        description: "Pantau kondisi aset dan proses secara langsung untuk respons yang cepat."
      },
      {
        title: "Efisiensi Operasional",
        description: "Otomatisasi dan pemantauan mengurangi kebutuhan intervensi manual."
      },
      {
        title: "Pengurangan Biaya",
        description: "Identifikasi pemborosan dan prediksi masalah sebelum terjadi kerusakan besar."
      },
      {
        title: "Integrasi Kuat",
        description: "Terhubung dengan sistem ERP, WMS, dan TMS untuk sinergi operasional."
      },
      {
        title: "Peningkatan Kualitas Layanan",
        description: "Respons cepat terhadap masalah meningkatkan kepuasan dan loyalitas pelanggan."
      }
    ],
    useCases: [
      "Perusahaan manufaktur yang memantau kondisi mesin",
      "Distribusi logistik dengan monitoring suhu atau lokasi",
      "Pertanian presisi dengan sensor lingkungan",
      "Rumah sakit yang memantau peralatan medis vital"
    ],
    specs: {
      "Deployment": "Cloud / On-premise",
      "Bahasa Antarmuka": "Bahasa Indonesia, English",
      "Platform": "Web, Mobile",
      "Integrasi": "Sensor IoT, API, Dashboard Terpadu",
      "Keamanan": "Enkripsi Data, Role-Based Access",
      "Penyimpanan": "Tidak Terbatas (berdasarkan paket)"
    },
  },

  {
    id: 7,
    slug: "antlia-hrm",
    name: "ANTLIA HRM",
    description: "Sistem manajemen sumber daya manusia untuk otomatisasi rekrutmen, penggajian, pelatihan, dan kinerja karyawan.",
    longDescription: "ANTLIA HRM adalah solusi digital yang membantu perusahaan mengelola seluruh aspek sumber daya manusia secara terintegrasi dan efisien. Dengan fitur otomatisasi proses HR seperti absensi, cuti, penggajian, dan rekrutmen, sistem ini meningkatkan produktivitas tim HR sekaligus memudahkan akses informasi bagi karyawan. Sistem ini dirancang fleksibel untuk mendukung kebutuhan perusahaan dari berbagai ukuran dan sektor industri.",
    image: "/assets/product-7.jpg",
    gallery: [],
    category: "Software",
    features: [
      {
        title: "Integrasi Sistem yang Terpadu",
        description: "Terintegrasi dengan sistem ERP dan Payroll untuk pengelolaan data karyawan yang efisien dan terpusat."
      },
      {
        title: "Automasi Proses HR",
        description: "Mempercepat proses absensi, cuti, penggajian, dan rekrutmen dengan fitur otomatisasi canggih."
      },
      {
        title: "User Interface yang Mudah Digunakan",
        description: "Antarmuka intuitif yang mudah diakses oleh HR maupun karyawan tanpa pelatihan intensif."
      },
      {
        title: "Skalabilitas dan Fleksibilitas",
        description: "Dapat disesuaikan dengan kebutuhan perusahaan besar atau kecil serta bisa dikembangkan seiring pertumbuhan bisnis."
      },
      {
        title: "Keamanan Data Karyawan",
        description: "Perlindungan mutakhir untuk menjaga kerahasiaan dan integritas data personal karyawan."
      },
      {
        title: "Dukungan Pelanggan Profesional",
        description: "Tim dukungan teknis dan pelatihan tersedia untuk memastikan implementasi sistem berjalan lancar dan maksimal."
      }
    ],
    benefits: [
      {
        title: "Efisiensi Manajemen SDM",
        description: "Proses administratif HR lebih cepat dan akurat dengan bantuan otomatisasi."
      },
      {
        title: "Peningkatan Produktivitas Karyawan",
        description: "Karyawan dapat mengakses informasi penting seperti slip gaji, jadwal cuti, dan evaluasi kinerja secara mandiri."
      },
      {
        title: "Pengambilan Keputusan Berbasis Data",
        description: "Data karyawan dan kinerja tersedia real-time untuk analisis dan perencanaan strategis SDM."
      },
      {
        title: "Fleksibilitas Bisnis",
        description: "Sistem yang bisa dikustomisasi untuk berbagai jenis industri dan skala usaha."
      },
      {
        title: "Peningkatan Retensi Karyawan",
        description: "Manajemen kinerja dan pelatihan yang baik meningkatkan kepuasan dan loyalitas karyawan."
      }
    ],
    useCases: [
      "Perusahaan dengan ratusan karyawan yang ingin mengotomatiskan manajemen SDM",
      "Startup yang membutuhkan sistem HR yang mudah digunakan dan murah",
      "BUMN atau instansi pemerintah yang ingin modernisasi administrasi kepegawaian",
      "Perusahaan multinasional yang butuh sistem HR terpadu di berbagai cabang"
    ],
    specs: {
      "Deployment": "Cloud / On-premise",
      "Bahasa Antarmuka": "Bahasa Indonesia, English",
      "Platform": "Web, Mobile",
      "Integrasi": "ERP, Payroll, API, Webhooks",
      "Keamanan": "Role-Based Access Control, Enkripsi End-to-End, Backup Otomatis",
      "Penyimpanan": "Tidak Terbatas (berdasarkan paket langganan)"
    },
  }
];

const ProductDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = products.find(p => p.slug === slug);
  
  useEffect(() => {
    if (!product) {
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
  }, [product]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-xl font-bold mb-4">Produk tidak ditemukan</h1>
        <p className="mb-6">Maaf, produk yang Anda cari tidak ditemukan.</p>
        <Link to="/produk-layanan" className="text-antlia-blue hover:underline flex items-center">
          <ArrowLeft className="mr-2" /> Kembali ke Daftar Produk
        </Link>
      </div>
    );
  }

  return (
    <>
      <PageHero 
        title={product.name} 
        subtitle={`Kategori: ${product.category}`}
        backgroundImage="/assets/services-hero-bg.jpg"
      />
      
      {/* Product Introduction */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="w-full lg:w-1/2 animate-on-scroll">
              <div className="relative rounded-lg overflow-hidden shadow-lg mb-6 h-80 md:h-96">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-antlia-blue text-white text-xs font-bold px-3 py-1 rounded-full">
                  {product.category}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {product.gallery.map((img, index) => (
                  <div key={index} className="rounded-lg overflow-hidden shadow-md h-24 md:h-32">
                    <img src={img} alt={`${product.name} gallery ${index+1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 animate-on-scroll" style={{animationDelay: "200ms"}}>
              <Link to="/produk-layanan" className="text-antlia-blue hover:underline flex items-center mb-6">
                <ArrowLeft className="mr-2 w-4 h-4" /> Kembali ke Daftar Produk
              </Link>
              <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
              <div className="flex items-center mb-6">
        
              </div>
              <p className="text-gray-700 mb-6">{product.longDescription}</p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-antlia-blue hover:bg-antlia-blue/80">
                  <Link to="/kontak" className="flex items-center">
                    Hubungi Untuk Demo
                  </Link>
                </Button>
                <Button variant="outline" className="border-antlia-blue text-antlia-blue hover:bg-antlia-blue/10">
                  <a 
                    href="https://wa.me/6281573635143" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    Konsultasi via WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section className="py-16 bg-antlia-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-on-scroll">
            <span className="subtitle block mb-2">Key Features</span>
            <h2 className="text-xl font-bold mb-4">Fitur Utama</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Jelajahi fitur-fitur unggulan dari {product.name} yang akan membantu bisnis Anda
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300 animate-on-scroll" style={{animationDelay: `${index * 100}ms`}}>
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="mr-4 p-2 bg-antlia-blue/10 rounded-lg">
                      <Check className="w-6 h-6 text-antlia-blue" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-on-scroll">
            <span className="subtitle block mb-2">Core Benefits</span>
            <h2 className="text-xl font-bold mb-4">Keunggulan & Manfaat</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Bagaimana {product.name} dapat membantu meningkatkan kinerja bisnis Anda
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {product.benefits.map((benefit, index) => (
              <div key={index} className="flex animate-on-scroll" style={{animationDelay: `${index * 150}ms`}}>
                <div className="mr-4 p-2 bg-antlia-blue/10 rounded-full flex-shrink-0 h-12 w-12 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-antlia-blue" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Use Cases & Specs */}
      <section className="py-16 bg-antlia-light">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Use Cases */}
            <div className="animate-on-scroll">
              <span className="subtitle block mb-2">Applications</span>
              <h2 className="text-xl font-bold mb-6">Use Cases</h2>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <ul className="space-y-4">
                  {product.useCases.map((useCase, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-antlia-blue mr-3 flex-shrink-0 mt-0.5" />
                      <span>{useCase}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Specs */}
            <div className="animate-on-scroll" style={{animationDelay: "200ms"}}>
              <span className="subtitle block mb-2">Technical Details</span>
              <h2 className="text-xl font-bold mb-6">Spesifikasi</h2>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <dl>
                  {Object.entries(product.specs).map(([key, value], index) => (
                    <div key={index} className={`${index > 0 ? 'border-t border-gray-100 pt-3 mt-3' : ''}`}>
                      <dt className="font-semibold text-gray-700">{key}</dt>
                      <dd className="text-gray-600">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ */}
      {/* <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-on-scroll">
            <span className="subtitle block mb-2">Questions & Answers</span>
            <h2 className="text-xl font-bold mb-4">Pertanyaan Umum</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Jawaban untuk pertanyaan yang sering diajukan tentang {product.name}
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            {product.faq.map((item, index) => (
              <Card key={index} className="mb-4 animate-on-scroll" style={{animationDelay: `${index * 100}ms`}}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{item.question}</h3>
                  <p className="text-gray-600">{item.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}
      
      {/* CTA Section */}
      <section className="py-16 bg-antlia-light">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-antlia-blue to-antlia-cyan rounded-xl overflow-hidden shadow-lg animate-on-scroll">
            <div className="p-8 md:p-12 text-white">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-xl font-bold mb-4">Siap untuk Meningkatkan Performa Bisnis Anda?</h2>
                <p className="mb-6">
                  Hubungi tim ANTLIA sekarang untuk konsultasi gratis dan demo {product.name}.
                  Biarkan kami menunjukkan bagaimana produk ini dapat membantu bisnis Anda berkembang.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button className="bg-white text-antlia-blue hover:bg-white/90">
                    <Link to="/kontak" className="flex items-center">
                      Jadwalkan Demo
                    </Link>
                  </Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white/10">
                    <a 
                      href="https://wa.me/6281573635143" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                      Hubungi via WhatsApp
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

export default ProductDetailPage;
