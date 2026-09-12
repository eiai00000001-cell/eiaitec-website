import { vi } from "vitest";

/**
 * jsdomは実レイアウトを計算しないため、getBoundingClientRect()は常に0を返す。
 * テストでは要素ごとに任意の矩形をスタブして、測定ロジックを検証できるようにする。
 */
export function mockRect(
  element: Element,
  rect: Partial<DOMRect> & { width: number; height?: number; top?: number; left?: number }
): void {
  const full: DOMRect = {
    width: rect.width,
    height: rect.height ?? 20,
    top: rect.top ?? 0,
    left: rect.left ?? 0,
    right: (rect.left ?? 0) + rect.width,
    bottom: (rect.top ?? 0) + (rect.height ?? 20),
    x: rect.left ?? 0,
    y: rect.top ?? 0,
    toJSON() {
      return this;
    },
  };
  vi.spyOn(element, "getBoundingClientRect").mockReturnValue(full);
}
