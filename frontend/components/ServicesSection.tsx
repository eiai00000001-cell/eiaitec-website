import { SectionIconRow } from "./SectionIconRow";
import { SECTION_EYEBROW_GROUP_ID } from "@/lib/constants";

const SERVICES_EYEBROW_SCALE = 2 / 3;

const SERVICE_ITEMS = [
  {
    tag: "課題の棚卸し",
    title: "手作業・属人化している業務の洗い出し",
    desc: "Excel転記、定型メール対応、確認作業など、時間を奪っている業務を一緒に特定します。",
  },
  {
    tag: "ツール開発",
    title: "AIを活用した業務ツールの設計・実装",
    desc: "社内の実務に合わせて、AIを活用した自動化スクリプトや簡易アプリケーションを構築します。",
  },
  {
    tag: "導入・定着",
    title: "現場で無理なく使い続けられる形に落とし込み",
    desc: "作って終わりにせず、実際の運用に乗るところまで伴走します。",
  },
] as const;

/**
 * 詳細設計書 4.4節(F-03: Servicesセクション)。
 *
 * 詳細設計書 4.2節-3のとおり、Portfolio/About/Contactのeyebrowフォントサイズは
 * このServicesの計算結果を基準値として統一される。`SectionIconRow`へ`isReference`を
 * 明示的に渡すことで、この基準セクションであることをマウント順に頼らず表現している
 * (レビュー結果報告書 R-3対応)。
 */
export function ServicesSection() {
  return (
    <section id="services">
      <div className="wrap">
        <SectionIconRow
          rowId="servicesHeadRow"
          eyebrowId="servicesEyebrow"
          eyebrowText="Services"
          headingText="サービス内容"
          scale={SERVICES_EYEBROW_SCALE}
          groupId={SECTION_EYEBROW_GROUP_ID}
          isReference
          iconSrc="/images/worker2.png"
          iconWidth={1536}
          iconHeight={1024}
        />

        <div className="service-lede">
          <h3>業務自動化・ツール開発</h3>
        </div>

        {SERVICE_ITEMS.map((item) => (
          <div className="service-row" key={item.tag}>
            <span className="tag">{item.tag}</span>
            <div className="body">
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
