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
  Play,
  Pause,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

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

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const phoneVariants = {
  hidden: { opacity: 0, scale: 0.8, rotateY: -15 },
  visible: {
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

const featureCardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
  hover: {
    y: -8,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

export default function ContentSection() {
  const [currentImage, setCurrentImage] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false); // Set to false by default
  const [isHovered, setIsHovered] = useState(false);

  const nextImage = useCallback(() => {
    setCurrentImage((prev) => (prev + 1) % mobileImages.length);
  }, []);

  const prevImage = () => {
    setCurrentImage(
      (prev) => (prev - 1 + mobileImages.length) % mobileImages.length
    );
  };

  const goToImage = (index: number) => {
    setCurrentImage(index);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || isHovered) return;

    const interval = setInterval(() => {
      nextImage();
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isHovered, nextImage]);

  // Touch/swipe handlers
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

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
      nextImage();
    } else if (isRightSwipe) {
      prevImage();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <motion.section
      id="mobile-app"
      className="py-16 md:py-32 bg-gradient-to-b from-black via-gray-900 to-slate-900 relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10" />

      {/* Animated background elements */}
      <motion.div
        className="absolute top-20 left-20 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="mx-auto max-w-6xl space-y-16 px-6 relative z-10">
        {/* Section Header */}
        <motion.div className="text-center space-y-6" variants={itemVariants}>
          <motion.h2
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Smart Tourist Safety Mobile App
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Experience next-generation tourist safety with our AI-powered mobile
            application. From blockchain-secured identity to real-time emergency
            response, we've got you covered.
          </motion.p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Mobile App Carousel */}
          <motion.div
            className="relative order-2 lg:order-1"
            variants={phoneVariants}
            whileHover="hover"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            <div className="relative mx-auto max-w-sm">
              {/* Phone Frame with enhanced styling */}
              <motion.div
                className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-[3rem] p-2 shadow-2xl shadow-black/50 border border-gray-700/50 backdrop-blur-sm"
                whileHover={{
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8)",
                  borderColor: "rgba(59, 130, 246, 0.3)",
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-black rounded-[2.5rem] overflow-hidden relative aspect-[9/19.5] border-2 border-gray-800/50">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-10 border-x border-gray-700"></div>

                  {/* Image Container */}
                  <div
                    className="relative w-full h-full overflow-hidden group"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                  >
                    <AnimatePresence mode="wait">
                      {mobileImages.map(
                        (image, index) =>
                          index === currentImage && (
                            <motion.div
                              key={index}
                              className="absolute inset-0"
                              initial={{ opacity: 0, scale: 1.1 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.9 }}
                              transition={{ duration: 0.5, ease: "easeInOut" }}
                            >
                              <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                className="object-cover"
                              />
                              {/* Enhanced overlay with app info */}
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.3 }}
                              />
                              <motion.div
                                className="absolute bottom-4 left-4 right-4 text-white"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.4 }}
                              >
                                <h3 className="font-semibold text-sm mb-1">
                                  {image.title}
                                </h3>
                                <p className="text-xs text-gray-300">
                                  {image.description}
                                </p>
                              </motion.div>
                            </motion.div>
                          )
                      )}
                    </AnimatePresence>

                    {/* Auto-play Control */}
                    <motion.div
                      className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-2 rounded-full flex items-center gap-2 text-sm border border-gray-600/50 opacity-0 group-hover:opacity-100"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
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
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Enhanced Navigation Buttons */}
              <motion.button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-sm border border-gray-600/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 hover:border-blue-500/50 transition-all opacity-0 group-hover:opacity-100"
                aria-label="Previous image"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronLeft className="h-5 w-5" />
              </motion.button>

              <motion.button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-sm border border-gray-600/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 hover:border-blue-500/50 transition-all opacity-0 group-hover:opacity-100"
                aria-label="Next image"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronRight className="h-5 w-5" />
              </motion.button>

              {/* Enhanced Dots Indicator */}
              <motion.div
                className="flex justify-center mt-6 space-x-2"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {mobileImages.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImage
                        ? "bg-blue-500 w-8"
                        : "bg-gray-600 hover:bg-gray-500"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            className="space-y-8 order-1 lg:order-2"
            variants={itemVariants}
          >
            <motion.div className="space-y-6" variants={itemVariants}>
              <motion.h3
                className="text-3xl md:text-4xl font-bold text-white"
                variants={itemVariants}
              >
                Revolutionary Safety Features
              </motion.h3>
              <motion.p
                className="text-lg text-gray-300 leading-relaxed"
                variants={itemVariants}
              >
                Our mobile application combines cutting-edge technology with
                user-friendly design to provide comprehensive safety coverage
                for tourists exploring India. From the moment you arrive until
                your safe departure, we ensure your journey is protected.
              </motion.p>
            </motion.div>

            {/* Enhanced Key Stats */}
            <motion.div
              className="grid grid-cols-2 gap-6"
              variants={containerVariants}
            >
              <motion.div
                className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 backdrop-blur-sm border border-blue-500/30 rounded-xl p-4 hover:border-blue-500/50 transition-all duration-300"
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(59, 130, 246, 0.1)",
                }}
              >
                <div className="text-2xl font-bold text-blue-400">24/7</div>
                <div className="text-sm text-gray-300">Monitoring</div>
              </motion.div>
              <motion.div
                className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 backdrop-blur-sm border border-purple-500/30 rounded-xl p-4 hover:border-purple-500/50 transition-all duration-300"
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(147, 51, 234, 0.1)",
                }}
              >
                <div className="text-2xl font-bold text-purple-400">30s</div>
                <div className="text-sm text-gray-300">Response Time</div>
              </motion.div>
            </motion.div>

            {/* Enhanced CTA */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              variants={itemVariants}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 border-0 shadow-lg shadow-blue-500/25 px-8 py-6 text-base font-semibold transition-all duration-300">
                  Download App
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced Features Grid */}
        <motion.div className="mt-20" variants={containerVariants}>
          <motion.h3
            className="text-3xl font-bold text-center text-white mb-12"
            variants={itemVariants}
          >
            Comprehensive Safety Technology
          </motion.h3>
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-gray-600/50 transition-all duration-300 group cursor-pointer"
                  variants={featureCardVariants}
                  whileHover="hover"
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className="w-12 h-12 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                    whileHover={{
                      backgroundColor: "rgba(59, 130, 246, 0.3)",
                      scale: 1.1,
                    }}
                  >
                    <Icon className="h-6 w-6 text-blue-400" />
                  </motion.div>
                  <h4 className="text-xl font-semibold text-white mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
