"use client";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Smartphone,
  Shield,
  MapPin,
  AlertTriangle,
  Users,
  Zap,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const mobileImages = [
  {
    src: "/img1.jpg",
    alt: "Tourist Registration & Digital ID",
    title: "Secure Registration",
    description: "Blockchain-secured digital tourist ID with KYC verification",
  },
  {
    src: "/img2.jpg",
    alt: "Real-time Location Tracking",
    title: "Live Tracking",
    description: "GPS monitoring with geo-fencing and safe zone alerts",
  },
  {
    src: "/img3.jpg",
    alt: "Emergency SOS Features",
    title: "Emergency Response",
    description: "One-tap SOS with instant location sharing to authorities",
  },
];

const features = [
  {
    icon: Shield,
    title: "Blockchain Security",
    description:
      "Tamper-proof digital identity using Ethereum smart contracts ensures your data integrity and privacy.",
  },
  {
    icon: MapPin,
    title: "Geo-fencing Protection",
    description:
      "Virtual boundaries around safe zones with instant alerts when entering high-risk areas.",
  },
  {
    icon: AlertTriangle,
    title: "AI Anomaly Detection",
    description:
      "Machine learning algorithms detect unusual patterns and potential safety threats in real-time.",
  },
  {
    icon: Users,
    title: "Multi-language Support",
    description:
      "Available in 10+ Indian languages with voice and text SOS options for accessibility.",
  },
  {
    icon: Zap,
    title: "Instant Response",
    description:
      "Emergency alerts reach nearest patrol units and contacts within seconds of activation.",
  },
  {
    icon: Smartphone,
    title: "IoT Integration",
    description:
      "Optional smart wearables for remote areas with health monitoring and GPS tracking.",
  },
];

export default function ContentSection() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % mobileImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % mobileImages.length);
  };

  const prevImage = () => {
    setCurrentImage(
      (prev) => (prev - 1 + mobileImages.length) % mobileImages.length
    );
  };

  return (
    <section
      id="mobile-app"
      className="py-16 md:py-32 bg-gradient-to-b from-black via-gray-900 to-slate-900 relative"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10" />

      <div className="mx-auto max-w-6xl space-y-16 px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-6">
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
            Smart Tourist Safety Mobile App
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Experience next-generation tourist safety with our AI-powered mobile
            application. From blockchain-secured identity to real-time emergency
            response, we've got you covered.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Mobile App Carousel */}
          <div className="relative order-2 lg:order-1">
            <div className="relative mx-auto max-w-sm">
              {/* Phone Frame */}
              <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-[3rem] p-2 shadow-2xl shadow-black/50 border border-gray-700">
                <div className="bg-black rounded-[2.5rem] overflow-hidden relative aspect-[9/19.5]">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-10"></div>

                  {/* Image Container */}
                  <div className="relative w-full h-full overflow-hidden">
                    {mobileImages.map((image, index) => (
                      <div
                        key={index}
                        className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
                          index === currentImage
                            ? "translate-x-0"
                            : index < currentImage
                            ? "-translate-x-full"
                            : "translate-x-full"
                        }`}
                      >
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className="object-cover"
                        />
                        {/* Overlay with app info */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4 text-white">
                          <h3 className="font-semibold text-sm mb-1">
                            {image.title}
                          </h3>
                          <p className="text-xs text-gray-300">
                            {image.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-sm border border-gray-600 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-sm border border-gray-600 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              {/* Dots Indicator */}
              <div className="flex justify-center mt-6 space-x-2">
                {mobileImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImage
                        ? "bg-blue-500 w-8"
                        : "bg-gray-600 hover:bg-gray-500"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8 order-1 lg:order-2">
            <div className="space-y-6">
              <h3 className="text-3xl md:text-4xl font-bold text-white">
                Revolutionary Safety Features
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                Our mobile application combines cutting-edge technology with
                user-friendly design to provide comprehensive safety coverage
                for tourists exploring India. From the moment you arrive until
                your safe departure, we ensure your journey is protected.
              </p>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 backdrop-blur-sm border border-blue-500/30 rounded-xl p-4">
                <div className="text-2xl font-bold text-blue-400">24/7</div>
                <div className="text-sm text-gray-300">Monitoring</div>
              </div>
              <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 backdrop-blur-sm border border-purple-500/30 rounded-xl p-4">
                <div className="text-2xl font-bold text-purple-400">
                  &lt;30s
                </div>
                <div className="text-sm text-gray-300">Response Time</div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 border-0 shadow-lg shadow-blue-500/25 px-8 py-6 text-base font-semibold">
                Download App
              </Button>
              <Button
                variant="outline"
                className="border-gray-600 text-gray-300 hover:text-white hover:bg-white/10 hover:border-gray-400 px-8 py-6 text-base"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-center text-white mb-12">
            Comprehensive Safety Technology
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-gray-600/50 transition-all duration-300 group hover:shadow-lg hover:shadow-black/25"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="h-6 w-6 text-blue-400" />
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
