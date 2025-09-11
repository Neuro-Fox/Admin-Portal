"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Play, Pause, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const HeroSection = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoLoad = () => {
    setIsLoaded(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);

      video.addEventListener("play", handlePlay);
      video.addEventListener("pause", handlePause);

      return () => {
        video.removeEventListener("play", handlePlay);
        video.removeEventListener("pause", handlePause);
      };
    }
  }, []);

  return (
    <section className="pt-32 pb-20 relative overflow-hidden bg-gradient-to-b from-black via-gray-900 to-slate-900">
      {/* Background Pattern */}
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

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Badge className="mb-6 bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-300 border-blue-500/30 backdrop-blur-sm">
                Next Generation Tourist Safety Technology
              </Badge>
            </motion.div>

            <motion.h1
              className="text-5xl lg:text-7xl font-bold mb-6 tracking-tighter text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Smart Tourist Safety —{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
                Intelligent, Secure
              </span>{" "}
              Protection
            </motion.h1>

            <motion.p
              className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Experience next-generation tourist safety with our AI-powered
              platform. Blockchain-secured identity, real-time monitoring, and
              instant emergency response for complete travel protection.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium text-lg px-8 py-6 shadow-lg shadow-blue-500/25 border-0"
                >
                  Get Started
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              ></motion.div>
            </motion.div>
          </motion.div>

          {/* Video Container */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="relative"
          >
            <div className="relative mx-auto max-w-4xl">
              {/* Video Frame with enhanced styling */}
              <motion.div
                className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-4 shadow-2xl shadow-black/50 border border-gray-700/50 backdrop-blur-sm"
                whileHover={{
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8)",
                  borderColor: "rgba(59, 130, 246, 0.3)",
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-black rounded-xl overflow-hidden relative aspect-video border-2 border-gray-800/50">
                  {/* Video Element */}
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    muted
                    loop
                    playsInline
                    onLoadedData={handleVideoLoad}
                    poster="/video/thumbnail.jpg" // Optional: Add a poster image
                  >
                    <source src="/video/video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  {/* Video Loading Overlay */}
                  {!isLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full"
                      />
                    </div>
                  )}

                  {/* Video Controls Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center group"
                    whileHover={{ opacity: 1 }}
                  >
                    <motion.button
                      onClick={togglePlay}
                      className="w-16 h-16 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-all"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                    </motion.button>
                  </motion.div>

                  {/* Video Status Indicator */}
                  <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm flex items-center gap-2 border border-gray-600/50">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        isPlaying ? "bg-green-500" : "bg-red-500"
                      }`}
                    />
                    <span>{isPlaying ? "Live" : "Paused"}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Platform Availability */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-gray-400"
          >
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-blue-400" />
              <span>Mobile App Available</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-blue-400" />
              <span>Web Dashboard</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-blue-400" />
              <span>24/7 Monitoring</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-blue-400" />
              <span>Instant SOS Response</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
