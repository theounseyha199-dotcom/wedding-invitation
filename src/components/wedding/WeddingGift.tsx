import Image from "next/image";
import { Download, ExternalLink, Gift } from "lucide-react";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { SectionReveal } from "@/components/ui/SectionReveal";

export function WeddingGift() {
  return (
    <section
      id="gift"
      className="section gift-section"
      aria-labelledby="gift-title"
    >
      <SectionReveal className="gift-copy">
        <Gift
          className="gift-icon"
          size={28}
          strokeWidth={1.2}
          aria-hidden="true"
        />
        <p className="eyebrow">WITH LOVE & GRATITUDE</p>
        <h2 id="gift-title" className="section-title">
          ចំណងដៃមង្គលការ
        </h2>
        <GoldDivider />
        <p className="section-intro">
          វត្តមាន និងពរជ័យរបស់លោកអ្នក គឺជាក្តីរីករាយដ៏ធំធេងសម្រាប់យើងខ្ញុំ។
        </p>
        <p className="gift-instructions">
          សម្រាប់លោកអ្នកដែលមានបំណងផ្តល់ចំណងដៃ សូមស្កេន QR
          នេះតាមកម្មវិធីធនាគាររបស់លោកអ្នក។
        </p>
        <p className="gift-recipient">
          ឈ្មោះអ្នកទទួល <strong lang="en">SEYHA THEOUN</strong>
        </p>
        <p className="gift-help">
          ប្រសិនបើលោកអ្នកប្រើទូរស័ព្ទតែមួយ សូមរក្សាទុករូបភាព QR
          រួចជ្រើសរើសរូបភាពនោះនៅក្នុងកម្មវិធីធនាគារដែលគាំទ្រ។
        </p>
        <a
          href="/qr.png"
          download="wedding-gift-qr.png"
          className="button button-gold"
        >
          <Download size={18} aria-hidden="true" /> រក្សាទុករូបភាព QR
        </a>
      </SectionReveal>
      <div className="gift-qr-panel">
        <a
          className="gift-qr-link"
          href="/qr.png"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="មើលរូបភាព QR ពេញទំហំ (បើកផ្ទាំងថ្មី)"
        >
          <Image
            src="/qr.png"
            alt="KHQR សម្រាប់ចំណងដៃមង្គលការ — ឈ្មោះអ្នកទទួល SEYHA THEOUN"
            width={1290}
            height={1871}
            unoptimized
            className="gift-qr-image"
          />
          <span>
            មើលរូបភាព QR ពេញទំហំ <ExternalLink size={15} aria-hidden="true" />
          </span>
        </a>
      </div>
    </section>
  );
}
