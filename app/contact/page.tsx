"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";
import { Header } from "@/components/homepage/Header";
import { Footer } from "@/components/homepage/Footer";
import { SectionHeader } from "@/components/homepage/SectionHeader";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Phone, MessageSquare, AlertCircle } from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    enquiry: "",
    honorific: "",
    fullName: "",
    email: "",
    contact: "",
    message: "",
    pdpa: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const newErrors: Record<string, string> = {};
    
    if (!formData.enquiry) newErrors.enquiry = "Please select type of enquiry";
    if (!formData.honorific) newErrors.honorific = "Please select how we address you";
    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.contact) newErrors.contact = "Contact number is required";
    if (!formData.message) newErrors.message = "Message is required";
    if (!formData.pdpa) newErrors.pdpa = "You must consent to the data protection policy";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Submit form
      console.log("Form submitted:", formData);
      alert("Thank you for contacting us! We will get back to you soon.");
    }
  };

  return (
    <Container>
      <Header />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-4xl">
            <div className="mb-6">
              <span className="inline-block bg-primary text-white text-sm px-4 py-2 rounded-full">
                Get In Touch
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Contact Us
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              Get in touch with MDEC. We're here to help with your enquiries about our programmes, services, and initiatives.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-2/3 h-full bg-gradient-to-l from-primary/40 to-transparent" />
      </div>

      {/* Main Content */}
      <main className="-mt-10 md:-mt-8 rounded-t-[30px] relative z-10 bg-zinc-100">
        <div className="container mx-auto px-4 py-16 max-w-7xl">
        
        {/* Get In Touch Form Section */}
        <div className="mb-20">
          <SectionHeader
            badge="Contact Form"
            title="Get In Touch"
            description="Fill out the form below and we'll get back to you as soon as possible"
          />

          <Card className="p-8 md:p-12 bg-gray-50 border-gray-200">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Type of Enquiry */}
                <div className="space-y-2">
                  <Label htmlFor="enquiry">
                    Type of Enquiry <span className="text-red-600">*</span>
                  </Label>
                  <Select
                    value={formData.enquiry}
                    onValueChange={(value) =>
                      setFormData({ ...formData, enquiry: value })
                    }
                  >
                    <SelectTrigger className="w-full bg-white">
                      <SelectValue placeholder="Select enquiry type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="grants">Grants</SelectItem>
                      <SelectItem value="ecommerce">E-Commerce</SelectItem>
                      <SelectItem value="fkw">Foreign Knowledge Workers</SelectItem>
                      <SelectItem value="gig">
                        Gig, Freelance and Sharing Economy
                      </SelectItem>
                      <SelectItem value="digital-entrepreneurship">
                        Digital-Based Entrepreneurship
                      </SelectItem>
                      <SelectItem value="digital-skills">
                        Digital Skill/Talent Development
                      </SelectItem>
                      <SelectItem value="investments">Investments</SelectItem>
                      <SelectItem value="digital-transformation">
                        Business Digital Transformation
                      </SelectItem>
                      <SelectItem value="others">Others</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.enquiry && (
                    <p className="text-sm text-red-600">{errors.enquiry}</p>
                  )}
                </div>

                {/* Honorific */}
                <div className="space-y-2">
                  <Label htmlFor="honorific">
                    How do we address you? <span className="text-red-600">*</span>
                  </Label>
                  <Select
                    value={formData.honorific}
                    onValueChange={(value) =>
                      setFormData({ ...formData, honorific: value })
                    }
                  >
                    <SelectTrigger className="w-full bg-white">
                      <SelectValue placeholder="Select title" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dr">Dr.</SelectItem>
                      <SelectItem value="mr">Mr.</SelectItem>
                      <SelectItem value="mrs">Mrs.</SelectItem>
                      <SelectItem value="miss">Miss</SelectItem>
                      <SelectItem value="ms">Ms.</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.honorific && (
                    <p className="text-sm text-red-600">{errors.honorific}</p>
                  )}
                </div>

                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="fullName">
                    Full Name <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="bg-white"
                  />
                  {errors.fullName && (
                    <p className="text-sm text-red-600">{errors.fullName}</p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="bg-white"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                {/* Contact Number */}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="contact">
                    Contact Number <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="contact"
                    type="tel"
                    placeholder="+60 12-345 6789"
                    value={formData.contact}
                    onChange={(e) =>
                      setFormData({ ...formData, contact: e.target.value })
                    }
                    className="bg-white"
                  />
                  {errors.contact && (
                    <p className="text-sm text-red-600">{errors.contact}</p>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="message">
                    Message <span className="text-red-600">*</span>
                  </Label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Enter your message here..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full min-w-0 rounded-md border border-input bg-white px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  />
                  {errors.message && (
                    <p className="text-sm text-red-600">{errors.message}</p>
                  )}
                </div>

                {/* PDPA Consent */}
                <div className="md:col-span-2 space-y-2">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="pdpa"
                      checked={formData.pdpa}
                      onChange={(e) =>
                        setFormData({ ...formData, pdpa: e.target.checked })
                      }
                      className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <Label htmlFor="pdpa" className="text-sm cursor-pointer">
                      I hereby grant consent to Malaysia Digital Economy Corporation
                      Sdn. Bhd. (MDEC) to process the personal data provided in this
                      Contact Us Form or to be provided in relation to this Contact Us
                      Form, for the purpose of my enquiries related to MDEC's
                      initiatives / programmes / services and in the manner set out in{" "}
                      <a
                        href="/footer-pages/personal-data-protection"
                        target="_blank"
                        className="text-primary underline font-semibold hover:text-red-700"
                      >
                        MDEC's Personal Data Protection Statement
                      </a>
                      . I have read and understood the aforesaid MDEC's Personal Data
                      Protection Statement and agreed to the processing of such
                      personal data by MDEC in the manner set out therein.
                      <span className="text-red-600 ml-1">*</span>
                    </Label>
                  </div>
                  {errors.pdpa && (
                    <p className="text-sm text-red-600">{errors.pdpa}</p>
                  )}
                </div>
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full md:w-auto px-12 bg-primary hover:bg-red-700 text-white font-bold uppercase"
                >
                  Submit
                </Button>
              </div>
            </form>
          </Card>

          {/* Whistleblowing Notice */}
          <div className="mt-6 flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-gray-700">
              For any whistleblowing on misconduct/wrongdoing involving MDEC, please
              send an email to a dedicated whistleblowing email at{" "}
              <a
                href="mailto:mdec_wb@mdec.com.my"
                className="font-bold text-primary hover:underline"
              >
                mdec_wb@mdec.com.my
              </a>
            </p>
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="mb-20">
          <SectionHeader
            badge="Contact Information"
            title="Other Ways to Reach Us"
            description="Find the best way to get in touch with our team"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Address */}
            <Card className="p-8 bg-white border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-primary/10 rounded-full">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Our Location</h3>
                <div className="text-gray-600 leading-relaxed">
                  <p className="font-semibold">
                    Malaysia Digital Economy Corporation
                  </p>
                  <p>(MDEC) Sdn. Bhd.</p>
                  <p className="mt-2">2360 Persiaran APEC</p>
                  <p>63000 Cyberjaya</p>
                  <p>Selangor Darul Ehsan</p>
                </div>
              </div>
            </Card>

            {/* Phone */}
            <Card className="p-8 bg-white border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-primary/10 rounded-full">
                  <Phone className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Call Us</h3>
                <div className="text-gray-600 leading-relaxed space-y-2">
                  <div>
                    <p className="font-semibold">Within Malaysia</p>
                    <a
                      href="tel:1-800-88-8338"
                      className="text-primary hover:underline"
                    >
                      1-800-88-8338
                    </a>
                  </div>
                  <div>
                    <p className="font-semibold">International</p>
                    <a
                      href="tel:+603-8315-3000"
                      className="text-primary hover:underline"
                    >
                      +603-8315-3000
                    </a>
                  </div>
                  <div>
                    <p className="font-semibold">Fax</p>
                    <p>+603-8315-3115</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* SMS & Email */}
            <Card className="p-8 bg-white border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-primary/10 rounded-full">
                  <MessageSquare className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  SMS & Email
                </h3>
                <div className="text-gray-600 leading-relaxed">
                  <p className="mb-2">Type:</p>
                  <p className="font-mono text-sm bg-gray-50 p-2 rounded">
                    MDEC ASK [your email address] [your enquiries]
                  </p>
                  <p className="my-2">and send to:</p>
                  <a
                    href="sms:15888"
                    className="text-primary font-bold hover:underline"
                  >
                    15888
                  </a>
                  <p className="my-2">or email to:</p>
                  <a
                    href="mailto:clic@mdec.com.my"
                    className="text-primary font-bold hover:underline"
                  >
                    clic@mdec.com.my
                  </a>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <div className="mb-20">
          <SectionHeader
            badge="Location"
            title="Find Us on the Map"
            description="Visit us at our headquarters in Cyberjaya"
          />

          <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.6295543540245!2d101.657539228628!3d2.922403574717638!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cdb6f8e79c638b%3A0x6e49a3b985e0a59f!2sMalaysia%20Digital%20Economy%20Corporation%20(MDEC)!5e0!3m2!1sen!2smy!4v1646729892630!5m2!1sen!2smy"
              width="100%"
              height="500"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            />
          </div>
        </div>
        </div>
      </main>

      <Footer />
    </Container>
  );
};

export default ContactPage;

