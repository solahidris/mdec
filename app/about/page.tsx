"use client";

import { Container } from "@/components/ui/container";
import { Header } from "@/components/homepage/Header";
import { Footer } from "@/components/homepage/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const AboutPage = () => {
  return (
    <Container>
      <Header />

      {/* Hero Banner */}
      <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Badge className="mb-6 bg-primary text-white border-0 text-sm px-4 py-2">
                Malaysia Digital Economy Corporation
              </Badge>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
            >
              About MDEC
            </motion.h1>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute bottom-0 right-0 w-2/3 h-full bg-gradient-to-l from-primary/40 to-transparent"
        />
      </div>

      {/* Main Content */}
      <main className="-mt-10 md:-mt-8 rounded-t-[30px] relative z-10 bg-zinc-100">

        {/* Leading Digital Economy Section */}
        <section className="container mx-auto px-4 py-10 md:py-16 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-primary text-xl md:text-2xl text-center font-semibold mb-8 uppercase pt-16">
              LEADING MALAYSIA&apos;S DIGITAL ECONOMY
            </h2>
            <div className="text-black text-base leading-relaxed space-y-4">
              <p>
                Malaysia Digital Economy Corporation (MDEC), a government agency under the purview 
                of the Ministry of Digital, was established in 1996 to lead Malaysia&apos;s digital 
                economy. Beginning with the implementation of the MSC Malaysia initiative, we have 
                since then catalysed digital transformation and growth all over the nation. By 
                offering greater incentives and governance for growth and re-investment, we aspire 
                to bolster Malaysia&apos;s status as the digital hub of ASEAN, opening new doors and 
                driving shared prosperity for all Malaysians.
              </p>
              <p>
                Discover how MDEC is empowering the nation by upskilling Malaysians to be digitally 
                savvy, providing digitalisation support to businesses, supporting tech companies in 
                expanding internationally and driving investment in the digital economy.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Video Section */}
        <section className="container mx-auto px-4 py-10 md:py-16 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative aspect-video rounded-[36px] overflow-hidden shadow-lg">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/hyCb-yfHeW8?autoplay=1&mute=1"
                title="MDEC Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              ></iframe>
            </div>
          </motion.div>
        </section>

        {/* Mission & Vision Section */}
        <section className="container mx-auto px-4 py-10 md:py-16 max-w-5xl">
          <div className="bg-white shadow-md rounded-tr-[100px] rounded-bl-[100px] py-12 md:py-16 px-8 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-lg text-primary uppercase mb-3 font-semibold">
                Aim and Purpose
              </h3>
              <h2 className="text-3xl md:text-4xl font-light text-black uppercase mb-10">
                Our Mission & Vision
              </h2>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <p className="text-base md:text-lg leading-relaxed">
                    <span className="text-primary font-semibold">Our vision </span>
                    <span className="text-black">
                      is for Malaysia to be the preferred hub for world-class digital businesses 
                      and talents.
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-base md:text-lg leading-relaxed">
                    <span className="text-primary font-semibold">Our mission </span>
                    <span className="text-black">
                      is to drive the digital economy through catalytic high-impact initiatives, 
                      strategic and sustainable investments, and inclusive policies.
                    </span>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Malaysia Digital Section */}
        <section className="container mx-auto px-4 py-10 md:py-16 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-8 mb-12">
            <div className="flex items-center justify-center md:col-span-2">
              <div className="relative w-48 h-32 md:w-56 md:h-36">
                <img 
                  src="https://mdec.my/static/images/malaysiadigital/md-logo.png" 
                  alt="Malaysia Digital Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <div className="md:col-span-4">
              <p className="mb-2 text-lg uppercase text-primary font-semibold">
                LET&apos;S LEARN ABOUT
              </p>
              <p className="mb-4 text-3xl md:text-4xl font-light uppercase">
                Malaysia Digital
              </p>
              <p className="py-2 text-base md:text-lg leading-relaxed">
                Malaysia Digital is a national strategic initiative by the Malaysian Government 
                to encourage and attract companies, talents and investment while enabling Malaysian 
                businesses and Citizens to play a leading part in the global digital revolution 
                and digital economy.
              </p>
              <a className="text-sm font-bold uppercase cursor-pointer text-[#d90b2f] hover:text-[#b00e15] inline-block mt-2">
                + Learn More
              </a>
            </div>
          </div>
        </section>

        {/* Brand Book Section */}
        <section className="container mx-auto px-4 py-10 md:py-16 max-w-5xl">
          <div className="flex flex-col-reverse md:flex-row rounded-3xl bg-white shadow-md relative overflow-hidden">
            <div className="px-8 py-8 md:py-12 lg:w-1/2">
              <h4 className="uppercase text-primary text-base lg:text-lg font-semibold mb-2">
                Download Our
              </h4>
              <h3 className="uppercase text-[#212121] text-3xl lg:text-4xl font-light mb-6">
                Brand Book
              </h3>
              <p className="text-base leading-relaxed mb-8">
                Download our brand guideline that covers MDEC&apos;s visual identity, dos and don&apos;ts 
                and best practices for our brand. For the usage of our brand assets, kindly 
                request the permission to{" "}
                <a href="mailto:clic@mdec.com.my" className="text-blue-600 hover:underline">
                  clic@mdec.com.my
                </a>
              </p>
              <Button
                className="cursor-pointer bg-primary hover:bg-primary/90 text-white font-bold px-6 py-3 rounded-full uppercase text-sm"
              >
                Download Our Brand Book
              </Button>
            </div>
            <div className="lg:w-1/2 flex items-center justify-center p-8 md:p-0">
              <div className="relative w-full max-w-md">
                <img 
                  src="https://mdec.my/static/images/about-mdec/brand-guide-book-cover-landscape-copy@3x.webp" 
                  alt="MDEC Brand Book" 
                  className="w-full h-auto object-contain md:absolute md:-right-14 md:-top-10"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Anti-Corruption Section */}
        <section className="bg-[#d90b2f] my-10 md:my-16">
          <div className="container mx-auto px-4 py-12 md:py-16 max-w-5xl">
            <div className="flex flex-col-reverse sm:flex-row gap-8 items-center">
              <div className="sm:w-1/2 flex justify-center">
                <div className="relative w-full max-w-xs">
                  <img 
                    src="https://mdec.my/static/images/about-mdec/book-anti-corrupt.webp" 
                    alt="MDEC Anti-Corruption Plan Book" 
                    className="w-full h-auto object-contain"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#d90b2f] to-transparent pointer-events-none" />
                </div>
              </div>
              <div className="sm:w-1/2 text-white">
                <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-4">
                  Our Commitment to a Transparent Digital Future
                </h2>
                <p className="text-base md:text-lg mb-6">
                  MDEC Organisation Anti-Corruption Plan (OACP) 2023-2027.
                </p>
                <Button
                  variant="outline"
                  className="cursor-pointer bg-white text-black border-none hover:bg-white/90 font-bold px-6 py-3 rounded-full uppercase text-sm"
                >
                  Click HERE to view
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Career Section */}
        <section className="mx-auto px-4 py-12 md:py-16 max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-light text-black uppercase mb-4">
              Come Work With Us
            </h2>
            <p className="text-base md:text-lg text-black mb-8 max-w-2xl mx-auto">
              Come and be part of the team. Together, we can shape Malaysia&apos;s digital future.
            </p>
            <Button
              size="lg"
              className="cursor-pointer bg-primary hover:bg-primary/90 text-white font-bold px-8 py-3 rounded-full uppercase text-sm"
            >
              Join Us
            </Button>
          </motion.div>
        </section>
      </main>

      <Footer />
    </Container>
  );
};

export default AboutPage;

