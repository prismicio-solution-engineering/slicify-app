"use client";

import { cva, cx } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import SVG from "react-inlinesvg";
import { ImageField } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";

const iconStyles = cva("", {
  variants: {
    size: {
      sm: "w-8 h-8",
      md: "w-12 h-12",
      lg: "w-16 h-16",
      auto: "w-auto",
    },
    color: {
      dark: "text-gray-darker",
      light: "text-light-gray",
      white: "text-white",
      blue: "text-vibrant-blue",
      lightBlue: "text-light-blue",
    },
  },
  defaultVariants: {
    size: "auto",
    color: "white",
  },
});

export type IconProps = {
  className?: string;
  src: string;
  size?: VariantProps<typeof iconStyles>["size"];
  color?: VariantProps<typeof iconStyles>["color"];
  fallback?: ImageField;
};

/**
 * Icon
 * @param {string} className Additional class names
 * @param {string} src Path to SVG
 * @param {string} size Size of icon
 * @param {string} color Color of icon
 * @param {ImageField} fallback Fallback image
 * @returns {JSX.Element} Icon component
 * @example
 * <Icon src="/assets/svg/icon.svg" size="lg" color="purple" />
 */

export const Icon = ({ className, src, size, color, fallback }: IconProps) => {
  const processSVG = (code: string) => {
    return code
      .replace(/fill=".*?"/g, 'fill="currentColor"')
      .replace(/style=".*?"/g, (style) =>
        style.includes("fill:") ? style.replace(/fill:.*?;/g, "") : style
      );
  };

  return (
    <SVG
      className={cx(iconStyles({ size, color }), className)}
      src={src}
      preProcessor={processSVG}
      onError={(error) => console.log("ICON ERROR", error.message)}
    >
      {fallback && (
        <div className={cx(iconStyles({ size, color }), className)}>
          <PrismicNextImage
            className={cx(
              "z-10 relative",
              iconStyles({ size, color }),
              className
            )}
            field={fallback}
            fallbackAlt=""
          />
        </div>
      )}
    </SVG>
  );
};
