"use client";

import { useEffect } from "react";
import type { RefObject } from "react";

export type AboutMarkCenterParams = {
  markRef: RefObject<HTMLElement | null>;
  headingRef: RefObject<HTMLElement | null>;
  columnRef: RefObject<HTMLElement | null>;
};

/**
 * 詳細設計書 4.7節(Aboutセクションのロゴアイコン水平中央揃え)を移植したフック。
 * mockup/index.html の `centerAboutMark` を移植する。
 * 画面幅700px以下では位置合わせを解除し、CSSの通常配置に戻す。
 */
export function useAboutMarkCenter({
  markRef,
  headingRef,
  columnRef,
}: AboutMarkCenterParams): void {
  useEffect(() => {
    function center(): void {
      const mark = markRef.current;
      const heading = headingRef.current;
      const column = columnRef.current;
      if (!mark || !heading || !column) return;

      if (window.matchMedia("(max-width:700px)").matches) {
        mark.style.marginLeft = "";
        return;
      }

      const headingRect = heading.getBoundingClientRect();
      const columnRect = column.getBoundingClientRect();
      const markWidth = mark.getBoundingClientRect().width;
      const offset =
        headingRect.left + headingRect.width / 2 - columnRect.left - markWidth / 2;
      mark.style.marginLeft = `${Math.max(0, offset)}px`;
    }

    center();
    window.addEventListener("load", center);
    window.addEventListener("resize", center);
    document.fonts?.ready?.then(center);

    return () => {
      window.removeEventListener("load", center);
      window.removeEventListener("resize", center);
    };
  }, [markRef, headingRef, columnRef]);
}
