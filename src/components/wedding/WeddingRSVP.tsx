"use client";
import { useRef, useState } from "react";
import { Check } from "lucide-react";
import type { FormEvent } from "react";
import type { WeddingConfig } from "@/types/wedding";
import { SectionReveal } from "@/components/ui/SectionReveal";

type RSVP = {
  name: string;
  attending: "yes" | "no";
  guests: number;
  message: string;
};
type Errors = Partial<Record<"name" | "guests", string>>;
// Replace this adapter with an API call when a backend is added. It intentionally stores nothing.
async function submitDemoRSVP(data: RSVP): Promise<{ localOnly: true }> {
  void data;
  return { localOnly: true };
}

export function WeddingRSVP({
  config,
  initialName = "",
}: {
  config: WeddingConfig;
  initialName?: string;
}) {
  const [name, setName] = useState(initialName);
  const [attending, setAttending] = useState<"yes" | "no">("yes");
  const [guests, setGuests] = useState("1");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const guestsRef = useRef<HTMLInputElement>(null);
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const parsed = Number(guests);
    const next: Errors = {};
    if (name.trim().length < 2) next.name = "សូមបញ្ចូលឈ្មោះយ៉ាងតិច ២ តួអក្សរ។";
    if (
      attending === "yes" &&
      (!Number.isInteger(parsed) ||
        parsed < 1 ||
        parsed > config.rsvp.maxGuests)
    )
      next.guests = `សូមបញ្ចូលចំនួនភ្ញៀវពី ១ ដល់ ${config.rsvp.maxGuests} នាក់។`;
    setErrors(next);
    if (Object.keys(next).length) {
      if (next.name) nameRef.current?.focus();
      else guestsRef.current?.focus();
      return;
    }
    setBusy(true);
    try {
      await submitDemoRSVP({
        name: name.trim(),
        attending,
        guests: attending === "yes" ? parsed : 0,
        message: message.trim(),
      });
      setDone(true);
    } finally {
      setBusy(false);
    }
  }
  return (
    <section id="rsvp" className="section rsvp-section">
      <SectionReveal className="rsvp-intro">
        <p className="eyebrow">YOUR PRESENCE IS OUR GIFT</p>
        <h2 className="section-title">សូមឆ្លើយតបការអញ្ជើញ</h2>
        <p>សូមប្រាប់យើងថាលោកអ្នកអាចចូលរួមអបអរថ្ងៃដ៏ពិសេសនេះបានឬទេ។</p>
        <div className="rsvp-note">
          ទម្រង់គំរូនេះបង្ហាញការបញ្ជាក់នៅលើឧបករណ៍របស់អ្នកប៉ុណ្ណោះ។
          មិនមានទិន្នន័យត្រូវបានផ្ញើ ឬរក្សាទុកឡើយ។
        </div>
      </SectionReveal>
      <SectionReveal className="rsvp-form-wrap" delay={0.12}>
        {done ? (
          <div className="rsvp-form rsvp-success" role="status">
            <div className="success-icon">
              <Check />
            </div>
            <h3>បានបំពេញទម្រង់គំរូ</h3>
            <p>
              អរគុណ {name.trim()}។ នេះគឺជាការបង្ហាញគំរូប៉ុណ្ណោះ
              ហើយចម្លើយមិនត្រូវបានផ្ញើទៅម្ចាស់កម្មវិធីទេ។
            </p>
            <button className="text-link" onClick={() => setDone(false)}>
              កែប្រែចម្លើយ
            </button>
          </div>
        ) : (
          <form className="rsvp-form" noValidate onSubmit={handleSubmit}>
            <label htmlFor="guest-name">
              ឈ្មោះភ្ញៀវ <span>*</span>
            </label>
            <input
              id="guest-name"
              ref={nameRef}
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                setErrors((v) => ({ ...v, name: undefined }));
              }}
              autoComplete="name"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "guest-name-error" : undefined}
              placeholder="បញ្ចូលឈ្មោះរបស់លោកអ្នក"
            />
            {errors.name && (
              <p className="field-error" id="guest-name-error">
                {errors.name}
              </p>
            )}
            <fieldset>
              <legend>
                អាចចូលរួមបានទេ? <span>*</span>
              </legend>
              <div className="choice-row">
                <label
                  className={attending === "yes" ? "choice selected" : "choice"}
                >
                  <input
                    type="radio"
                    name="attending"
                    value="yes"
                    checked={attending === "yes"}
                    onChange={() => setAttending("yes")}
                  />
                  ចូលរួម
                </label>
                <label
                  className={attending === "no" ? "choice selected" : "choice"}
                >
                  <input
                    type="radio"
                    name="attending"
                    value="no"
                    checked={attending === "no"}
                    onChange={() => setAttending("no")}
                  />
                  មិនអាចចូលរួម
                </label>
              </div>
            </fieldset>
            {attending === "yes" && (
              <>
                <label htmlFor="guest-count">
                  ចំនួនភ្ញៀវ <span>*</span>
                </label>
                <input
                  id="guest-count"
                  ref={guestsRef}
                  type="number"
                  min="1"
                  max={config.rsvp.maxGuests}
                  inputMode="numeric"
                  value={guests}
                  onChange={(event) => {
                    setGuests(event.target.value);
                    setErrors((v) => ({ ...v, guests: undefined }));
                  }}
                  aria-invalid={!!errors.guests}
                  aria-describedby={
                    errors.guests ? "guest-count-error" : undefined
                  }
                />
                {errors.guests && (
                  <p className="field-error" id="guest-count-error">
                    {errors.guests}
                  </p>
                )}
              </>
            )}
            <label htmlFor="guest-message">
              សារជូនពរ <span className="optional">(ជាជម្រើស)</span>
            </label>
            <textarea
              className="resize-none"
              id="guest-message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              maxLength={500}
              rows={4}
              placeholder="សរសេរសារជូនពររបស់លោកអ្នក..."
            />
            <button
              className="button button-gold"
              type="submit"
              disabled={busy}
            >
              {busy ? "កំពុងបង្ហាញ..." : "បញ្ជាក់ទម្រង់គំរូ"}{" "}
              <span aria-hidden="true">↗</span>
            </button>
          </form>
        )}
      </SectionReveal>
    </section>
  );
}
