import { HeroHeading } from "./HeroHeading";

/**
 * 詳細設計書 4.3節(F-02: ヒーローセクション)。
 */
export function HeroSection() {
  return (
    <section className="hero">
      <div className="wrap">
        <HeroHeading />
        <p className="lead">EIAI TECは、AIの力でお客様の業務効率化を支援します。</p>
        <div className="cta-row">
          <a href="#contact" className="btn btn-primary">
            相談してみる
          </a>
          <a href="#portfolio" className="btn btn-ghost">
            実績を見る
          </a>
        </div>
      </div>
    </section>
  );
}
