import { useState, type HTMLAttributes, type ImgHTMLAttributes, type ReactNode } from "react"
import { isIconName, WIcon, type IconName } from "../icons"
import type { Color, Size } from "../types"
import { cx } from "../utils/cx"
import { subtle } from "../utils/variants"

const sizes: Record<Size, { root: string; icon: string }> = {
  xs: { root: "size-6 text-xs", icon: "size-3" },
  sm: { root: "size-7 text-sm", icon: "size-3.5" },
  md: { root: "size-8 text-sm", icon: "size-4" },
  lg: { root: "size-9 text-base", icon: "size-5" },
  xl: { root: "size-10 text-lg", icon: "size-5" },
}

type IconProp = IconName | ReactNode

function initials(alt?: string) {
  if (!alt) return ""
  return alt
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

function renderIcon(icon: IconProp, className: string) {
  if (isIconName(icon)) return <WIcon name={icon} className={className} />
  return (
    <span className={cx("inline-flex shrink-0 items-center justify-center [&_svg]:size-full", className)}>
      {icon}
    </span>
  )
}

type ImgRest = Pick<
  ImgHTMLAttributes<HTMLImageElement>,
  | "loading"
  | "decoding"
  | "referrerPolicy"
  | "crossOrigin"
  | "srcSet"
  | "sizes"
  | "width"
  | "height"
  | "onLoad"
  | "onError"
>

export interface WAvatarProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, "color" | "onError" | "onLoad">,
    ImgRest {
  src?: string
  alt?: string
  text?: string
  icon?: IconProp
  size?: Size
  color?: Color
  class?: string
  ui?: { root?: string; image?: string; fallback?: string; icon?: string }
  children?: ReactNode
}

export function WAvatar({
  src,
  alt,
  text,
  icon,
  size = "md",
  color = "neutral",
  loading,
  decoding,
  referrerPolicy,
  crossOrigin,
  srcSet,
  sizes: imgSizes,
  width,
  height,
  onLoad,
  onError,
  ui,
  class: classAlias,
  className,
  children,
  ...props
}: WAvatarProps) {
  const [failedSrc, setFailedSrc] = useState<string>()
  const showImage = Boolean(src) && src !== failedSrc
  const fallback = children ?? text ?? initials(alt)

  return (
    <span
      {...props}
      className={cx(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full align-middle font-medium select-none",
        sizes[size].root,
        subtle[color],
        ui?.root,
        className,
        classAlias,
      )}
      role={!showImage && alt ? "img" : undefined}
      aria-label={!showImage ? alt : undefined}
    >
      {showImage ? (
        <img
          src={src}
          alt={alt}
          loading={loading}
          decoding={decoding}
          referrerPolicy={referrerPolicy}
          crossOrigin={crossOrigin}
          srcSet={srcSet}
          sizes={imgSizes}
          width={width}
          height={height}
          onLoad={onLoad}
          className={cx("size-full object-cover", ui?.image)}
          onError={(event) => {
            setFailedSrc(src)
            onError?.(event)
          }}
        />
      ) : icon != null && icon !== false ? (
        renderIcon(icon, cx("shrink-0", sizes[size].icon, ui?.icon))
      ) : (
        <span className={cx("truncate px-0.5", ui?.fallback)}>{fallback || null}</span>
      )}
    </span>
  )
}
