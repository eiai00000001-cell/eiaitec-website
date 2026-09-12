"use client";

import { useEffect } from "react";
import type { RefObject } from "react";

/**
 * 詳細設計書 4.2節(F-02〜F-06共通のeyebrow自動スケーリング処理)を移植したフック。
 * mockup/index.html の `syncOne` / `matchGroups` ロジックに対応する。
 *
 * - eyebrowRef/eyebrowTextRef/headingRef: 対象の組(eyebrow要素・eyebrowテキスト要素・見出しテキスト要素)
 * - scale: 4.2節の表のとおりのスケール値(未指定時は1)
 * - groupId: 指定した場合、同じgroupIdを持つ他のインスタンスとeyebrowの文字サイズを統一する
 *   (最初に登録されたインスタンスの計算結果を基準値として、以降のインスタンスへ上書き適用する。
 *   mockup/index.html の matchGroups の「最初のid = 基準」という順序を、コンポーネントの
 *   マウント順(= 描画順)で再現している)。
 */
export type EyebrowSyncParams = {
  eyebrowRef: RefObject<HTMLElement | null>;
  eyebrowTextRef: RefObject<HTMLElement | null>;
  headingRef: RefObject<HTMLElement | null>;
  scale?: number;
  groupId?: string;
};

type RegistryEntry = EyebrowSyncParams;

const registry = new Set<RegistryEntry>();
let listenersBound = false;

function syncOne(entry: RegistryEntry): void {
  const eyebrow = entry.eyebrowRef.current;
  const eyebrowText = entry.eyebrowTextRef.current;
  const heading = entry.headingRef.current;
  if (!eyebrow || !eyebrowText || !heading) return;

  const currentSize = parseFloat(getComputedStyle(eyebrow).fontSize);
  const eyebrowWidth = eyebrowText.getBoundingClientRect().width;
  const headingWidth = heading.getBoundingClientRect().width;
  if (!eyebrowWidth || !headingWidth) return;

  const scale = entry.scale ?? 1;
  eyebrow.style.fontSize = `${currentSize * (headingWidth / eyebrowWidth) * scale}px`;
}

function applyGroups(): void {
  const groups = new Map<string, RegistryEntry[]>();
  registry.forEach((entry) => {
    if (!entry.groupId) return;
    const list = groups.get(entry.groupId);
    if (list) {
      list.push(entry);
    } else {
      groups.set(entry.groupId, [entry]);
    }
  });

  groups.forEach((entries) => {
    const [reference, ...followers] = entries;
    const referenceEl = reference?.eyebrowRef.current;
    if (!referenceEl) return;
    const size = getComputedStyle(referenceEl).fontSize;
    followers.forEach((entry) => {
      const el = entry.eyebrowRef.current;
      if (el) el.style.fontSize = size;
    });
  });
}

function runSync(): void {
  registry.forEach(syncOne);
  applyGroups();
}

function bindGlobalListenersOnce(): void {
  if (listenersBound || typeof window === "undefined") return;
  listenersBound = true;
  if (document.fonts?.ready) {
    document.fonts.ready.then(runSync);
  }
  window.addEventListener("load", runSync);
  window.addEventListener("resize", runSync);
}

export function useEyebrowAutoScale(params: EyebrowSyncParams): void {
  const { eyebrowRef, eyebrowTextRef, headingRef, scale, groupId } = params;

  useEffect(() => {
    const entry: RegistryEntry = {
      eyebrowRef,
      eyebrowTextRef,
      headingRef,
      scale,
      groupId,
    };
    registry.add(entry);
    bindGlobalListenersOnce();

    return () => {
      registry.delete(entry);
    };
  }, [eyebrowRef, eyebrowTextRef, headingRef, scale, groupId]);
}

/**
 * テスト専用のリセット関数。
 * registry/listenersBound はモジュールスコープのシングルトンであるため、
 * テストケース間の状態漏れを防ぐために使用する。アプリケーションコードからは使用しない。
 */
export function __resetEyebrowAutoScaleForTests(): void {
  registry.clear();
  listenersBound = false;
}
