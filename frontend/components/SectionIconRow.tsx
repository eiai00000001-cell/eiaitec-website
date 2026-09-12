"use client";

import { useRef } from "react";
import Image from "next/image";
import { useSectionIconCenter } from "@/hooks/useSectionIconCenter";
import { SectionHeading } from "./SectionHeading";

export type SectionIconRowProps = {
  rowId: string;
  eyebrowId: string;
  eyebrowText: string;
  headingText: string;
  scale?: number;
  groupId?: string;
  /**
   * `groupId`で統一するグループ内の基準インスタンスであることを示すフラグ。
   * `SectionHeading`にそのまま引き渡す(レビュー結果報告書 R-3対応)。
   */
  isReference?: boolean;
  iconSrc: string;
  iconWidth: number;
  iconHeight: number;
};

/**
 * Services/Portfolioで共通の「見出しブロック + 右側の装飾アイコン」の行。
 * `mockup/index.html` の `.section-head-row` を踏襲し、
 * 詳細設計書4.6節のセクションアイコン垂直中央揃え処理を適用する。
 */
export function SectionIconRow({
  rowId,
  eyebrowId,
  eyebrowText,
  headingText,
  scale,
  groupId,
  isReference,
  iconSrc,
  iconWidth,
  iconHeight,
}: SectionIconRowProps) {
  const headRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLImageElement>(null);

  useSectionIconCenter(headRef, iconRef);

  return (
    <div className="section-head-row" id={rowId}>
      <SectionHeading
        ref={headRef}
        eyebrowId={eyebrowId}
        eyebrowText={eyebrowText}
        headingText={headingText}
        scale={scale}
        groupId={groupId}
        isReference={isReference}
      />
      <Image
        ref={iconRef}
        className="section-icon-tall"
        src={iconSrc}
        alt=""
        width={iconWidth}
        height={iconHeight}
      />
    </div>
  );
}
