"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  MapPin,
  AlertTriangle,
  CreditCard,
  BarChart3,
} from "lucide-react";

interface SlideData {
  title: string;
  description: string;
  image: string;
}

const PoliceDashboardSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);

  const slideData: SlideData[] = [
    {
      title: "Blockchain-Enabled Dashboard",
      description:
        "The Blockchain Enabled Dashboard empowers tourism authorities with tamper-proof tourist identity verification, secure data management, and transparent monitoring.",
      image: "/Dashboard/img1.png",
    },
    {
      title: "Dashboard Overview & Incident Logs",
      description:
        "Provides a real-time snapshot of tourist monitoring, including the number of active alerts, pending SOS calls, and resolved cases, along with the latest activity updates",
      image: "/Dashboard/img2.jpg",
    },
    {
      title: "Tourist Cluster Map",
      description:
        "Enables authorities to search tourist details using Digital ID, with access to personal information, travel itineraries, accommodations, and complete movement history.",
      image: "/Dashboard/img3.jpg",
    },
    {
      title: "Reports & Incidents",
      description:
        "Displays detailed incident logs such as restricted area alerts, path deviations, SOS emergencies, and resolution statuses for quick authority action",
      image: "/Dashboard/img4.jpg",
    },
    {
      title: "Tourist Enquiry",
      description:
        "Enables authorities to search tourist details using Digital ID, with access to personal information, travel itineraries, accommodations, and complete movement history",
      image: "/Dashboard/img5.jpg",
    },
    {
      title: "Broadcast Alerts",
      description:
        "The Broadcast Alerts dashboard enables authorities to instantly send safety notifications, travel advisories, and emergency warnings to tourists in specific regions or clusters.",
      image: "/Dashboard/img6.jpg",
    },
    {
      title: "Settings & Configurations",
      description:
        "Offers configuration options for map display, alert management, and notification preferences, allowing authorities to customize monitoring and emergency response settings.",
      image: "/Dashboard/img7.jpg",
    },
  ];

  const features = [
    {
      icon: MapPin,
      title: "Live Tourist Tracking & Geo-fencing",
      description:
        "Real-time location monitoring with virtual boundaries and instant alerts for enhanced tourist safety.",
    },
    {
      icon: AlertTriangle,
      title: "Anomaly & SOS Alerts",
      description:
        "Advanced AI-powered detection system for emergency situations with immediate response protocols.",
    },
    {
      icon: CreditCard,
      title: "Tourist Digital ID & Travel History",
      description:
        "Comprehensive digital identity verification system with complete travel and accommodation records.",
    },
    {
      icon: BarChart3,
      title: "Incident Reports & Resolution Tracking",
      description:
        "Detailed analytics and tracking system for all incidents with resolution status monitoring.",
    },
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slideData.length);
  }, [slideData.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slideData.length) % slideData.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  // Touch/swipe handlers
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  return (
    <section className="py-16 md:py-32 bg-gradient-to-b from-black via-gray-900 to-slate-900 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10" />

      <div className="mx-auto max-w-7xl space-y-16 px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-6">
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
            Smart Dashboard for Authorities
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Our intelligent laptop dashboard equips tourism authorities with
            advanced monitoring and decision-making tools. From real-time alerts
            and tourist identity verification to incident tracking and emergency
            management, the dashboard ensures complete safety oversight.
          </p>
        </div>

        {/* Main Dashboard Display */}
        <div className="space-y-12">
          {/* Big Screen in Center */}
          <div className="relative mx-auto max-w-5xl">
            {/* Laptop Frame */}
            <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-t-3xl p-4 shadow-2xl shadow-black/50 border border-gray-700">
              {/* Screen */}
              <div className="bg-black rounded-2xl overflow-hidden relative aspect-[16/10] border-2 border-gray-800">
                {/* Screen Content */}
                <div
                  className="relative w-full h-full overflow-hidden group"
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  {/* Dashboard Images */}
                  <div
                    className="flex transition-transform duration-700 ease-out h-full"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  >
                    {slideData.map((slide, index) => (
                      <div key={index} className="min-w-full h-full relative">
                        <Image
                          src={slide.image}
                          alt={slide.title}
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 100vw, 80vw"
                          priority={index === 0}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Navigation Arrows */}
                  <button
                    onClick={prevSlide}
                    className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm border border-gray-600 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  <button
                    onClick={nextSlide}
                    className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm border border-gray-600 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>

                  {/* Auto-play Control */}
                  <div className="absolute top-6 right-6 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm border border-gray-600">
                    <button
                      onClick={toggleAutoPlay}
                      className="hover:text-blue-400 transition-colors"
                      aria-label={
                        isAutoPlaying ? "Pause autoplay" : "Start autoplay"
                      }
                    >
                      {isAutoPlaying ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                    </button>
                    <span>{isAutoPlaying ? "Auto" : "Manual"}</span>
                  </div>
                </div>
              </div>

              {/* Laptop Base */}
              <div className="h-6 bg-gradient-to-b from-gray-800 to-gray-900 rounded-b-3xl relative">
                <div className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-transparent via-gray-700 to-transparent rounded-b-3xl"></div>
              </div>
            </div>

            {/* Indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {slideData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentSlide
                      ? "bg-blue-500 w-8"
                      : "bg-gray-600 hover:bg-gray-500"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Description Below Screen */}
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold text-white transition-all duration-500">
              {slideData[currentSlide].title}
            </h3>
            <p className="text-lg text-gray-300 leading-relaxed transition-all duration-500">
              {slideData[currentSlide].description}
            </p>

            {/* Key Stats */}
            <div className="grid grid-cols-2 gap-6 max-w-md mx-auto mt-8">
              <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 backdrop-blur-sm border border-blue-500/30 rounded-xl p-4">
                <div className="text-2xl font-bold text-blue-400">24/7</div>
                <div className="text-sm text-gray-300">Monitoring</div>
              </div>
              <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 backdrop-blur-sm border border-purple-500/30 rounded-xl p-4">
                <div className="text-2xl font-bold text-purple-400">30s</div>
                <div className="text-sm text-gray-300">Response Time</div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-center text-white mb-12">
            Advanced Authority Tools
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                  <h4 className="text-lg font-semibold text-white mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-gray-400 leading-relaxed text-sm">
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
};

export default PoliceDashboardSection;
