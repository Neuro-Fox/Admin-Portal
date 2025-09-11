import Content1 from "@/components/content-1";
import Stats from "@/components/stats";
import Footer from "@/components/footer";
import FAQsThree from "@/components/faqs-3";
import { HeroHeader } from "@/components/header";
import HeroSection from "@/components/HeroSection";
import PoliceDashboardSection from "@/components/PoliceDashboardSection";
export default function HomePage() {
  return (
    <>
      <HeroHeader />
      <HeroSection />
      <Content1 />
      <PoliceDashboardSection />
      <Stats />
      <FAQsThree />
      <Footer />
    </>
  );
}
