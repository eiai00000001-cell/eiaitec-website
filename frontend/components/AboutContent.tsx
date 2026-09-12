"use client";

import { useRef } from "react";
import Image from "next/image";
import { SectionHeading } from "./SectionHeading";
import { useAboutMarkCenter } from "@/hooks/useAboutMarkCenter";
import { SECTION_EYEBROW_GROUP_ID } from "@/lib/constants";

/**
 * 詳細設計書 4.7節(F-05: Aboutセクション)。
 * ロゴアイコン(icon.png)を見出し中央に揃える(centerAboutMarkの移植)ため、
 * 見出しテキスト要素・ロゴ・.aboutグリッドの3つのrefを共有する必要があり、
 * クライアントコンポーネントとして実装する。
 */
export function AboutContent() {
  const headingRef = useRef<HTMLSpanElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const columnRef = useRef<HTMLDivElement>(null);

  useAboutMarkCenter({ headingRef, markRef, columnRef });

  return (
    <>
      <SectionHeading
        eyebrowId="aboutEyebrow"
        eyebrowText="About"
        headingText="EIAI TECとは"
        headingRef={headingRef}
        groupId={SECTION_EYEBROW_GROUP_ID}
      />
      <div className="about" ref={columnRef}>
        <div className="about-mark" id="aboutMark" ref={markRef}>
          <Image src="/images/icon.png" alt="EIAI TEC" width={1254} height={1254} />
        </div>
        <div>
          <p>EIAI TECでは、お客様の業務効率化に向けてAIを活用した支援・コンサルティングを行っています。</p>
          <p>AIによる業務改善にはお客様とコミュニケーションがとても重要です。</p>
          <p>
            AI活用とEI(感性)を大切にしたコミュニケーションで、お客様が抱える業務上の問題を解決します。
          </p>
        </div>
      </div>
    </>
  );
}
