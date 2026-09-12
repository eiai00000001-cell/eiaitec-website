import Image from "next/image";
import { SectionHeading } from "./SectionHeading";
import { SECTION_EYEBROW_GROUP_ID } from "@/lib/constants";
import { ContactForm } from "./ContactForm";

/**
 * 詳細設計書 4.8節(F-06: Contactセクション表示)。
 * 装飾アイコン(worker1.png)はServices/Portfolioと異なり、垂直中央揃え処理の対象外
 * (mockup/index.htmlのcenterSectionIcons()がservicesHeadRow/portfolioHeadRowのみを
 * 対象としている構成を踏襲)。
 */
export function ContactSection() {
  return (
    <section id="contact">
      <div className="wrap">
        <SectionHeading
          eyebrowId="contactEyebrow"
          eyebrowText="Contact"
          headingText="お問い合わせ"
          description="業務の自動化やAI活用について、まずは現状の課題からご相談ください。"
          groupId={SECTION_EYEBROW_GROUP_ID}
        />
        <div className="contact-grid">
          <div>
            <p style={{ fontWeight: 700, fontSize: "1.05rem" }}>ご相談の流れ</p>
            <p style={{ color: "var(--ink-soft)", fontSize: "0.94rem", marginTop: "14px" }}>
              フォーム送信後、担当より通常2営業日以内にメールでご返信します。まずは概要の共有だけで構いません。
            </p>
            <Image
              className="contact-illustration"
              src="/images/worker1.png"
              alt=""
              width={1086}
              height={1448}
            />
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
