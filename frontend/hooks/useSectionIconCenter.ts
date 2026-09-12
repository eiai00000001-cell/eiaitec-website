"use client";

import { useEffect } from "react";
import type { RefObject } from "react";

/**
 * 詳細設計書 4.6節(Services/Portfolio共通のセクションアイコン垂直中央揃え処理)を移植したフック。
 * mockup/index.html の `centerSectionIcon` を移植する。
 *
 * headRef: 見出しブロック(.section-head)への参照
 * iconRef: 装飾アイコン画像(.section-icon-tall)への参照
 */
export function useSectionIconCenter(
  headRef: RefObject<HTMLElement | null>,
  iconRef: RefObject<HTMLElement | null>
): void {
  useEffect(() => {
    function center(): void {
      const head = headRef.current;
      const img = iconRef.current;
      if (!head || !img) return;

      img.style.marginTop = "0px";
      const headRect = head.getBoundingClientRect();
      const imgRect = img.getBoundingClientRect();
      const headCenter = headRect.top + headRect.height / 2;
      const desiredImgTop = headCenter - imgRect.height / 2;
      const delta = desiredImgTop - imgRect.top;
      img.style.marginTop = `${delta}px`;
    }

    center();
    window.addEventListener("load", center);
    window.addEventListener("resize", center);
    document.fonts?.ready?.then(center);

    return () => {
      window.removeEventListener("load", center);
      window.removeEventListener("resize", center);
    };
  }, [headRef, iconRef]);
}
