"use client";

import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider, useI18n } from "@/components/LanguageProvider";
import { PageLoader } from "@/components/PageLoader";
import { FloatingActions } from "@/components/FloatingActions";
import { MouseGlow } from "@/components/MouseGlow";

function SkipLink() {
  const { t } = useI18n();
  return (
    <a className="skip-link" href="#contenu">
      {t.skip}
    </a>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <SkipLink />
        <PageLoader />
        <MouseGlow />
        <div className="relative z-10">{children}</div>
        <FloatingActions />
      </LanguageProvider>
    </ThemeProvider>
  );
}
