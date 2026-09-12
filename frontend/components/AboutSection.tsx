import { AboutContent } from "./AboutContent";

/**
 * 詳細設計書 4.7節(F-05: Aboutセクション)。
 * 代表者個人の氏名・顔写真・経歴は表示しない(mockup/index.html実表示に準拠)。
 */
export function AboutSection() {
  return (
    <section id="about">
      <div className="wrap">
        <AboutContent />
      </div>
    </section>
  );
}
