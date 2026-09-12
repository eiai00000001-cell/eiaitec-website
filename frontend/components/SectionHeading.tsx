"use client";

import { useRef } from "react";
import type { Ref, RefObject } from "react";
import { EyebrowHeading } from "./EyebrowHeading";

export type SectionHeadingProps = {
  eyebrowId?: string;
  eyebrowText: string;
  headingText: string;
  description?: string;
  scale?: number;
  groupId?: string;
  /**
   * 見出しテキスト要素への外部参照。Aboutセクションのロゴ中央揃え(4.7節)のように、
   * 見出し要素の座標を本コンポーネント外でも利用したい場合に指定する。
   * 未指定時は内部で生成したrefを使用する。
   */
  headingRef?: RefObject<HTMLSpanElement | null>;
  /**
   * ルート要素(.section-head)への参照。Services/Portfolioの装飾アイコン
   * 垂直中央揃え(4.6節)で、見出しブロックの座標を測定するために使用する。
   */
  ref?: Ref<HTMLDivElement>;
};

/**
 * Services/Portfolio/About/Contactで共通の見出しブロック(section-head--stack)。
 * `mockup/index.html` の同名クラスのマークアップを踏襲する。
 */
export function SectionHeading({
  eyebrowId,
  eyebrowText,
  headingText,
  description,
  scale,
  groupId,
  headingRef: externalHeadingRef,
  ref,
}: SectionHeadingProps) {
  const internalHeadingRef = useRef<HTMLSpanElement>(null);
  const headingRef = externalHeadingRef ?? internalHeadingRef;

  return (
    <div className="section-head section-head--stack" ref={ref}>
      <EyebrowHeading
        id={eyebrowId}
        eyebrowText={eyebrowText}
        headingRef={headingRef}
        scale={scale}
        groupId={groupId}
      />
      <div>
        <h2>
          <span ref={headingRef}>{headingText}</span>
        </h2>
        {description ? <p className="desc">{description}</p> : null}
      </div>
    </div>
  );
}
