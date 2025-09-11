import Content1 from "@/components/content-1";
import Stats from "@/components/stats";
import Footer from "@/components/footer";
import FAQsThree from "@/components/faqs-3";
import { HeroHeader } from "@/components/header";
export default function HomePage() {
  return (
    <>
      <HeroHeader />
      <Content1 />
      <Stats />
      <FAQsThree />
      <Footer />
    </>
  );
}
