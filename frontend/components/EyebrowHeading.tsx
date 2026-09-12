"use client";

import { useRef } from "react";
import type { RefObject } from "react";
import { useEyebrowAutoScale } from "@/hooks/useEyebrowAutoScale";

export type EyebrowHeadingProps = {
  /** eyebrow <p> のid(mockup/index.htmlのid命名を踏襲。省略可) */
  id?: string;
  eyebrowText: string;
  /** 表示幅の基準にする見出しテキスト要素への参照(呼び出し側が見出し要素に付与する) */
  headingRef: RefObject<HTMLElement | null>;
  scale?: number;
  groupId?: string;
};

/**
 * 詳細設計書 5章のクラス設計に定義された `EyebrowHeading` クライアントコンポーネント。
 * eyebrow文字サイズの自動調整表示を担当する(4.2節ロジックのラッパー)。
 *
 * 見出し要素自体(h1/h2)はセクション側の事情(Heroのアクセント強調・改行、
 * Aboutのロゴ中央揃え用ref共有等)によりマークアップが異なるため、本コンポーネントでは
 * 描画せず、呼び出し側が用意した `headingRef` を受け取って測定にのみ使用する。
 */
export function EyebrowHeading({
  id,
  eyebrowText,
  headingRef,
  scale,
  groupId,
}: EyebrowHeadingProps) {
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const eyebrowTextRef = useRef<HTMLSpanElement>(null);

  useEyebrowAutoScale({ eyebrowRef, eyebrowTextRef, headingRef, scale, groupId });

  return (
    <p className="eyebrow" id={id} ref={eyebrowRef}>
      <span ref={eyebrowTextRef}>{eyebrowText}</span>
    </p>
  );
}
