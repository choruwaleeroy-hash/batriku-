import { useEffect, useRef, useState } from "react";
import { useLang, type Lang } from "./i18n";

const RED = "#E10A0A";
const CHARCOAL = "#111315";
const PHONE_DISPLAY = "+263 77 458 4292";
const PHONE_TEL = "+263774584292";
const WHATSAPP_NUMBER = "263774584292"; // no + sign for wa.me

/* =====================================================
   Inline SVG icons (transparent, no square borders)
   ===================================================== */

const ShieldCheck = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
    <path d="M32 3 L58 12 V30 C58 46 47 56 32 61 C17 56 6 46 6 30 V12 Z" fill="#ffffff" />
    <path
      d="M32 7 L54 14.5 V30 C54 43.5 44.5 52.5 32 57 C19.5 52.5 10 43.5 10 30 V14.5 Z"
      fill={RED}
    />
    <path
      d="M20 32 L29 41 L46 22"
      stroke="#ffffff"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

const LocationPin = ({
  className = "",
  color = "#ffffff",
  dotColor,
}: {
  className?: string;
  color?: string;
  dotColor?: string;
}) => (
  <svg viewBox="0 0 48 64" className={className} aria-hidden="true">
    <path
      d="M24 2 C12 2 3 11 3 23 C3 39 24 62 24 62 C24 62 45 39 45 23 C45 11 36 2 24 2 Z"
      fill={color}
    />
    <circle cx="24" cy="22" r="7" fill={dotColor ?? (color === "#ffffff" ? CHARCOAL : "#ffffff")} />
  </svg>
);

const Phone = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path
      d="M6.6 2.5h3.1l1.6 4.1-2.1 1.3a12 12 0 0 0 6.9 6.9l1.3-2.1 4.1 1.6v3.1A2.5 2.5 0 0 1 19 20 17.5 17.5 0 0 1 4 5a2.5 2.5 0 0 1 2.6-2.5Z"
      fill="currentColor"
    />
  </svg>
);

const Whatsapp = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
    <path
      fill="currentColor"
      d="M16 3C8.8 3 3 8.8 3 16c0 2.5.7 4.9 2 7L3 29l6.2-1.9c2 1.1 4.4 1.7 6.8 1.7 7.2 0 13-5.8 13-13S23.2 3 16 3Zm7.5 18.4c-.3.9-1.8 1.7-2.5 1.8-.6.1-1.5.1-2.4-.2-.6-.2-1.3-.4-2.2-.8-3.9-1.7-6.4-5.6-6.6-5.9-.2-.3-1.6-2.1-1.6-4 0-1.9 1-2.8 1.4-3.2.4-.4.8-.5 1.1-.5h.8c.3 0 .6 0 .9.7.3.8 1.1 2.7 1.2 2.9.1.2.2.4 0 .7-.2.3-.3.5-.5.7-.2.2-.4.5-.6.7-.2.2-.4.4-.2.8.2.4 1 1.6 2.1 2.6 1.5 1.3 2.7 1.7 3.1 1.9.4.2.6.2.8-.1.2-.3.9-1.1 1.2-1.5.2-.4.5-.3.8-.2.3.1 2.1 1 2.5 1.2.4.2.6.3.7.4.2.3.2 1-.1 1.9Z"
    />
  </svg>
);

const ArrowRight = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
    <path
      d="M5 12h14M13 6l6 6-6 6"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Close = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);

const Hammer = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
    <path
      d="M14 3l7 7-3 3-3-3-9 9-3-3 9-9-3-3 3-3z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  </svg>
);

const MapMarker = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path
      d="M12 2C7.6 2 4 5.6 4 10c0 6 8 12 8 12s8-6 8-12c0-4.4-3.6-8-8-8Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"
      fill="currentColor"
    />
  </svg>
);

/* =====================================================
   Language Switcher — pill toggle, premium styling
   ===================================================== */
function LangSwitcher({
  lang,
  setLang,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
}) {
  return (
    <div
      className="relative inline-flex items-center rounded-full bg-neutral-100 p-1 text-[11px] font-black uppercase tracking-[0.18em] select-none"
      role="group"
      aria-label="Language"
    >
      {/* Sliding pill indicator */}
      <span
        aria-hidden="true"
        className="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full transition-transform duration-300 ease-out"
        style={{
          background: `linear-gradient(135deg, ${RED} 0%, #b00606 100%)`,
          boxShadow: "0 8px 18px -6px rgba(225,10,10,0.55)",
          transform: lang === "en" ? "translateX(4px)" : "translateX(calc(100% + 4px))",
        }}
      />
      <button
        onClick={() => setLang("en")}
        className={`relative z-10 px-3 py-1.5 rounded-full transition-colors ${
          lang === "en" ? "text-white" : "text-neutral-600 hover:text-black"
        }`}
        aria-pressed={lang === "en"}
      >
        EN
      </button>
      <button
        onClick={() => setLang("sn")}
        className={`relative z-10 px-3 py-1.5 rounded-full transition-colors ${
          lang === "sn" ? "text-white" : "text-neutral-600 hover:text-black"
        }`}
        aria-pressed={lang === "sn"}
      >
        SN
      </button>
    </div>
  );
}

