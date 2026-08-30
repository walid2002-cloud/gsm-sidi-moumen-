import Image from "next/image";
import { PHOTOS } from "@/lib/constants";

type BrandLogoProps = {
  size?: number;
  className?: string;
  priority?: boolean;
};

export function BrandLogo({ size = 32, className = "", priority = false }: BrandLogoProps) {
  return (
    <Image
      src={PHOTOS.logo}
      alt="Logo GSM Sidi Moumen"
      width={size}
      height={size}
      priority={priority}
      className={`rounded-full object-cover shadow-sm ${className}`}
    />
  );
}
