"use client";

import { motion } from "framer-motion";

export const WHATSAPP_BTN =
  "wa-btn wa-ripple inline-flex h-11 min-h-11 max-h-11 w-[10.25rem] max-w-full shrink-0 items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 text-sm font-semibold leading-none text-white shadow-lg shadow-emerald-500/35 transition hover:bg-[#20bd5a] hover:shadow-[0_0_28px_rgba(37,211,102,0.55)]";

export function WhatsAppGlyph({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden className="shrink-0">
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.45 0 .07 5.37.07 11.98c0 2.11.55 4.17 1.6 6L0 24l6.17-1.62a12 12 0 0 0 5.88 1.5h.01c6.6 0 11.98-5.38 11.98-11.99 0-3.2-1.25-6.21-3.52-8.41ZM12.06 21.85h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.66.96.98-3.57-.24-.37a9.86 9.86 0 0 1-1.51-5.3c0-5.44 4.43-9.87 9.88-9.87 2.64 0 5.12 1.03 6.98 2.9a9.82 9.82 0 0 1 2.89 6.98c0 5.44-4.44 9.86-9.92 9.86Zm5.42-7.39c-.3-.15-1.76-.87-2.03-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.04-.17-.3-.02-.46.13-.6.13-.13.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.5s1.07 2.9 1.22 3.1c.15.2 2.11 3.22 5.11 4.51.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z" />
    </svg>
  );
}

export function WhatsAppButton({
  href,
  children,
  className = "",
  ariaLabel,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      dir="ltr"
      aria-label={ariaLabel}
      whileHover={{ scale: 1.04, y: -1 }}
      whileTap={{ scale: 0.97 }}
      className={`${WHATSAPP_BTN} ${className}`}
    >
      <span className="wa-btn-ping" aria-hidden />
      <WhatsAppGlyph />
      <span className="truncate">{children}</span>
    </motion.a>
  );
}
