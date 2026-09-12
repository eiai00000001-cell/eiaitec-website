import { SiteHeader } from "@/components/SiteHeader";
import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { PortfolioSection } from "@/components/PortfolioSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { SiteFooter } from "@/components/SiteFooter";
import { BackToTopButton } from "@/components/BackToTopButton";

// 詳細設計書 4.12節-3: フッターの著作権年を最新化するため、このページ(トップページ全体)を
// ISR(Incremental Static Regeneration)対象とし、1日(86400秒)単位で再検証する。
// 年が変わる程度の低頻度な更新要件のため、`force-dynamic`(リクエスト時レンダリング)ではなく
// `revalidate`による定期的な再生成を用い、静的最適化の恩恵を維持する
// (レビュー結果報告書 R-2)。
export const revalidate = 86400;

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
      <BackToTopButton />
    </>
  );
}
