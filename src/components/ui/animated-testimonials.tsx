"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { Star } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";

import { useCallback, useEffect, useState } from "react";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
  rating?: number;
};
export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});

  const handleImgError = (index: number) => {
    setImgErrors((prev) => ({ ...prev, [index]: true }));
  };

  const handleNext = useCallback(() => {
    if (testimonials.length === 0) return;
    setActive((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = () => {
    if (testimonials.length === 0) return;
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay, handleNext]);

  if (testimonials.length === 0) {
    return null;
  }

  const getRotateY = (index: number) => {
    return ((index * 17) % 21) - 10;
  };

  const hasValidImage = (testimonial: Testimonial, index: number) => {
    return (
      !imgErrors[index] &&
      testimonial.src &&
      testimonial.src !== ""
    );
  };

  return (
    <div className="mx-auto max-w-sm px-4 py-8 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12">
      <div className="relative grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-16">

        {/* Image Column */}
        <div>
          <div className="relative mx-auto h-[320px] w-[320px] md:h-[360px] md:w-[360px]">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={`${testimonial.name}-${testimonial.src}-${index}`}
                  initial={{ opacity: 0, scale: 0.9, z: -100, rotate: getRotateY(index) }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : getRotateY(index),
                    zIndex: isActive(index) ? 40 : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{ opacity: 0, scale: 0.9, z: 100, rotate: getRotateY(index) }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute inset-0 origin-bottom"
                >
                  {/* Fallback dark card always rendered behind */}
                  <div
                    className="rounded-3xl absolute inset-0 flex flex-col items-center justify-center"
                    style={{ backgroundColor: "#0a1c3a" }}
                  >
                    <div style={{
                      width: "80px", height: "80px", borderRadius: "50%",
                      backgroundColor: "#E09100", display: "flex",
                      alignItems: "center", justifyContent: "center",
                      color: "#fff", fontSize: "2rem", fontWeight: 800,
                    }}>
                      {testimonial.name?.charAt(0) || "?"}
                    </div>
                    <p style={{ color: "#fff", marginTop: "1rem", fontWeight: 600, fontSize: "1rem" }}>
                      {testimonial.name}
                    </p>
                  </div>
                  {/* Actual image — only shown when valid */}
                  {hasValidImage(testimonial, index) && (
                    <Image
                      src={testimonial.src}
                      alt={testimonial.name}
                      fill
                      sizes="(max-width: 768px) 320px, 360px"
                      draggable={false}
                      className="rounded-3xl object-cover object-center"
                      onError={() => handleImgError(index)}
                    />
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Text Column */}
        <div className="flex flex-col justify-between py-4">
          <motion.div
            key={active}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <h3 className="text-2xl font-bold text-black dark:text-white">
              {testimonials[active].name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-neutral-500">
              {testimonials[active].designation}
            </p>
            <div className="mt-4 flex items-center gap-1 text-amber-500">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className="h-5 w-5"
                  fill={index < (testimonials[active].rating ?? 5) ? "currentColor" : "none"}
                  strokeWidth={2}
                />
              ))}
            </div>
            <motion.p className="mt-6 text-lg text-gray-500 dark:text-neutral-300">
              {testimonials[active].quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                  animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut", delay: 0.02 * index }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>

          {/* Nav Arrows */}
          <div className="flex gap-4 pt-8">
            <button
              aria-label="Previous testimonial"
              onClick={handlePrev}
              className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800"
            >
              <IconArrowLeft className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:rotate-12 dark:text-neutral-400" />
            </button>
            <button
              aria-label="Next testimonial"
              onClick={handleNext}
              className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800"
            >
              <IconArrowRight className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:-rotate-12 dark:text-neutral-400" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
