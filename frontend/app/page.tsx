import { SiteHeader } from "@/components/SiteHeader";
import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { PortfolioSection } from "@/components/PortfolioSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { SiteFooter } from "@/components/SiteFooter";

// 詳細設計書 4.12節-3: フッターの著作権年をリクエスト時に評価するため、
// このページ(トップページ全体)を都度レンダリングする。
export const dynamic = "force-dynamic";

/**
 * 詳細設計書 5章 `HomePage`(app/page.tsx)。
 * 各セクションコンポーネントを順に配置するトップページ本体(Server Component)。
 */
export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <ServicesSection />
        <PortfolioSection />
        <AboutSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
