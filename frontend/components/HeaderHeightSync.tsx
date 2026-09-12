"use client";

import { useRef } from "react";
import { useSyncHeaderHeight } from "@/hooks/useSyncHeaderHeight";

/**
 * SiteHeader(Server Component)内に配置する、見た目を持たない同期用コンポーネント。
 * ヘッダーの実高さをCSS変数 --header-h に反映する(詳細設計書4.1節-4)。
 */
export function HeaderHeightSync() {
  const markerRef = useRef<HTMLSpanElement>(null);
  useSyncHeaderHeight(markerRef);
  return <span ref={markerRef} aria-hidden="true" style={{ display: "none" }} />;
}
