import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Confirmation de réservation",
  description: "Votre demande de semaine gratuite a bien été transmise à GSM Sidi Moumen.",
};

export default function ConfirmationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
