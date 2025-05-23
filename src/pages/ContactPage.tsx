import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock, CheckCircle } from "lucide-react";
import PageHero from "@/components/PageHero";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    company: ""
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  
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
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prepare WhatsApp message
    const whatsappMessage = `Halo, saya ${formData.name} dari ${formData.company || 'tidak disebutkan'}.%0A%0A` +
      `Saya tertarik dengan layanan: ${formData.subject}%0A%0A` +
      `Detail kontak saya:%0A` +
      `Email: ${formData.email}%0A` +
      `Telepon: ${formData.phone}%0A%0A` +
      `Pesan:%0A${formData.message}`;
    
    // Open WhatsApp with the message
    window.open(`https://wa.me/6287702770999?text=${whatsappMessage}`, '_blank');
    
    // Reset form
    setFormSubmitted(true);
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      company: ""
    });
    
    // Reset submission status after 5 seconds
    setTimeout(() => {
      setFormSubmitted(false);
    }, 5000);
  };

  return (
    <>
      <PageHero 
        title="Hubungi Kami" 
        subtitle="Tim kami siap membantu Anda dengan pertanyaan dan kebutuhan Anda"
        backgroundImage="/assets/kontak.jpg"
      />
      
      {/* Contact Info & Form */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-1 animate-on-scroll">
              <div className="mb-8">
                <span className="subtitle block mb-2">Get in Touch</span>
                <h2 className="text-xl font-bold mb-4">Informasi Kontak</h2>
                <p className="text-gray-600">
                  Hubungi kami untuk konsultasi, informasi lebih lanjut, atau mulai kerjasama.
                </p>
              </div>
              
              <Card className="mb-6 hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="mr-4 p-2 bg-antlia-blue/10 rounded-full">
                      <Phone className="w-6 h-6 text-antlia-blue" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Telepon</h3>
                      <p className="text-gray-600 mb-2">Produk (Pak Roni)</p>
                      <a href="tel:+6287762877273" className="text-antlia-blue hover:underline">+62 87762877273</a>
                      <p className="text-gray-600 mb-2">Training (Angela )</p>
                      <a href="tel:+6287702770999" className="text-antlia-blue hover:underline">+62 87702770999</a>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mb-6 hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="mr-4 p-2 bg-antlia-blue/10 rounded-full">
                      <Mail className="w-6 h-6 text-antlia-blue" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Email</h3>
                      <p className="text-gray-600 mb-2">Produk </p>
                      <a href="mailto:hotmian@technokingindonesia.com" className="text-antlia-blue hover:underline">hotmian@technokingindonesia.com</a>
                      <p className="text-gray-600 mb-2">training </p>
                      <a href="mailto:angela@techokingindonesia.com" className="text-antlia-blue hover:underline">angela@techokingindonesia.com</a>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mb-6 hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="mr-4 p-2 bg-antlia-blue/10 rounded-full">
                      <MapPin className="w-6 h-6 text-antlia-blue" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Kantor Pusat</h3>
                      <p className="text-gray-600 mb-2">Tangerang</p>
                      <address className="text-gray-600 not-italic">
                      The Avani Nittaya, BSD City,<br />
                      Cisauk, Banten, Tangerang<br />
                      </address>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="mr-4 p-2 bg-antlia-blue/10 rounded-full">
                      <Clock className="w-6 h-6 text-antlia-blue" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Jam Kerja</h3>
                      <div className="text-gray-600">
                        <p className="mb-1">Senin - Jumat: 08:00 - 17:00</p>
                        <p>Sabtu : 08:00 - 14.00</p>
                        <p>Customer Services : 24/7</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Contact Form */}
            <div className="lg:col-span-2 animate-on-scroll" style={{animationDelay: "200ms"}}>
              <Card>
                <CardContent className="p-6 md:p-8">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold mb-2">Kirim Pesan</h2>
                    <p className="text-gray-600">
                      Isi formulir di bawah ini dan tim kami akan menghubungi Anda sesegera mungkin.
                    </p>
                  </div>
                  
                  {formSubmitted ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
                      <CheckCircle className="text-green-500 w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-green-800">Pesan Terkirim!</h3>
                        <p className="text-green-700">
                          Terima kasih telah menghubungi kami. Tim kami akan segera meninjau pesan Anda dan menghubungi Anda.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Nama Lengkap</label>
                          <input 
                            type="text" 
                            id="name" 
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-antlia-blue/50 focus:border-antlia-blue"
                            placeholder="Masukkan nama lengkap"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email</label>
                          <input 
                            type="email" 
                            id="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-antlia-blue/50 focus:border-antlia-blue"
                            placeholder="contoh@email.com"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label htmlFor="phone" className="block text-gray-700 font-medium mb-1">Nomor Telepon</label>
                          <input 
                            type="tel" 
                            id="phone" 
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-antlia-blue/50 focus:border-antlia-blue"
                            placeholder="+62 8xx xxxx xxxx"
                          />
                        </div>
                        <div>
                          <label htmlFor="company" className="block text-gray-700 font-medium mb-1">Perusahaan (opsional)</label>
                          <input 
                            type="text" 
                            id="company" 
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-antlia-blue/50 focus:border-antlia-blue"
                            placeholder="Nama perusahaan"
                          />
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <label htmlFor="subject" className="block text-gray-700 font-medium mb-1">Jenis Layanan</label>
                        <select 
                          id="subject" 
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-antlia-blue/50 focus:border-antlia-blue"
                        >
                          <option value="">Pilih layanan</option>
                          <option value="Antlia CRM">Antlia CRM</option>
                          <option value="Antlia POS">Antlia POS</option>
                          <option value="Antlia ERP">Antlia ERP</option>
                          <option value="Antlia WMS">Antlia WMS</option>
                          <option value="Antlia TMS">Antlia TMS</option>
                          <option value="Antlia IOT">Antlia IOT</option>
                          <option value="Antlia HRM">Antlia HRM</option>
                          <option value="IT Consulting">IT Consulting</option>
                          <option value="Business Operation Consulting">Business Operation Consulting</option>
                          <option value="Excel Training Course">Excel Training Course</option>
                          <option value="Workplace Communication Training">Workplace Communication Training</option>
                        </select>
                      </div>
                      
                      <div className="mb-6">
                        <label htmlFor="message" className="block text-gray-700 font-medium mb-1">Pesan</label>
                        <textarea 
                          id="message" 
                          name="message"
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          required
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-antlia-blue/50 focus:border-antlia-blue"
                          placeholder="Jelaskan kebutuhan Anda secara detail..."
                        ></textarea>
                      </div>
                      
                      <div>
                        <Button type="submit" className="bg-antlia-blue hover:bg-antlia-blue/80 w-full md:w-auto">
                          Kirim Pesan
                        </Button>
                      </div>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="py-10 bg-antlia-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 animate-on-scroll">
            <span className="subtitle block mb-2">Our Location</span>
            <h2 className="text-xl font-bold mb-4">Temukan Kami</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Kunjungi kantor kami untuk diskusi langsung dengan tim ANTLIA.
            </p>
          </div>
          
          <div className="rounded-xl overflow-hidden shadow-lg h-[400px] animate-on-scroll">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.5577769944894!2d106.65146037380381!3d-6.321667393667782!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69e4c0977ecf73%3A0x68b071ebaecdcbbc!2sThe%20Avani%20BSD%20City%20Cluster%20Nittaya!5e0!3m2!1sid!2sid!4v1747808590363!5m2!1sid!2sid" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }}
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="ANTLIA Office Location"
            ></iframe>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
  
    </>
  );
};

export default ContactPage;