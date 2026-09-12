"use client";

import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/navLinks";

const MOBILE_BREAKPOINT_QUERY = "(max-width:640px)";

/**
 * 詳細設計書 4.10節(F-08: モバイル用ナビゲーションメニュー)を実装するクライアントコンポーネント。
 * 意匠は docs/02_architect/mockups/mobile-nav.html に準拠する。
 */
export function MobileNavMenu() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleMenu() {
    setIsOpen((prev) => !prev);
  }

  function closeMenu() {
    setIsOpen(false);
  }

  // 画面幅が640pxを超えた場合(PC表示に戻った場合)はメニューを閉じる。
  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_BREAKPOINT_QUERY);
    function handleChange(event: MediaQueryListEvent) {
      if (!event.matches) {
        setIsOpen(false);
      }
    }
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <>
      <button
        type="button"
        className={`menu-toggle${isOpen ? " is-open" : ""}`}
        aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
        aria-expanded={isOpen}
        onClick={toggleMenu}
      >
        <span className="bars">
          <span />
          <span />
          <span />
        </span>
      </button>
      <div className={`mobile-panel${isOpen ? " is-open" : ""}`} aria-hidden={!isOpen}>
        <div className="mobile-panel-inner">
          <nav>
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                tabIndex={isOpen ? undefined : -1}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="panel-cta"
              onClick={closeMenu}
              tabIndex={isOpen ? undefined : -1}
            >
              お問い合わせ
            </a>
          </nav>
        </div>
      </div>
    </>
  );
}