/* =====================================================
   Scroll reveal hook
   ===================================================== */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({
  children,
  delay = 0,
  y = 24,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity 700ms cubic-bezier(.2,.7,.2,1) ${delay}ms, transform 700ms cubic-bezier(.2,.7,.2,1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

/* =====================================================
   Quote modal — sends to WhatsApp
   ===================================================== */
function QuoteModal({
  open,
  onClose,
  t,
}: {
  open: boolean;
  onClose: () => void;
  t: (k: import("./i18n").TKey) => string;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setSending(true);
    // ── Build a clean, well-formatted WhatsApp message ──
    // WhatsApp markup:  *bold*   _italic_   ```mono```
    // Blank lines + dashed dividers create a clear "table" feel.
    const now = new Date();
    const dateStr = now.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    const timeStr = now.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const divider = "━━━━━━━━━━━━━━━━━━━━";

    const text = [
      `*🔔  ${t("wa_title")}*`,
      `_${t("wa_brand")}_`,
      divider,
      ``,
      `*👤  ${t("wa_customer")}*`,
      `${name}`,
      ``,
      `*📞  ${t("wa_phone")}*`,
      `${phone?.trim() ? phone : t("wa_not_provided")}`,
      ``,
      `*📝  ${t("wa_details")}*`,
      `${message}`,
      ``,
      divider,
      `*📅  ${t("wa_submitted")}*`,
      `${dateStr}  •  ${timeStr}`,
      ``,
      `_${t("wa_footer")}_`,
    ].join("\n");

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    // Open WhatsApp in a new tab
    window.open(url, "_blank", "noopener,noreferrer");
    setTimeout(() => {
      setSending(false);
      onClose();
    }, 600);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
    >
      {/* Stronger frosted-glass backdrop */}
      <div
        className="absolute inset-0"
        style={{
          animation: "fadeIn .35s ease both",
          background: "rgba(8,8,10,0.65)",
          backdropFilter: "blur(14px) saturate(120%)",
          WebkitBackdropFilter: "blur(14px) saturate(120%)",
        }}
        onClick={onClose}
      />

      {/* Compact card — small premium pop */}
      <div
        className="relative w-full max-w-md bg-white overflow-hidden rounded-[26px]"
        style={{
          animation: "popIn .45s cubic-bezier(.2,.8,.2,1) both",
          boxShadow:
            "0 40px 100px -20px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.06), 0 0 60px -10px rgba(225,10,10,0.35)",
        }}
      >
        {/* ===== Red header with the SAME animated wave at the bottom ===== */}
        <div
          className="relative px-6 pt-6 pb-12 text-white overflow-hidden"
          style={{
            background:
              "linear-gradient(180deg, #8a0404 0%, #a00505 50%, #b00606 100%)",
          }}
        >
          {/* Drifting mesh fabric */}
          <div
            className="absolute inset-0 opacity-[0.18] pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage: "url(/images/mesh-texture.png)",
              backgroundSize: "200px",
              animation: "meshDrift 18s ease-in-out infinite",
            }}
          />
          {/* Dark depth orb */}
          <div
            className="absolute -bottom-16 -right-10 w-56 h-56 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 70%)",
              filter: "blur(20px)",
              animation: "orbB 14s ease-in-out infinite",
            }}
          />

          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center bg-black/30 hover:bg-black hover:rotate-90 transition-all z-10"
            aria-label="Close"
          >
            <Close className="w-3.5 h-3.5" />
          </button>

          <p className="relative text-[10px] font-bold uppercase tracking-[0.35em] text-white/80">
            {t("modal_eyebrow")}
          </p>
          <h3 className="relative text-2xl font-black uppercase leading-tight mt-1">
            {t("modal_title")}
          </h3>

          {/* === Seamless mini liquid boundary at the bottom of the header ===
              Mirrors the hero wave style — no drips, no droplets, just smooth
              slow flow that morphs from red into the white form body.        */}
          <div
            className="absolute left-0 right-0 bottom-0 pointer-events-none"
            aria-hidden="true"
            style={{ transform: "translateY(1px)" }}
          >
            <svg
              viewBox="0 0 400 60"
              preserveAspectRatio="none"
              className="block w-full h-[32px]"
            >
              {/* Slower back wave for depth */}
              <path fill="#6a0303" opacity="0.55">
                <animate
                  attributeName="d"
                  dur="14s"
                  repeatCount="indefinite"
                  calcMode="spline"
                  keyTimes="0; 0.25; 0.5; 0.75; 1"
                  keySplines="0.45 0 0.55 1; 0.45 0 0.55 1; 0.45 0 0.55 1; 0.45 0 0.55 1"
                  values="
                    M0,30 C80,18 160,42 240,30 C310,20 360,40 400,30 L400,60 L0,60 Z;
                    M0,28 C80,42 160,18 240,34 C310,44 360,22 400,36 L400,60 L0,60 Z;
                    M0,34 C80,22 160,44 240,28 C310,18 360,40 400,28 L400,60 L0,60 Z;
                    M0,30 C80,40 160,20 240,36 C310,42 360,24 400,34 L400,60 L0,60 Z;
                    M0,30 C80,18 160,42 240,30 C310,20 360,40 400,30 L400,60 L0,60 Z
                  "
                />
              </path>
              {/* Front white wave — becomes the form body */}
              <path fill="#ffffff">
                <animate
                  attributeName="d"
                  dur="11s"
                  repeatCount="indefinite"
                  calcMode="spline"
                  keyTimes="0; 0.25; 0.5; 0.75; 1"
                  keySplines="0.45 0 0.55 1; 0.45 0 0.55 1; 0.45 0 0.55 1; 0.45 0 0.55 1"
                  values="
                    M0,38 C80,24 160,48 240,36 C310,28 360,46 400,36 L400,60 L0,60 Z;
                    M0,34 C80,46 160,26 240,40 C310,48 360,30 400,42 L400,60 L0,60 Z;
                    M0,42 C80,28 160,50 240,32 C310,24 360,46 400,32 L400,60 L0,60 Z;
                    M0,36 C80,48 160,28 240,42 C310,50 360,32 400,44 L400,60 L0,60 Z;
                    M0,38 C80,24 160,48 240,36 C310,28 360,46 400,36 L400,60 L0,60 Z
                  "
                />
              </path>
            </svg>
          </div>
        </div>

        {/* ===== Form (compact, stacked) ===== */}
        <form onSubmit={submit} className="px-6 py-6 space-y-4">
          <Field label={t("field_name")}>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("ph_name")}
              className="premium-input w-full bg-neutral-100 px-5 py-3 text-sm font-medium rounded-full border-2 border-transparent focus:border-[--r] focus:bg-white outline-none transition-all"
              style={{ ["--r" as any]: RED }}
            />
          </Field>
          <Field label={t("field_phone")}>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={t("ph_phone")}
              className="premium-input w-full bg-neutral-100 px-5 py-3 text-sm font-medium rounded-full border-2 border-transparent focus:border-[--r] focus:bg-white outline-none transition-all"
              style={{ ["--r" as any]: RED }}
            />
          </Field>

          <Field label={t("field_msg")}>
            <textarea
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t("ph_msg")}
              className="premium-input w-full bg-neutral-100 px-5 py-3.5 text-sm font-medium rounded-2xl border-2 border-transparent focus:border-[--r] focus:bg-white outline-none transition-all resize-none"
              style={{ ["--r" as any]: RED }}
            />
          </Field>

          <button
            type="submit"
            disabled={sending}
            className="btn-glow w-full inline-flex items-center justify-center gap-3 text-white px-6 py-3.5 text-[12px] font-black uppercase tracking-[0.25em] rounded-full hover:opacity-95 active:scale-[0.98] transition-all disabled:opacity-60"
            style={{
              background: `linear-gradient(135deg, ${RED} 0%, #b00606 100%)`,
              boxShadow:
                "0 12px 36px -10px rgba(225,10,10,0.65), inset 0 1px 0 rgba(255,255,255,0.2)",
            }}
          >
            <Whatsapp className="w-5 h-5" />
            {sending ? t("btn_submitting") : t("btn_submit")}
          </button>
        </form>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-700 mb-2">
        {label}
      </span>
      {children}
    </label>
  );
}

/* =====================================================
   App
   ===================================================== */
