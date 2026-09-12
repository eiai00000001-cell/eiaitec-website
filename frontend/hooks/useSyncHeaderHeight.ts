"use client";

import { useEffect } from "react";
import type { RefObject } from "react";

/**
 * 詳細設計書 4.1節-4(ヘッダー実高さのCSS変数反映)を移植したフック。
 * mockup/index.html の `syncHeaderHeight` を移植する。
 *
 * markerRef: header.site 要素の子孫に配置する目印要素への参照。
 * `closest("header.site")` でヘッダー要素自体を取得する
 * (SiteHeaderはServer Componentのため、ヘッダー要素自体のrefをクライアント側へ
 * 直接渡すことができない。目印要素経由でDOMを辿ることで対応する)。
 */
export function useSyncHeaderHeight(markerRef: RefObject<HTMLElement | null>): void {
  useEffect(() => {
    function sync(): void {
      const header = markerRef.current?.closest("header.site");
      if (!header) return;
      document.documentElement.style.setProperty(
        "--header-h",
        `${header.getBoundingClientRect().height}px`
      );
    }

    sync();
    window.addEventListener("load", sync);
    window.addEventListener("resize", sync);
    document.fonts?.ready?.then(sync);

    return () => {
      window.removeEventListener("load", sync);
      window.removeEventListener("resize", sync);
    };
  }, [markerRef]);
}
