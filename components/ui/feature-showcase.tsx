// File location: components/ui/feature-showcase.tsx

"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";

type Feature = {
  title: string;
  description: string;
  name: string;
  designation: string;
  location: string;
  src: string;
};

export const FeatureShowcase = ({
  features,
  autoplay = true,
  title = "Our Team",
  subtitle = "Meet the talented individuals behind our success",
}: {
  features: Feature[];
  autoplay?: boolean;
  title?: string;
  subtitle?: string;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % features.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + features.length) % features.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 6000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-20 font-sans antialiased">
      <div className="mb-16 text-center">
        <h2 className="text-4xl font-bold text-black dark:text-white mb-4">
          {title}
        </h2>
        <p className="text-lg text-gray-600 dark:text-neutral-400 max-w-2xl mx-auto">
          {subtitle}
        </p>
      </div>

      <div className="relative grid grid-cols-1 gap-20 lg:grid-cols-2 items-center">
        {/* Image Section */}
        <div className="order-2 lg:order-1">
          <div className="relative h-96 w-full">
            <AnimatePresence mode="wait">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.src}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index) ? 40 : features.length + 2 - index,
                    y: isActive(index) ? [0, -20, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY(),
                  }}
                  transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  <img
                    src={feature.src}
                    alt={feature.name}
                    width={500}
                    height={500}
                    draggable={false}
                    className="h-full w-full rounded-2xl object-cover object-center shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="font-semibold text-sm">{feature.name}</p>
                    <p className="text-xs opacity-90">{feature.designation}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" />
                      <p className="text-xs opacity-75">{feature.location}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Content Section */}
        <div className="order-1 lg:order-2 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{
                y: 20,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              exit={{
                y: -20,
                opacity: 0,
              }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className="space-y-6"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                  Member {active + 1} of {features.length}
                </span>
              </div>

              <h3 className="text-3xl font-bold text-black dark:text-white leading-tight">
                {features[active].title}
              </h3>

              <motion.p className="text-lg text-gray-600 dark:text-neutral-300 leading-relaxed">
                {features[active].description.split(" ").map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{
                      filter: "blur(10px)",
                      opacity: 0,
                      y: 5,
                    }}
                    animate={{
                      filter: "blur(0px)",
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.2,
                      ease: "easeInOut",
                      delay: 0.02 * index,
                    }}
                    className="inline-block"
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </motion.p>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                  {features[active].name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-black dark:text-white">
                    {features[active].name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-neutral-500">
                    {features[active].designation}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-12">
            <div className="flex gap-3">
              <button
                onClick={handlePrev}
                className="group/button flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 transition-colors duration-200"
              >
                <ChevronLeft className="h-5 w-5 text-black dark:text-neutral-400 transition-transform duration-300 group-hover/button:-translate-x-0.5" />
              </button>
              <button
                onClick={handleNext}
                className="group/button flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 transition-colors duration-200"
              >
                <ChevronRight className="h-5 w-5 text-black dark:text-neutral-400 transition-transform duration-300 group-hover/button:translate-x-0.5" />
              </button>
            </div>

            {/* Progress indicators */}
            <div className="flex gap-2">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActive(index)}
                  className={`h-2 w-8 rounded-full transition-colors duration-200 ${
                    isActive(index)
                      ? "bg-blue-600 dark:bg-blue-400"
                      : "bg-gray-300 dark:bg-neutral-600"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
