"use client";

import { useRef } from "react";
import Image from "next/image";
import { EyebrowHeading } from "./EyebrowHeading";

const HERO_EYEBROW_SCALE = 0.7;

/**
 * Heroセクションの「ヒーロービジュアル + eyebrow + 見出し(h1)」部分。
 * 詳細設計書 4.3節(F-02)・4.2節(共通eyebrow自動スケーリング、scale=0.7)を実装する。
 *
 * 見出し(h1)は「AI」「EI(感性)」のアクセント強調・改行を含む固有マークアップのため、
 * `EyebrowHeading` の headingText文字列プロパティでは表現できず、本コンポーネントが
 * 見出し要素を直接描画し、そのrefをEyebrowHeadingに渡す構成とした
 * (詳細設計書との差異。5章クラス設計のProps一覧は代表例であり、Heroのみ個別対応)。
 */
export function HeroHeading() {
  const headingRef = useRef<HTMLSpanElement>(null);

  return (
    <>
      <div className="hero-image-wrap">
        <Image
          className="hero-image"
          src="/images/work.png"
          alt=""
          width={1536}
          height={1024}
          priority
        />
        <EyebrowHeading eyebrowText="AI meets EI." headingRef={headingRef} scale={HERO_EYEBROW_SCALE} />
      </div>
      <h1>
        <span ref={headingRef}>
          <span className="accent">AI</span>と<span className="accent">EI(感性)</span>で
          <br />
          働き方をアップデート。
        </span>
      </h1>
    </>
  );
}
