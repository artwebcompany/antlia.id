import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock, CheckCircle } from "lucide-react";
import PageHero from "@/components/PageHero";
import { useTranslation } from "react-i18next";

const ContactPage = () => {
  const { t } = useTranslation("contact");
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
    
    const whatsappMessage = `Halo, saya ${formData.name} dari ${formData.company || 'tidak disebutkan'}.%0A%0A` +
      `Saya tertarik dengan layanan: ${formData.subject}%0A%0A` +
      `Detail kontak saya:%0A` +
      `Email: ${formData.email}%0A` +
      `Telepon: ${formData.phone}%0A%0A` +
      `Pesan:%0A${formData.message}`;
    
    window.open(`https://wa.me/6285846612211?text=${whatsappMessage}`, '_blank');
    
    setFormSubmitted(true);
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      company: ""
    });
    
    setTimeout(() => {
      setFormSubmitted(false);
    }, 5000);
  };

  return (
    <>
      <PageHero 
        title={t("hero.title")} 
        subtitle={t("hero.subtitle")}
        backgroundImage="/assets/kontak.jpg"
      />
      
      {/* Contact Info & Form */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-1 animate-on-scroll">
              <div className="mb-8">
                <span className="subtitle block mb-2">{t("contactInfo.subtitle")}</span>
                <h2 className="text-xl font-bold mb-4">{t("contactInfo.title")}</h2>
                <p className="text-gray-600">
                  {t("contactInfo.description")}
                </p>
              </div>
              
              <Card className="mb-6 hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="mr-4 p-2 bg-antlia-blue/10 rounded-full">
                      <Phone className="w-6 h-6 text-antlia-blue" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{t("contactInfo.phone.title")}</h3>
                      <p className="text-gray-600 mb-2">{t("contactInfo.phone.productLabel")}</p>
                      <a href="tel:+6285846612211" className="text-antlia-blue hover:underline">+62 85846612211</a>
                      <p className="text-gray-600 mb-2">{t("contactInfo.phone.trainingLabel")}</p>
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
                      <h3 className="text-lg font-semibold mb-1">{t("contactInfo.email.title")}</h3>
                      <p className="text-gray-600 mb-2">{t("contactInfo.email.productLabel")}</p>
                      <a href="mailto:hotmian@technokingindonesia.com" className="text-antlia-blue hover:underline">hotmian@technokingindonesia.com</a>
                      <p className="text-gray-600 mb-2">{t("contactInfo.email.trainingLabel")}</p>
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
                      <h3 className="text-lg font-semibold mb-1">{t("contactInfo.address.title")}</h3>
                      <p className="text-gray-600 mb-2">{t("contactInfo.address.city")}</p>
                      <address className="text-gray-600 not-italic">
                        {t("contactInfo.address.line1")}<br />
                        {t("contactInfo.address.line2")}<br />
                        {t("contactInfo.address.line3")}<br />
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
                      <h3 className="text-lg font-semibold mb-1">{t("contactInfo.hours.title")}</h3>
                      <div className="text-gray-600">
                        <p className="mb-1">{t("contactInfo.hours.weekday")}</p>
                        <p>{t("contactInfo.hours.saturday")}</p>
                        <p>{t("contactInfo.hours.customerService")}</p>
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
                    <h2 className="text-2xl font-bold mb-2">{t("form.title")}</h2>
                    <p className="text-gray-600">
                      {t("form.description")}
                    </p>
                  </div>
                  
                  {formSubmitted ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
                      <CheckCircle className="text-green-500 w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-green-800">{t("form.successTitle")}</h3>
                        <p className="text-green-700">
                          {t("form.successMessage")}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label htmlFor="name" className="block text-gray-700 font-medium mb-1">{t("form.nameLabel")}</label>
                          <input 
                            type="text" 
                            id="name" 
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-antlia-blue/50 focus:border-antlia-blue"
                            placeholder={t("form.namePlaceholder")}
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-gray-700 font-medium mb-1">{t("form.emailLabel")}</label>
                          <input 
                            type="email" 
                            id="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-antlia-blue/50 focus:border-antlia-blue"
                            placeholder={t("form.emailPlaceholder")}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label htmlFor="phone" className="block text-gray-700 font-medium mb-1">{t("form.phoneLabel")}</label>
                          <input 
                            type="tel" 
                            id="phone" 
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-antlia-blue/50 focus:border-antlia-blue"
                            placeholder={t("form.phonePlaceholder")}
                          />
                        </div>
                        <div>
                          <label htmlFor="company" className="block text-gray-700 font-medium mb-1">{t("form.companyLabel")}</label>
                          <input 
                            type="text" 
                            id="company" 
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-antlia-blue/50 focus:border-antlia-blue"
                            placeholder={t("form.companyPlaceholder")}
                          />
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <label htmlFor="subject" className="block text-gray-700 font-medium mb-1">{t("form.subjectLabel")}</label>
                        <select 
                          id="subject" 
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-antlia-blue/50 focus:border-antlia-blue"
                        >
                          <option value="">{t("form.subjectPlaceholder")}</option>
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
                        <label htmlFor="message" className="block text-gray-700 font-medium mb-1">{t("form.messageLabel")}</label>
                        <textarea 
                          id="message" 
                          name="message"
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          required
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-antlia-blue/50 focus:border-antlia-blue"
                          placeholder={t("form.messagePlaceholder")}
                        ></textarea>
                      </div>
                      
                      <div>
                        <Button type="submit" className="bg-antlia-blue hover:bg-antlia-blue/80 w-full md:w-auto">
                          {t("form.submitButton")}
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
            <span className="subtitle block mb-2">{t("map.subtitle")}</span>
            <h2 className="text-xl font-bold mb-4">{t("map.title")}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t("map.description")}
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
              title={t("map.iframeTitle")}
            ></iframe>
          </div>
        </div>
      </section>  
    </>
  );
};

export default ContactPage;
