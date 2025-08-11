
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, PenTool, Code, Database, BarChart3, Smartphone, Monitor } from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      icon: <Code className="text-antlia-blue w-10 h-10" />,
      title: "Pengembangan Web",
      description: "Kami membangun website profesional yang sesuai kebutuhan bisnis Anda dengan desain modern dan responsif.",
      delay: 0
    },
    {
      icon: <Smartphone className="text-antlia-blue w-10 h-10" />,
      title: "Aplikasi Mobile",
      description: "Kembangkan aplikasi mobile Android dan iOS untuk menjangkau pelanggan di mana saja.",
      delay: 100
    },
    {
      icon: <Database className="text-antlia-blue w-10 h-10" />,
      title: "Solusi Cloud",
      description: "Pindahkan infrastruktur IT Anda ke cloud untuk skalabilitas dan efisiensi yang lebih baik.",
      delay: 200
    },
    {
      icon: <PenTool className="text-antlia-blue w-10 h-10" />,
      title: "Desain UI/UX",
      description: "Ciptakan pengalaman pengguna yang luar biasa dengan desain antarmuka yang intuitif dan menarik.",
      delay: 300
    },
    {
      icon: <BarChart3 className="text-antlia-blue w-10 h-10" />,
      title: "Analisis Data",
      description: "Ubah data Anda menjadi wawasan bisnis yang berharga melalui visualisasi dan analisis data.",
      delay: 400
    },
    {
      icon: <Monitor className="text-antlia-blue w-10 h-10" />,
      title: "IT Managed Services",
      description: "Kelola infrastruktur IT Anda dengan layanan dukungan yang komprehensif dan proaktif.",
      delay: 500
    }
  ];

};

export default ServicesSection;