export default function App() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const openQuote = () => setQuoteOpen(true);
  const { lang, setLang, t } = useLang();

  return (
    <div className="min-h-screen bg-white text-[--c] font-sans antialiased overflow-x-hidden" style={{ ["--c" as any]: CHARCOAL }}>
      {/* Global keyframes */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes popIn {
          0% { opacity: 0; transform: translateY(20px) scale(.96) }
          100% { opacity: 1; transform: translateY(0) scale(1) }
        }
        @keyframes marqueeX {
          from { transform: translateX(0) }
          to   { transform: translateX(-50%) }
        }
        @keyframes pulseDot {
          0%,100% { transform: scale(1); opacity: 1 }
          50% { transform: scale(1.6); opacity: .4 }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0 }
          100% { background-position: 200% 0 }
        }
        @keyframes floatY {
          0%,100% { transform: translateY(0) }
          50% { transform: translateY(-10px) }
        }
        @keyframes drawIn {
          from { transform: scaleX(0) }
          to   { transform: scaleX(1) }
        }
        /* PREMIUM hero background animations */
        @keyframes meshDrift {
          0%   { background-position: 0% 0%; transform: scale(1.05) }
          50%  { background-position: 100% 50%; transform: scale(1.12) }
          100% { background-position: 0% 100%; transform: scale(1.05) }
        }
        @keyframes orbA {
          0%,100% { transform: translate(-10%, -10%) scale(1); opacity: .55 }
          50%     { transform: translate(20%, 30%) scale(1.4); opacity: .85 }
        }
        @keyframes orbB {
          0%,100% { transform: translate(10%, 10%) scale(1.2); opacity: .35 }
          50%     { transform: translate(-25%, -20%) scale(.9); opacity: .65 }
        }
        @keyframes sweep {
          0%   { transform: translateX(-120%) skewX(-20deg); opacity: 0 }
          50%  { opacity: .35 }
          100% { transform: translateX(220%) skewX(-20deg); opacity: 0 }
        }
        @keyframes slowRotate {
          from { transform: rotate(0deg) }
          to   { transform: rotate(360deg) }
        }
        @keyframes glowPulse {
          0%,100% { box-shadow: 0 10px 30px -8px rgba(225,10,10,0.55), 0 0 0 0 rgba(225,10,10,0.45) }
          50%     { box-shadow: 0 14px 44px -8px rgba(225,10,10,0.85), 0 0 0 6px rgba(225,10,10,0.0) }
        }

        .hover-lift { transition: transform .5s cubic-bezier(.2,.7,.2,1), box-shadow .5s }
        .hover-lift:hover { transform: translateY(-8px) }

        /* Premium button glow */
        .btn-glow {
          box-shadow: 0 10px 30px -8px rgba(225,10,10,0.55), inset 0 1px 0 rgba(255,255,255,0.15);
          transition: box-shadow .35s ease, transform .25s ease, background .25s ease;
        }
        .btn-glow:hover {
          box-shadow: 0 18px 48px -10px rgba(225,10,10,0.85), inset 0 1px 0 rgba(255,255,255,0.25);
          transform: translateY(-2px);
        }
        .btn-glow-dark {
          box-shadow: 0 10px 30px -8px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04);
          transition: box-shadow .35s ease, transform .25s ease, background .25s ease;
        }
        .btn-glow-dark:hover {
          box-shadow: 0 18px 44px -10px rgba(225,10,10,0.55), 0 0 0 1px rgba(225,10,10,0.6);
          transform: translateY(-2px);
        }
        .btn-glow-white {
          box-shadow: 0 10px 30px -8px rgba(255,255,255,0.35), inset 0 1px 0 rgba(255,255,255,0.5);
          transition: box-shadow .35s ease, transform .25s ease;
        }
        .btn-glow-white:hover {
          box-shadow: 0 16px 40px -8px rgba(255,255,255,0.55);
          transform: translateY(-2px);
        }

        /* Premium input glow on focus */
        .premium-input { transition: box-shadow .3s ease, background .3s ease, border-color .3s ease }
        .premium-input:focus {
          box-shadow: 0 0 0 4px rgba(225,10,10,0.18), 0 10px 28px -10px rgba(225,10,10,0.45);
        }
        .premium-input:hover:not(:focus) {
          box-shadow: 0 0 0 2px rgba(225,10,10,0.08);
        }

        /* Premium card shelf */
        .shelf {
          border-radius: 24px;
          box-shadow: 0 1px 0 rgba(255,255,255,0.6) inset, 0 24px 60px -28px rgba(0,0,0,0.25), 0 8px 16px -10px rgba(0,0,0,0.12);
          transition: transform .5s cubic-bezier(.2,.7,.2,1), box-shadow .5s;
        }
        .shelf:hover {
          transform: translateY(-8px);
          box-shadow: 0 30px 70px -28px rgba(225,10,10,0.4), 0 14px 24px -12px rgba(0,0,0,0.18);
        }
        .shelf-dark {
          border-radius: 24px;
          box-shadow: 0 24px 60px -28px rgba(0,0,0,0.7), 0 8px 16px -10px rgba(0,0,0,0.5);
        }
      `}</style>



      {/* ===== Header ===== */}
      <header className="bg-white border-b border-black/5 sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/85">
        <div className="max-w-7xl mx-auto px-5 py-3 flex items-center justify-between gap-6">
          <a href="#" className="flex items-center gap-3 shrink-0 group">
            <img
              src="/images/logo.png"
              alt="Batriku Steel Investments"
              className="h-14 md:h-16 w-auto object-contain transition-transform duration-500 group-hover:scale-[1.03]"
            />
            {/* Bold handwritten lock-up next to the logo mark */}
            <span
              className="hidden sm:inline-block text-2xl md:text-3xl font-bold italic leading-none -ml-1 select-none"
              style={{
                fontFamily:
                  "'Caveat', 'Brush Script MT', 'Segoe Script', cursive",
                color: CHARCOAL,
                transform: "rotate(-3deg)",
                textShadow: `1px 1px 0 rgba(225,10,10,0.15)`,
              }}
            >
              Steel<span style={{ color: RED }}> investments</span>
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-9 text-[13px] font-bold uppercase tracking-[0.18em]">
            {([
              { href: "#about",    key: "nav_about"    },
              { href: "#products", key: "nav_products" },
              { href: "#services", key: "nav_services" },
              { href: "#why-us",   key: "nav_why_us"   },
              { href: "#contact",  key: "nav_contact"  },
            ] as const).map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="relative py-2 hover:text-[--r] transition-colors group"
                style={{ ["--r" as any]: RED }}
              >
                {t(n.key)}
                <span
                  className="absolute left-0 right-0 -bottom-0.5 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                  style={{ background: RED }}
                />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3 md:gap-4">
            <div className="hidden xl:block text-right leading-tight">
              <p className="text-[10px] tracking-[0.3em] text-neutral-500 font-semibold uppercase">
                {t("header_promise")}
              </p>
              <p
                className="text-[13px] md:text-[15px] font-black uppercase tracking-wider"
                style={{ color: CHARCOAL }}
              >
                {t("header_promise_1")}{" "}
                <span style={{ color: RED }}>{t("header_promise_2")}</span>
              </p>
            </div>

            {/* Language switcher (EN / SN) */}
            <LangSwitcher lang={lang} setLang={setLang} />

            <button
              onClick={openQuote}
              className="btn-glow hidden md:inline-flex items-center gap-2 text-white px-5 py-2.5 text-[12px] font-black tracking-[0.18em] uppercase rounded-full active:scale-95"
              style={{ background: `linear-gradient(135deg, ${RED} 0%, #b00606 100%)` }}
            >
              {t("header_free_quote")} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* =====================================================
          HERO — Stacked layout
          - Top: Red section with text content
          - Middle: Animated SVG wave divider (organic, fluid)
          - Bottom: Full-width fence image with trust ribbon
          ===================================================== */}
      <section className="relative bg-white overflow-hidden">
        {/* ===== RED HERO BLOCK (top)
            Background: deep, rich dark red gradient that flows seamlessly
            into the wave below. No light pink/highlight layer — keeps the
            whole top section a single textured "flow" of dark red.        */}
        <div
          className="relative text-white px-6 sm:px-10 lg:px-16 pt-16 pb-28 sm:pb-32 md:pt-20 md:pb-40 lg:pt-24 lg:pb-48 isolate overflow-hidden"
          style={{
            background:
              "linear-gradient(180deg, #8a0404 0%, #a00505 35%, #b00606 70%, #8a0404 100%)",
          }}
        >
          {/* --- Animated background layers (dark red only) --- */}

          {/* Drifting wire-mesh texture — gives the dark red real "fabric" */}
          <div
            className="absolute inset-0 opacity-[0.18] pointer-events-none mix-blend-overlay -z-10"
            style={{
              backgroundImage: "url(/images/mesh-texture.png)",
              backgroundSize: "420px",
              animation: "meshDrift 22s ease-in-out infinite",
            }}
          />

          {/* Deep dark orb — bottom right, adds depth into the wave */}
          <div
            className="absolute -bottom-40 -right-20 w-[600px] h-[600px] rounded-full pointer-events-none -z-10"
            style={{
              background:
                "radial-gradient(circle at center, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 65%)",
              filter: "blur(30px)",
              animation: "orbB 18s ease-in-out infinite",
            }}
          />

          {/* Second dark orb — bottom left for symmetric depth */}
          <div
            className="absolute -bottom-32 -left-20 w-[520px] h-[520px] rounded-full pointer-events-none -z-10"
            style={{
              background:
                "radial-gradient(circle at center, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 70%)",
              filter: "blur(30px)",
              animation: "orbA 16s ease-in-out infinite",
            }}
          />

          {/* Slow rotating conic accent — kept very subtle, dark not pink */}
          <div
            className="absolute -right-60 top-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none -z-10 opacity-15"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0deg, rgba(0,0,0,0.35) 30deg, transparent 60deg, transparent 360deg)",
              animation: "slowRotate 30s linear infinite",
            }}
          />

          {/* Subtle dark vignette at the bottom — primes the eye for the wave flow */}
          <div
            className="absolute inset-x-0 bottom-0 h-48 pointer-events-none -z-10"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.35) 100%)",
            }}
          />

          {/* --- Hero content (centered, max-width) --- */}
          <div className="relative max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <Reveal delay={80}>
                <h1 className="font-black uppercase leading-[0.85] tracking-tight">
                  <span className="block text-[58px] sm:text-[88px] md:text-[110px] lg:text-[128px]">
                    {t("hero_title_1")}
                  </span>
                  <span className="block text-[58px] sm:text-[88px] md:text-[110px] lg:text-[128px]">
                    {t("hero_title_2")}
                  </span>
                </h1>
              </Reveal>
              <Reveal delay={220}>
                <div className="mt-6 flex items-center gap-4">
                  <span
                    className="block h-[3px] w-12 bg-white origin-left"
                    style={{ animation: "drawIn .9s cubic-bezier(.2,.8,.2,1) .4s both" }}
                  />
                  <p className="text-sm sm:text-base font-bold uppercase tracking-[0.32em]">
                    {t("hero_sublabel")}
                  </p>
                </div>
              </Reveal>
              <Reveal delay={340}>
                <p className="mt-7 max-w-xl text-white/90 text-[15px] md:text-base leading-relaxed">
                  {t("hero_desc")}
                </p>
              </Reveal>
              <Reveal delay={440}>
                <div className="mt-9 flex flex-wrap gap-3">
                  <button
                    onClick={openQuote}
                    className="btn-glow-white group inline-flex items-center gap-2 bg-white text-black px-7 py-3.5 text-[12px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-black hover:text-white active:scale-95"
                  >
                    {t("hero_btn_quote")}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                  <a
                    href="#products"
                    className="inline-flex items-center gap-2 border-2 border-white/70 text-white px-7 py-3 text-[12px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-white hover:text-[--r] hover:border-white transition-colors"
                    style={{ ["--r" as any]: RED }}
                  >
                    {t("hero_btn_range")}
                  </a>
                </div>
              </Reveal>
            </div>

          </div>
        </div>

        {/* =========================================================
            SEAMLESS ANIMATED LIQUID BOUNDARY
            =========================================================
            • The boundary IS the animation — no visible seam between
              the hero and the image. The SVG fills its top half with
              the exact hero base color (#8a0404) so the morphing wave
              line is the only thing the eye sees moving.
            • Three softly-blended dark-red wave layers (back/mid/front)
              with very slow, smooth morphing using cubic-bezier easings
              and 6 keyframes per layer for buttery, organic motion.
            • Back layer is gaussian-blurred for parallax depth.
            • A drifting mesh texture inside the leading wave shape lets
              the hero's "steel fabric" flow into the boundary itself.
            • A specular gloss gradient skims the top of the wave for a
              subtle wet/liquid metal sheen — modern, cinematic, real.
            • No drips, no droplets — clean, premium, focused on the wave.
            • Pure SVG/SMIL, GPU-accelerated, responsive via
              preserveAspectRatio="none".
            ========================================================= */}
        <div className="relative">
          <div
            className="absolute left-0 right-0 top-0 z-20 pointer-events-none select-none"
            aria-hidden="true"
            /* slight upward overlap kills any sub-pixel gap with the hero */
            style={{ transform: "translateY(-2px)" }}
          >
            <svg
              viewBox="0 0 1440 320"
              preserveAspectRatio="none"
              className="block w-full h-[160px] sm:h-[200px] md:h-[250px] lg:h-[290px]"
            >
              <defs>
                {/* ── Gradients ─────────────────────────────────────── */}
                {/* Top of every wave matches the HERO's bottom color
                   (#8a0404) — that's why no boundary line is visible. */}
                <linearGradient id="liquidBack" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8a0404" />
                  <stop offset="100%" stopColor="#6a0303" />
                </linearGradient>
                <linearGradient id="liquidMid" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8a0404" />
                  <stop offset="100%" stopColor="#9b0505" />
                </linearGradient>
                <linearGradient id="liquidFront" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8a0404" />
                  <stop offset="60%" stopColor="#a80606" />
                  <stop offset="100%" stopColor="#c00808" />
                </linearGradient>

                {/* Specular sheen — a subtle white-to-transparent band
                   that gives the surface a "wet" look without dominating. */}
                <linearGradient id="liquidGloss" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
                  <stop offset="40%" stopColor="rgba(255,255,255,0.04)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                </linearGradient>

                {/* ── Filters ──────────────────────────────────────── */}
                {/* Soft blur for the back layer → cinematic depth. */}
                <filter id="liquidBlur" x="-2%" y="-2%" width="104%" height="108%">
                  <feGaussianBlur stdDeviation="3" />
                </filter>

                {/* Gentle drop shadow under the leading edge. */}
                <filter id="liquidShadow" x="-5%" y="0%" width="110%" height="140%">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="10" />
                  <feOffset dx="0" dy="10" />
                  <feComponentTransfer>
                    <feFuncA type="linear" slope="0.35" />
                  </feComponentTransfer>
                  <feMerge>
                    <feMergeNode />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* ── Mesh pattern that drifts inside the leading wave ── */}
                <pattern
                  id="liquidMesh"
                  patternUnits="userSpaceOnUse"
                  width="180"
                  height="180"
                >
                  <image href="/images/mesh-texture.png" x="0" y="0" width="180" height="180" />
                </pattern>

                {/* Clip = the front wave silhouette */}
                <clipPath id="liquidClip">
                  <path>
                    <animate
                      attributeName="d"
                      dur="18s"
                      repeatCount="indefinite"
                      calcMode="spline"
                      keyTimes="0; 0.2; 0.4; 0.6; 0.8; 1"
                      keySplines="0.45 0 0.55 1; 0.45 0 0.55 1; 0.45 0 0.55 1; 0.45 0 0.55 1; 0.45 0 0.55 1"
                      values="
                        M0,180 C180,140 360,220 540,180 C720,140 900,220 1080,180 C1260,140 1380,210 1440,180 L1440,0 L0,0 Z;
                        M0,170 C180,210 360,150 540,200 C720,230 900,160 1080,210 C1260,180 1380,150 1440,200 L1440,0 L0,0 Z;
                        M0,200 C180,160 360,230 540,170 C720,130 900,220 1080,160 C1260,130 1380,200 1440,170 L1440,0 L0,0 Z;
                        M0,180 C180,220 360,140 540,210 C720,240 900,170 1080,220 C1260,190 1380,160 1440,210 L1440,0 L0,0 Z;
                        M0,190 C180,150 360,220 540,170 C720,140 900,210 1080,170 C1260,140 1380,200 1440,180 L1440,0 L0,0 Z;
                        M0,180 C180,140 360,220 540,180 C720,140 900,220 1080,180 C1260,140 1380,210 1440,180 L1440,0 L0,0 Z
                      "
                    />
                  </path>
                </clipPath>
              </defs>

              {/* ═══════════════════════════════════════════════════════
                  BACK WAVE — softly blurred, slowest (24s)
                  Sits deepest, creates atmosphere & depth.
                ═══════════════════════════════════════════════════════ */}
              <path fill="url(#liquidBack)" filter="url(#liquidBlur)" opacity="0.85">
                <animate
                  attributeName="d"
                  dur="24s"
                  repeatCount="indefinite"
                  calcMode="spline"
                  keyTimes="0; 0.2; 0.4; 0.6; 0.8; 1"
                  keySplines="0.45 0 0.55 1; 0.45 0 0.55 1; 0.45 0 0.55 1; 0.45 0 0.55 1; 0.45 0 0.55 1"
                  values="
                    M0,150 C240,110 480,200 720,160 C960,120 1200,210 1440,170 L1440,0 L0,0 Z;
                    M0,170 C240,210 480,140 720,190 C960,220 1200,150 1440,200 L1440,0 L0,0 Z;
                    M0,160 C240,120 480,200 720,150 C960,110 1200,200 1440,160 L1440,0 L0,0 Z;
                    M0,180 C240,220 480,140 720,200 C960,230 1200,150 1440,210 L1440,0 L0,0 Z;
                    M0,150 C240,190 480,130 720,180 C960,210 1200,140 1440,190 L1440,0 L0,0 Z;
                    M0,150 C240,110 480,200 720,160 C960,120 1200,210 1440,170 L1440,0 L0,0 Z
                  "
                />
              </path>

              {/* ═══════════════════════════════════════════════════════
                  MID WAVE — medium speed (20s)
                  Fills tonal depth between back and front.
                ═══════════════════════════════════════════════════════ */}
              <path fill="url(#liquidMid)" opacity="0.92">
                <animate
                  attributeName="d"
                  dur="20s"
                  repeatCount="indefinite"
                  calcMode="spline"
                  keyTimes="0; 0.2; 0.4; 0.6; 0.8; 1"
                  keySplines="0.45 0 0.55 1; 0.45 0 0.55 1; 0.45 0 0.55 1; 0.45 0 0.55 1; 0.45 0 0.55 1"
                  values="
                    M0,170 C200,130 420,210 620,170 C820,130 1040,220 1260,180 C1360,160 1410,180 1440,170 L1440,0 L0,0 Z;
                    M0,160 C200,200 420,140 620,200 C820,230 1040,160 1260,210 C1360,190 1410,160 1440,200 L1440,0 L0,0 Z;
                    M0,190 C200,150 420,220 620,160 C820,120 1040,210 1260,150 C1360,130 1410,190 1440,160 L1440,0 L0,0 Z;
                    M0,170 C200,210 420,130 620,200 C820,230 1040,160 1260,210 C1360,200 1410,170 1440,200 L1440,0 L0,0 Z;
                    M0,180 C200,140 420,210 620,160 C820,130 1040,200 1260,160 C1360,140 1410,200 1440,170 L1440,0 L0,0 Z;
                    M0,170 C200,130 420,210 620,170 C820,130 1040,220 1260,180 C1360,160 1410,180 1440,170 L1440,0 L0,0 Z
                  "
                />
              </path>

              {/* ═══════════════════════════════════════════════════════
                  FRONT WAVE — leading edge, soft shadow below it (18s)
                  Synced with the clip path so the mesh inside matches.
                ═══════════════════════════════════════════════════════ */}
              <path fill="url(#liquidFront)" filter="url(#liquidShadow)">
                <animate
                  attributeName="d"
                  dur="18s"
                  repeatCount="indefinite"
                  calcMode="spline"
                  keyTimes="0; 0.2; 0.4; 0.6; 0.8; 1"
                  keySplines="0.45 0 0.55 1; 0.45 0 0.55 1; 0.45 0 0.55 1; 0.45 0 0.55 1; 0.45 0 0.55 1"
                  values="
                    M0,180 C180,140 360,220 540,180 C720,140 900,220 1080,180 C1260,140 1380,210 1440,180 L1440,0 L0,0 Z;
                    M0,170 C180,210 360,150 540,200 C720,230 900,160 1080,210 C1260,180 1380,150 1440,200 L1440,0 L0,0 Z;
                    M0,200 C180,160 360,230 540,170 C720,130 900,220 1080,160 C1260,130 1380,200 1440,170 L1440,0 L0,0 Z;
                    M0,180 C180,220 360,140 540,210 C720,240 900,170 1080,220 C1260,190 1380,160 1440,210 L1440,0 L0,0 Z;
                    M0,190 C180,150 360,220 540,170 C720,140 900,210 1080,170 C1260,140 1380,200 1440,180 L1440,0 L0,0 Z;
                    M0,180 C180,140 360,220 540,180 C720,140 900,220 1080,180 C1260,140 1380,210 1440,180 L1440,0 L0,0 Z
                  "
                />
              </path>

              {/* ═══════════════════════════════════════════════════════
                  Mesh texture clipped INSIDE the front wave silhouette.
                  Drifts slowly to feel like real flowing fabric.
                ═══════════════════════════════════════════════════════ */}
              <g clipPath="url(#liquidClip)" opacity="0.18" style={{ mixBlendMode: "overlay" }}>
                <rect x="-200" y="-100" width="2000" height="600" fill="url(#liquidMesh)">
                  <animateTransform
                    attributeName="transform"
                    type="translate"
                    values="0,0; -180,30; -90,-20; 0,0"
                    keyTimes="0;0.33;0.66;1"
                    dur="22s"
                    repeatCount="indefinite"
                    calcMode="spline"
                    keySplines="0.45 0 0.55 1; 0.45 0 0.55 1; 0.45 0 0.55 1"
                  />
                </rect>
              </g>

              {/* ═══════════════════════════════════════════════════════
                  Specular gloss — a thin white-to-transparent band
                  clipped to the leading wave, gives a wet metallic sheen.
                ═══════════════════════════════════════════════════════ */}
              <g clipPath="url(#liquidClip)">
                <rect x="0" y="0" width="1440" height="320" fill="url(#liquidGloss)" />
              </g>
            </svg>
          </div>

          {/* ===== FENCE IMAGE BANNER (bottom of hero) ===== */}
          <div className="relative w-full overflow-hidden group">
            <img
              src="/images/hero-fence.png"
              alt="Galvanized wire mesh fence in a green field"
              className="block w-full h-[420px] sm:h-[500px] md:h-[600px] lg:h-[680px] object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.04]"
            />



            {/* TRUST RIBBON OVERLAY — bottom of image */}
            <div
              className="absolute left-0 right-0 bottom-0 text-white px-5 sm:px-10 py-5 flex items-center gap-4 sm:gap-5 z-10"
              style={{ background: "rgba(17,19,21,0.94)" }}
            >
              <ShieldCheck className="w-10 h-10 sm:w-12 sm:h-12 shrink-0" />
              <p className="text-[11px] sm:text-[13px] font-bold uppercase tracking-[0.22em] leading-snug">
                <span className="hidden sm:inline">{t("trust_full")}</span>
                <span className="sm:hidden">
                  {t("trust_lead")} {t("trust_short")}
                </span>
              </p>
              <span
                className="hidden md:inline-flex ml-auto px-3 py-1.5 text-[10px] font-black tracking-[0.25em] rounded-full"
                style={{
                  background: RED,
                  boxShadow: "0 8px 20px -6px rgba(225,10,10,0.6)",
                }}
              >
                ★ ★ ★ ★ ★
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Marquee strip ===== */}
      <section className="bg-black text-white overflow-hidden border-y border-white/5">
        <div
          className="flex whitespace-nowrap py-4"
          style={{ animation: "marqueeX 32s linear infinite" }}
        >
          {Array.from({ length: 2 }).map((_, dup) => (
            <div key={dup} className="flex items-center shrink-0">
              {([
                "m_barbed", "m_razor", "m_plain", "m_game", "m_corner",
                "m_bolts", "m_steel", "m_washing", "m_install", "m_selling",
                "m_supply", "m_strong",
              ] as const).map((k) => (
                <span key={`${dup}-${k}`} className="flex items-center">
                  <span className="px-8 text-sm font-black uppercase tracking-[0.3em]">
                    {t(k)}
                  </span>
                  <span className="text-[10px]" style={{ color: RED }}>◆</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ===== Trust stats ===== */}
      <section className="bg-white border-b border-black/5">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-black/10">
          {([
            { n: "stat_1_n", l: "stat_1_l" },
            { n: "stat_2_n", l: "stat_2_l" },
            { n: "stat_3_n", l: "stat_3_l" },
            { n: "stat_4_n", l: "stat_4_l" },
          ] as const).map((s, i) => (
            <Reveal key={s.l} delay={i * 80}>
              <div className="px-6 py-7 text-center">
                <p className="text-3xl md:text-4xl font-black" style={{ color: RED }}>
                  {t(s.n)}
                </p>
                <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.22em] text-neutral-600">
                  {t(s.l)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== About Section ===== */}
      <section id="about" className="relative bg-white py-20 md:py-28 overflow-hidden">
        <div
          className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full opacity-[0.04] pointer-events-none"
          style={{ background: RED }}
        />
        <div className="max-w-7xl mx-auto px-5 grid lg:grid-cols-12 gap-12 items-center relative">
          <Reveal className="lg:col-span-5">
            <div>
              <p
                className="text-[11px] font-bold uppercase tracking-[0.35em] mb-3"
                style={{ color: RED }}
              >
                {t("about_eyebrow")}
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-[0.95]">
                {t("about_h_1")}{" "}
                <span style={{ color: RED }}>{t("about_h_2")}</span>
              </h2>
              <div
                className="mt-6 h-1 w-16 origin-left"
                style={{
                  background: RED,
                  animation: "drawIn .9s cubic-bezier(.2,.8,.2,1) .3s both",
                }}
              />
            </div>
          </Reveal>

          <Reveal delay={150} className="lg:col-span-7">
            <div>
              <p className="text-lg md:text-xl text-neutral-700 leading-relaxed font-medium">
                <span className="font-black uppercase" style={{ color: CHARCOAL }}>
                  {t("about_body_lead")}
                </span>
                {t("about_body")}{" "}
                <span className="font-bold">{t("about_word_manufacture")}</span>,{" "}
                <span className="font-bold">{t("about_word_install")}</span>,{" "}
                <span className="font-bold">{t("about_word_washing")}</span>,{" "}
                <span className="font-bold">{t("about_word_steel")}</span>.
              </p>

              <div className="mt-8 grid sm:grid-cols-2 gap-3">
                {([
                  "about_chip_1",
                  "about_chip_2",
                  "about_chip_3",
                  "about_chip_4",
                ] as const).map((k, i) => (
                  <Reveal key={k} delay={i * 80} y={10}>
                    <div className="flex items-center gap-3 p-4 pl-5 bg-neutral-50 rounded-full border-l-4 hover:bg-white transition-all" style={{ borderColor: RED, boxShadow: "0 6px 18px -10px rgba(0,0,0,0.15)" }}>
                      <span
                        className="w-7 h-7 flex items-center justify-center text-white text-xs font-black shrink-0"
                        style={{ background: CHARCOAL }}
                      >
                        ✓
                      </span>
                      <span className="font-black uppercase tracking-wider text-sm">
                        {t(k)}
                      </span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== Product Showcase Grid ===== */}
      <section id="products" className="bg-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <Reveal>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.35em] mb-3" style={{ color: RED }}>
                  {t("prod_eyebrow")}
                </p>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-[0.95]">
                  {t("prod_h_1")} <br />
                  <span style={{ color: RED }}>{t("prod_h_2")}</span>
                </h2>
              </div>
            </Reveal>
            <Reveal delay={140}>
              <p className="md:max-w-sm text-neutral-600 text-[15px] leading-relaxed">
                {t("prod_desc")}
              </p>
            </Reveal>
          </div>

          {/* GRID — full service catalogue */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {([
              { src: "https://images.pexels.com/photos/33690960/pexels-photo-33690960.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200", titleKey: "prod_t_diamond",  tagKey: "prod_tag_1" },
              { src: "/images/game-farm.png",                                                                                                  titleKey: "prod_t_game",     tagKey: "prod_tag_2" },
              { src: "/images/barbed-wire.png",                                                                                                titleKey: "prod_t_barbed",   tagKey: "prod_tag_3" },
              { src: "https://images.pexels.com/photos/11654004/pexels-photo-11654004.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200", titleKey: "prod_t_razor",    tagKey: "prod_tag_4" },
              { src: "https://images.pexels.com/photos/15059762/pexels-photo-15059762.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200", titleKey: "prod_t_plain",    tagKey: "prod_tag_5" },
              { src: "/images/hero-fence.png",                                                                                                 titleKey: "prod_t_gamewire", tagKey: "prod_tag_6" },
              { src: "/images/metal-gate.png",                                                                                                 titleKey: "prod_t_gates",    tagKey: "prod_tag_7" },
              { src: "/images/red-post.png",                                                                                                   titleKey: "prod_t_corner",   tagKey: "prod_tag_8" },
              { src: "/images/wooden-poles.png",                                                                                               titleKey: "prod_t_wooden",   tagKey: "prod_tag_9" },
              { src: "https://images.pexels.com/photos/17372998/pexels-photo-17372998.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200", titleKey: "prod_t_bolts",    tagKey: "prod_tag_10" },
              { src: "https://images.pexels.com/photos/36791513/pexels-photo-36791513.png?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",  titleKey: "prod_t_washing",  tagKey: "prod_tag_11" },
              { src: "https://images.pexels.com/photos/36617431/pexels-photo-36617431.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200", titleKey: "prod_t_install",  tagKey: "prod_tag_12" },
            ] as const).map((p, i) => (
              <ProductCard
                key={p.titleKey}
                src={p.src}
                title={t(p.titleKey)}
                tag={t(p.tagKey)}
                delay={(i % 4) * 90}
                className="h-56 sm:h-60 md:h-64"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== Services with mesh bg (NO location pin) ===== */}
      <section
        id="services"
        className="relative text-white overflow-hidden"
        style={{
          backgroundColor: "#1a1c1f",
          backgroundImage: `linear-gradient(rgba(10,11,12,0.78), rgba(10,11,12,0.88)), url(/images/mesh-texture.png)`,
          backgroundSize: "auto, 520px",
          backgroundRepeat: "repeat",
        }}
      >
        <div className="max-w-7xl mx-auto px-5 py-24 md:py-32 relative">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto">
              <p className="text-[11px] font-bold uppercase tracking-[0.4em] mb-4" style={{ color: RED }}>
                {t("serv_eyebrow")}
              </p>
              <h2 className="text-5xl md:text-7xl font-black uppercase leading-none">
                {t("serv_title")}
              </h2>
              <div
                className="mx-auto mt-6 h-1 w-20 origin-center"
                style={{ background: RED, animation: "drawIn .9s cubic-bezier(.2,.8,.2,1) .2s both" }}
              />
              <p className="mt-6 text-white/70 text-[15px] leading-relaxed">
                {t("serv_desc")}
              </p>
            </div>
          </Reveal>

          {/* Two columns — center divider only (no location pin) */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-10 items-stretch max-w-5xl mx-auto">
            <ServiceList
              items={[t("serv_1"), t("serv_2"), t("serv_3"), t("serv_4"), t("serv_5")]}
              align="right"
            />

            <div className="hidden md:flex flex-col items-center justify-center">
              <span className="w-px flex-1 bg-white/15" />
              <span
                className="w-3 h-3 rotate-45 my-3"
                style={{ background: RED }}
              />
              <span className="w-px flex-1 bg-white/15" />
            </div>

            <ServiceList
              items={[t("serv_6"), t("serv_7"), t("serv_8"), t("serv_9"), t("serv_10")]}
              align="left"
            />
          </div>

          <Reveal delay={200}>
            <div className="mt-20 flex flex-wrap gap-3 justify-center">
              {([
                "serv_badge_1", "serv_badge_2", "serv_badge_3", "serv_badge_4",
              ] as const).map((k) => (
                <span
                  key={k}
                  className="inline-flex items-center gap-2 border border-white/20 px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-[0.22em] text-white/85 hover:border-[--r] hover:text-white hover:bg-white/5 transition-all"
                  style={{ ["--r" as any]: RED }}
                >
                  <Hammer className="w-3.5 h-3.5" /> {t(k)}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

      </section>

      {/* ===== Mission & Vision ===== */}
      <section id="mission-vision" className="bg-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-5">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <p
                className="text-[11px] font-bold uppercase tracking-[0.4em] mb-3"
                style={{ color: RED }}
              >
                {t("mv_eyebrow")}
              </p>
              <h2 className="text-4xl md:text-6xl font-black uppercase leading-[0.95]">
                {t("mv_title")}
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {/* Mission */}
            <Reveal delay={100}>
              <div
                className="shelf-dark group relative h-full p-8 md:p-10 hover-lift overflow-hidden"
                style={{ background: CHARCOAL, color: "white" }}
              >
                <div
                  className="absolute inset-0 opacity-[0.08] pointer-events-none transition-opacity group-hover:opacity-[0.16]"
                  style={{
                    backgroundImage: "url(/images/mesh-texture.png)",
                    backgroundSize: "240px",
                    animation: "meshDrift 28s ease-in-out infinite",
                  }}
                />
                <div className="relative">
                  <div className="flex items-center gap-4 mb-6">
                    <span
                      className="btn-glow inline-flex items-center justify-center w-14 h-14 text-white rounded-2xl"
                      style={{ background: RED }}
                    >
                      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
                        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                        <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
                        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-white/60">
                        {t("mv_m_label")}
                      </p>
                      <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight">
                        {t("mv_m_title")}
                      </h3>
                    </div>
                  </div>
                  <p className="text-white/85 text-lg leading-relaxed">
                    {t("mv_m_body_a")}{" "}
                    <span className="font-black text-white">
                      {t("mv_m_body_b")}
                    </span>
                    {t("mv_m_body_c")}
                  </p>
                  <div
                    className="mt-8 h-1 w-12"
                    style={{ background: RED }}
                  />
                </div>
              </div>
            </Reveal>

            {/* Vision */}
            <Reveal delay={220}>
              <div
                className="shelf-dark group relative h-full p-8 md:p-10 hover-lift overflow-hidden text-white"
                style={{
                  background: `linear-gradient(135deg, ${RED} 0%, #b00606 100%)`,
                  boxShadow: "0 30px 70px -20px rgba(225,10,10,0.55), 0 8px 16px -10px rgba(0,0,0,0.3)",
                }}
              >
                <div
                  className="absolute inset-0 opacity-15 pointer-events-none"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(135deg, rgba(0,0,0,0.4) 0 2px, transparent 2px 18px)",
                  }}
                />
                <div
                  className="absolute -top-20 -right-20 w-72 h-72 rounded-full pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 70%)",
                    animation: "orbB 16s ease-in-out infinite",
                  }}
                />
                <div className="relative">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="btn-glow-dark inline-flex items-center justify-center w-14 h-14 bg-black text-white rounded-2xl">
                      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
                        <path
                          d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-white/80">
                        {t("mv_v_label")}
                      </p>
                      <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight">
                        {t("mv_v_title")}
                      </h3>
                    </div>
                  </div>
                  <p className="text-white/95 text-lg leading-relaxed">
                    {t("mv_v_body_a")}{" "}
                    <span className="font-black">
                      {t("mv_v_body_b")}
                    </span>
                    {t("mv_v_body_c")}
                  </p>
                  <div className="mt-8 h-1 w-12 bg-black" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== Why Batriku ===== */}
      <section id="why-us" className="bg-white py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <Reveal>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.35em] mb-3" style={{ color: RED }}>
                  {t("why_eyebrow")}
                </p>
                <h3 className="text-4xl md:text-5xl font-black uppercase leading-[0.95]">
                  {t("why_h_1")} <br /> {t("why_h_2")}
                </h3>
                <p className="mt-5 text-neutral-600 text-[15px] leading-relaxed max-w-lg">
                  {t("why_desc")}
                </p>

                <ul className="mt-8 space-y-4">
                  {([
                    { tKey: "why_li_1_t", dKey: "why_li_1_d" },
                    { tKey: "why_li_2_t", dKey: "why_li_2_d" },
                    { tKey: "why_li_3_t", dKey: "why_li_3_d" },
                  ] as const).map((item, i) => (
                    <Reveal key={item.tKey} delay={i * 100} y={14}>
                      <li className="flex gap-4">
                        <span
                          className="mt-1 w-6 h-6 flex items-center justify-center text-white text-xs font-black shrink-0"
                          style={{ background: RED }}
                        >
                          ✓
                        </span>
                        <div>
                          <p className="font-black uppercase tracking-wider text-sm">{t(item.tKey)}</p>
                          <p className="text-neutral-600 text-sm">{t(item.dKey)}</p>
                        </div>
                      </li>
                    </Reveal>
                  ))}
                </ul>

                <div className="mt-8">
                  <button
                    onClick={openQuote}
                    className="btn-glow inline-flex items-center gap-2 text-white px-7 py-3.5 text-[12px] font-black uppercase tracking-[0.2em] rounded-full active:scale-95"
                    style={{ background: `linear-gradient(135deg, ${RED} 0%, #b00606 100%)` }}
                  >
                    {t("why_btn")} <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div className="relative">
                <img
                  src="/images/game-farm.png"
                  alt="Game farm fence"
                  className="shelf w-full h-[360px] md:h-[480px] object-cover"
                />
                <div
                  className="shelf-dark absolute -bottom-6 -left-6 text-white p-6 max-w-xs hidden md:block rounded-3xl"
                  style={{ background: CHARCOAL }}
                >
                  <p className="text-[10px] tracking-[0.3em] font-bold uppercase text-white/60">
                    {t("why_card_label")}
                  </p>
                  <p className="mt-2 font-bold leading-snug">
                    {t("why_card_text")}
                  </p>
                  <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-white/70">
                    {t("why_card_attr")}
                  </p>
                </div>
                <div
                  className="absolute -top-5 -right-5 w-24 h-24 rounded-full flex flex-col items-center justify-center text-white text-center"
                  style={{
                    background: `linear-gradient(135deg, ${RED} 0%, #b00606 100%)`,
                    boxShadow:
                      "0 18px 40px -10px rgba(225,10,10,0.7), inset 0 1px 0 rgba(255,255,255,0.25)",
                    animation: "floatY 5s ease-in-out infinite",
                  }}
                >
                  <span className="text-2xl font-black leading-none">{t("why_badge_top")}</span>
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] mt-1">
                    {t("why_badge_bot")}
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== Contact / Footer ===== */}
      <footer id="contact" className="grid md:grid-cols-2">
        {/* LEFT — Location */}
        <div className="bg-white px-8 md:px-14 py-14 flex items-center">
          <Reveal>
            <div className="flex items-start gap-6">
              {/* Black square PNG-style icon with white pin */}
              <div
                className="btn-glow-dark w-20 h-20 rounded-3xl flex items-center justify-center shrink-0"
                style={{ background: CHARCOAL }}
              >
                <LocationPin className="w-9 h-11" color="#ffffff" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-neutral-500">
                  {t("ft_find")}
                </p>
                <p
                  className="text-5xl md:text-6xl font-black uppercase leading-none mt-1"
                  style={{ color: CHARCOAL }}
                >
                  {t("ft_city")}
                </p>
                <p className="mt-3 text-[13px] font-semibold text-neutral-700 leading-relaxed max-w-sm">
                  {t("ft_addr_1")}
                  <br />
                  {t("ft_addr_2_a")}
                  <span className="font-black">{t("ft_addr_2_b")}</span>
                  {t("ft_addr_2_c")}
                </p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Corner+Crippes+Road+and+Harare+Road+North+Harare"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 text-[11px] font-black uppercase tracking-[0.25em] hover:text-[--r] transition-colors"
                  style={{ ["--r" as any]: RED }}
                >
                  <MapMarker className="w-4 h-4" /> {t("ft_directions")}
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        {/* RIGHT — Connect (real info only) */}
        <div className="text-white px-8 md:px-14 py-14" style={{ background: CHARCOAL }}>
          <Reveal delay={100}>
            <div className="flex flex-col h-full justify-between gap-8">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.35em] mb-3" style={{ color: RED }}>
                  {t("ft_eyebrow")}
                </p>
                <p className="text-3xl md:text-4xl font-black uppercase leading-tight">
                  {t("ft_h")}
                </p>
                <p className="mt-3 text-white/70 text-sm max-w-md">
                  {t("ft_sub")}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-4 pr-6 rounded-2xl border border-white/10 hover:border-[--r] hover:bg-white/5 transition-all hover:-translate-y-1"
                  style={{ ["--r" as any]: RED }}
                >
                  <span
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-white"
                    style={{
                      background: "#25D366",
                      boxShadow: "0 8px 24px -8px rgba(37,211,102,0.6)",
                    }}
                  >
                    <Whatsapp className="w-6 h-6" />
                  </span>
                  <div className="leading-tight">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/60">
                      {t("ft_whatsapp")}
                    </p>
                    <p className="font-black uppercase tracking-wider">
                      {PHONE_DISPLAY}
                    </p>
                  </div>
                </a>

                <a
                  href={`tel:${PHONE_TEL}`}
                  className="group flex items-center gap-4 p-4 pr-6 rounded-2xl border border-white/10 hover:border-[--r] hover:bg-white/5 transition-all hover:-translate-y-1"
                  style={{ ["--r" as any]: RED }}
                >
                  <span
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-white"
                    style={{
                      background: RED,
                      boxShadow: `0 8px 24px -8px rgba(225,10,10,0.7)`,
                    }}
                  >
                    <Phone className="w-6 h-6" />
                  </span>
                  <div className="leading-tight">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/60">
                      Call
                    </p>
                    <p className="font-black uppercase tracking-wider">
                      {PHONE_DISPLAY}
                    </p>
                  </div>
                </a>
              </div>

              <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <a
                  href="mailto:batriku@gmail.com"
                  className="text-[13px] md:text-[15px] font-bold uppercase tracking-[0.22em] hover:text-[--r] transition-colors"
                  style={{ ["--r" as any]: RED }}
                >
                  Email Us: batriku@gmail.com
                </a>
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                  © {new Date().getFullYear()} Batriku Steel Investments
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </footer>

      {/* ===== Floating WhatsApp button ===== */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-5 right-5 z-50 w-16 h-16 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
        style={{
          background: "#25D366",
          boxShadow:
            "0 16px 40px -10px rgba(37,211,102,0.7), 0 0 0 4px rgba(37,211,102,0.15)",
          animation: "floatY 3.5s ease-in-out infinite",
        }}
      >
        <Whatsapp className="w-7 h-7 relative z-10" />
        <span
          className="absolute inset-0 rounded-full"
          style={{ animation: "pulseDot 2s ease-in-out infinite", background: "rgba(37,211,102,0.45)" }}
        />
      </a>

      {/* ===== Quote Modal ===== */}
      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} t={t} />
    </div>
  );
}

/* =====================================================
   Subcomponents
   ===================================================== */

function ProductCard({
  src,
  title,
  tag,
  className = "",
  delay = 0,
}: {
  src: string;
  title: string;
  tag: string;
  className?: string;
  delay?: number;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`shelf group relative overflow-hidden bg-neutral-100 ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 700ms cubic-bezier(.2,.7,.2,1) ${delay}ms, transform 700ms cubic-bezier(.2,.7,.2,1) ${delay}ms, box-shadow .5s`,
      }}
    >
      <img
        src={src}
        alt={title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
      />
      <div
        className="absolute inset-0 opacity-80 transition-opacity duration-500 group-hover:opacity-95"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 35%, rgba(0,0,0,0.9) 100%)",
        }}
      />
      {/* red shimmer ring on hover */}
      <div
        className="absolute inset-0 rounded-[24px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ boxShadow: `inset 0 0 0 2px ${RED}` }}
      />
      <div className="absolute top-4 left-4">
        <span className="inline-block bg-white/95 backdrop-blur text-black px-3 py-1 text-[10px] font-black uppercase tracking-[0.25em] rounded-full">
          {tag}
        </span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-5 text-white flex items-end justify-between gap-3">
        <h3 className="text-lg md:text-xl font-black uppercase tracking-wider leading-tight">
          {title}
        </h3>
        <span
          className="btn-glow w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-transform group-hover:translate-x-1 group-hover:rotate-[-8deg]"
          style={{ background: RED }}
        >
          <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </div>
  );
}

function ServiceList({
  items,
  align,
}: {
  items: string[];
  align: "left" | "right";
}) {
  return (
    <ul
      className={`flex flex-col gap-5 ${
        align === "right" ? "md:items-end md:text-right" : "md:items-start md:text-left"
      }`}
    >
      {items.map((it, i) => (
        <Reveal key={it} delay={i * 90} y={14}>
          <li
            className="group flex items-center gap-4 w-full md:w-auto"
            style={{ flexDirection: align === "right" ? "row-reverse" : "row" }}
          >
            <span className="text-[10px] font-black tracking-[0.3em] text-white/40 w-6">
              0{i + 1}
            </span>
            <span
              className="block w-8 h-px bg-white/30 group-hover:bg-[--r] group-hover:w-14 transition-all duration-300"
              style={{ ["--r" as any]: RED }}
            />
            <span
              className="text-2xl md:text-3xl font-black uppercase tracking-wider text-white group-hover:text-[--r] transition-colors"
              style={{ ["--r" as any]: RED }}
            >
              {it}
            </span>
          </li>
        </Reveal>
      ))}
    </ul>
  );
}
