import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { HeroHeader } from "./header";

export default function HeroSection() {
  return (
    <>
      <HeroHeader />
      <main className="overflow-x-hidden bg-[#05060f] text-white">
        <section>
          <div className="pb-24 pt-16 md:pb-32 lg:pb-48 lg:pt-44">
            <div className="relative mx-auto flex max-w-6xl flex-col px-6 lg:block">
              {/* Text Content */}
              <div className="mx-auto max-w-xl text-center lg:ml-0 lg:w-1/2 lg:text-left">
                <h1 className="mt-8 max-w-2xl text-balance text-5xl font-bold md:text-6xl lg:mt-16 xl:text-7xl leading-tight">
                  Travel Stress-Free with{" "}
                  <span className="text-blue-400">Nero Security</span>
                </h1>
                <p className="mt-8 max-w-2xl text-lg text-gray-300">
                  A smart safety ecosystem powered by Blockchain, AI, and
                  Geo-Fencing. Our{" "}
                  <span className="font-semibold text-white">mobile app</span>{" "}
                  safeguards tourists with real-time alerts, safety scores, and
                  SOS support, while our
                  <span className="font-semibold text-white">
                    {" "}
                    police dashboard
                  </span>{" "}
                  enables authorities to monitor clusters, respond instantly,
                  and issue digital FIRs.
                </p>

                <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
                  <Button
                    asChild
                    size="lg"
                    className="px-6 text-base font-medium"
                  >
                    <Link href="#download">
                      <span className="text-nowrap">Download App</span>
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="ghost"
                    className="px-6 text-base text-white hover:text-blue-400"
                  >
                    <Link href="#demo">
                      <span className="text-nowrap">Request a Demo</span>
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Hero Illustration */}
              <Image
                className="-z-10 order-first ml-auto h-64 w-full object-contain sm:h-[28rem] lg:absolute lg:inset-0 lg:-right-20 lg:-top-40 lg:order-last lg:h-max lg:w-2/3"
                src="https://ik.imagekit.io/lrigu76hy/tailark/abstract-bg.jpg?updatedAt=1745733473768"
                alt="Futuristic Globe Background"
                height="2000"
                width="2000"
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
