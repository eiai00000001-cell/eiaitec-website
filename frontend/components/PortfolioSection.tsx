import { SectionIconRow } from "./SectionIconRow";
import { SECTION_EYEBROW_GROUP_ID } from "./ServicesSection";

const CASE_STEPS = [
  { key: "01", label: "方向性のヒアリング(目的・ターゲット・トーン)" },
  { key: "02", label: "配色・タイポグラフィ等のデザイン方針策定" },
  { key: "03", label: "静的モックアップによる見た目の確認(本ページ)" },
  { key: "04", label: "本実装・デプロイ" },
] as const;

/**
 * 詳細設計書 4.5節(F-04: Portfolioセクション)。
 * CASE番号は文字列定数"000"として保持する(将来の実案件追加ルールは詳細設計書4.5-3参照)。
 */
export function PortfolioSection() {
  return (
    <section id="portfolio">
      <div className="wrap">
        <SectionIconRow
          rowId="portfolioHeadRow"
          eyebrowId="portfolioEyebrow"
          eyebrowText="Portfolio"
          headingText="実績"
          groupId={SECTION_EYEBROW_GROUP_ID}
          iconSrc="/images/worker3.png"
          iconWidth={1536}
          iconHeight={1024}
        />

        <div className="case">
          <div className="case-head">
            <div>
              <span className="mono">CASE / 000</span>
              <h3>EIAI TEC 公式サイトの構築</h3>
            </div>
            <span className="case-status">Webサイト</span>
          </div>
          <div className="case-body">
            <p className="desc">
              このWebサイト自体を、AI駆動開発のプロセスに沿って構築しています。方向性のヒアリングから設計・実装までの流れをそのまま公開することで、実務でどのようにAIを活用しているかを示す事例にしています。
            </p>
            <div className="case-steps">
              {CASE_STEPS.map((step) => (
                <div className="step" key={step.key}>
                  <span className="k mono">{step.key}</span>
                  <span>{step.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="case-foot">
            <span>今後、実際のクライアント案件を随時追加予定です。</span>
          </div>
        </div>
      </div>
    </section>
  );
}
