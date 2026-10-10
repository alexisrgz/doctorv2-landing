import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { ImageIcon, type LucideIcon } from "lucide-react";
import type { PhotoRatio, PhotoShape } from "@/lib/photo-types";

const EXTENSIONS = [".jpg", ".jpeg", ".webp", ".png", ".avif"] as const;
const IMAGES_DIR = path.join(process.cwd(), "public", "images");
const resolved = new Map<string, string | null>();

/** Busca public/images/{name}.{ext}. Devuelve la URL pública o null si no existe. */
function resolvePhotoSrc(name: string): string | null {
  const cached = resolved.get(name);
  if (cached !== undefined) return cached;
  const ext = EXTENSIONS.find((extension) => fs.existsSync(path.join(IMAGES_DIR, `${name}${extension}`)));
  const src = ext ? `/images/${name}${ext}` : null;
  resolved.set(name, src);
  return src;
}

const RATIO_CLASS: Record<PhotoRatio, string> = {
  "4:3": "aspect-[4/3]",
  "4:5": "aspect-[4/5]",
  "3:2": "aspect-[3/2]",
  "1:1": "aspect-square",
  "16:9": "aspect-video",
};

const SHAPE_CLASS: Record<PhotoShape, string> = {
  signature: "rounded-signature",
  soft: "rounded-soft",
};

export type PhotoProps = {
  /** Nombre del archivo en public/images, sin extensión. */
  name: string;
  alt: string;
  shape: PhotoShape;
  ratio: PhotoRatio;
  /** Imagen LCP: se precarga. */
  priority?: boolean;
  sizes?: string;
  /** object-position, por ejemplo "50% 30%". */
  focal?: string;
  className?: string;
  /** Color del placeholder: "mist" (Bruma) por defecto; "sand" (Arena) cuando la foto va sobre Bruma. */
  tone?: "mist" | "sand";
  /** Ícono discreto del placeholder. */
  icon?: LucideIcon;
};

export function Photo({
  name,
  alt,
  shape,
  ratio,
  priority = false,
  sizes = "100vw",
  focal = "50% 50%",
  className = "",
  tone = "mist",
  icon: Icon = ImageIcon,
}: PhotoProps) {
  const src = resolvePhotoSrc(name);
  const frame = `relative isolate overflow-hidden ${SHAPE_CLASS[shape]} ${RATIO_CLASS[ratio]} ${className}`;

  if (!src) {
    return (
      <div
        data-shape={shape}
        data-photo={name}
        data-placeholder="true"
        role="img"
        aria-label={alt}
        className={`${frame} grid place-items-center ${tone === "sand" ? "bg-sand" : "bg-mist"}`}
      >
        <Icon aria-hidden="true" strokeWidth={1.5} className="size-7 text-slate/45" />
      </div>
    );
  }

  return (
    <div data-shape={shape} data-photo={name} className={`${frame} bg-mist`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        preload={priority}
        className="object-cover"
        style={{ objectPosition: focal }}
      />
    </div>
  );
}
