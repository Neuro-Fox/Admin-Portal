"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import Link from "next/link";

type FAQItem = {
  id: string;
  icon: IconName;
  question: string;
  answer: string;
};

export default function FAQSection() {
  const faqItems: FAQItem[] = [
    {
      id: "item-1",
      icon: "shield",
      question: "How secure is my personal data with Fox Security?",
      answer:
        "Your data is protected using blockchain technology with Ethereum smart contracts. All personal information is encrypted end-to-end, and we store only hashed data on the blockchain, never raw personal details. Our system complies with Indian data protection regulations and international privacy standards.",
    },
    {
      id: "item-2",
      icon: "smartphone",
      question: "Do I need to keep the app running all the time?",
      answer:
        "The app works efficiently in the background with minimal battery usage. You can set it to track your location periodically rather than continuously. For remote or high-risk areas, we recommend keeping active tracking enabled for maximum safety coverage.",
    },
    {
      id: "item-3",
      icon: "map-pin",
      question: "What happens if I enter a restricted or dangerous area?",
      answer:
        "Our geo-fencing technology immediately alerts you when approaching restricted zones. You'll receive visual and audio warnings on your phone, and nearby patrol units are automatically notified. The system also provides alternative safe routes and nearby emergency contacts.",
    },
    {
      id: "item-4",
      icon: "globe",
      question: "Is the service available in multiple languages?",
      answer:
        "Yes! Fox Security supports 10+ Indian regional languages including Hindi, Bengali, Tamil, Telugu, Marathi, Gujarati, Kannada, Malayalam, Punjabi, and Urdu, plus English. The app includes voice commands and text-to-speech for accessibility.",
    },
    {
      id: "item-5",
      icon: "zap",
      question: "How fast is the emergency response system?",
      answer:
        "Our AI-powered system processes emergency alerts in under 15 seconds. When you press the SOS button, your location is instantly shared with the nearest police units, emergency contacts, and our response team. We maintain partnerships with 200+ police stations across India for rapid response.",
    },
    {
      id: "item-6",
      icon: "users",
      question: "Can families or groups be monitored together?",
      answer:
        "Absolutely! Family members can be linked under one account with shared emergency contacts and group location sharing. Parents can monitor children, and tour leaders can track entire groups with comprehensive dashboard views and collective safety alerts.",
    },
    {
      id: "item-7",
      icon: "wifi-off",
      question: "What if I lose internet connectivity in remote areas?",
      answer:
        "The app stores essential safety data offline and can function with limited connectivity. For remote areas, we offer optional IoT wearable devices that use satellite connectivity. Emergency alerts can be sent via SMS backup systems when internet is unavailable.",
    },
    {
      id: "item-8",
      icon: "credit-card",
      question: "What are the costs and subscription plans?",
      answer:
        "Basic safety monitoring is free for all tourists. Premium plans start at ₹299/month and include advanced AI alerts, family group monitoring, and priority emergency response. Government partnerships provide free access in many tourist destinations.",
    },
  ];

  return (
    <section
      id="faq"
      className="bg-gradient-to-b from-black via-gray-900 to-slate-900 py-20 md:py-32 relative"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-5" />

      <div className="mx-auto max-w-6xl px-4 md:px-6 relative z-10">
        <div className="flex flex-col gap-16 md:flex-row md:gap-20">
          <div className="md:w-1/3">
            <div className="sticky top-20 space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                Got questions about Fox Security? Find answers to the most
                common questions about our tourist safety platform, features,
                and services.
              </p>
              <p className="text-gray-400">
                Can't find what you're looking for? Contact our{" "}
                <Link
                  href="#contact"
                  className="text-blue-400 font-medium hover:text-blue-300 hover:underline transition-colors"
                >
                  24/7 support team
                </Link>
              </p>

              {/* Contact Options */}
              <div className="space-y-3 pt-4">
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Live chat available 24/7</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Email support@foxsecurity.in</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>WhatsApp +91-9999-SAFETY</span>
                </div>
              </div>
            </div>
          </div>

          <div className="md:w-2/3">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqItems.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl px-6 hover:border-gray-600/50 transition-all duration-300 last:border-b"
                >
                  <AccordionTrigger className="cursor-pointer items-center py-6 hover:no-underline group">
                    <div className="flex items-center gap-4 text-left">
                      <div className="flex w-10 h-10 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-xl items-center justify-center border border-blue-500/30 group-hover:scale-110 transition-transform shrink-0">
                        <DynamicIcon
                          name={item.icon}
                          className="h-5 w-5 text-blue-400"
                        />
                      </div>
                      <span className="text-base md:text-lg font-semibold text-white group-hover:text-blue-100 transition-colors">
                        {item.question}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6">
                    <div className="pl-14">
                      <p className="text-base text-gray-300 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {/* Additional Help Section */}
            <div className="mt-12 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-cyan-900/20 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-white mb-4">
                Still need help?
              </h3>
              <p className="text-gray-300 mb-6">
                Our dedicated support team is available around the clock to
                assist you with any questions or concerns about your safety
                while traveling.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="#contact"
                  className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-blue-500/25"
                >
                  Contact Support
                </Link>
                <Link
                  href="#docs"
                  className="inline-flex items-center justify-center px-6 py-3 border border-gray-600 text-gray-300 hover:text-white hover:bg-white/10 hover:border-gray-400 font-semibold rounded-lg transition-all duration-300"
                >
                  View Documentation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
