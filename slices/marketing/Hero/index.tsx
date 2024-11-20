import type { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicRichText } from "@prismicio/react";
import Image from "next/image";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { UnderlineDoodle } from "@/components/UnderlineDoodle";
import bgBlue from "@/images/background-blue.jpg";
import bgLight from "@/images/background-light.jpg";

export type HeroProps = SliceComponentProps<Content.HeroSlice>;

const BackgroundImage = ({
  theme,
}: {
  theme: "Blue" | "Dark" | "Light" | "White";
}) => {
  if (theme === "Blue") {
    return (
      <Image
        className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
        src={bgBlue}
        alt=""
        width={2245}
        height={1636}
        unoptimized
      />
    );
  }
  if (theme === "Light") {
    return (
      <Image
        className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
        src={bgLight}
        alt=""
        width={2245}
        height={1636}
        unoptimized
      />
    );
  }
};
export default function Hero({ slice }: HeroProps) {
  const theme = slice.primary.theme;

  const themeColor = theme === "Blue" || theme === "Dark" ? "dark" : "light";

  return (
    <section id={slice.primary.anchor || undefined}>
      <div
        className={`relative isolate overflow-hidden ${
          themeColor === "dark" ? "bg-dark-blue" : "bg-white"
        }`}
      >
        {(theme === "Blue" || theme === "Light") && (
          <BackgroundImage theme={theme} />
        )}
        <Container className="pb-16 pt-20 text-center lg:pt-32">
          <PrismicRichText
            field={slice.primary.title}
            components={{
              heading1: ({ children }) => (
                <h1
                  className={`mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight ${
                    themeColor === "dark" ? "text-white" : "text-slate-900"
                  } sm:text-7xl`}
                >
                  {children}
                </h1>
              ),
              strong: ({ children }) => {
                return (
                  <>
                    <span
                      className={`relative whitespace-nowrap ${
                        themeColor === "dark"
                          ? "text-white"
                          : "text-vibrant-blue"
                      }`}
                    >
                      <UnderlineDoodle
                        className={`absolute left-0 top-2/3 h-[0.58em] w-full ${
                          themeColor === "dark"
                            ? "fill-white"
                            : "fill-blue-300/70"
                        }`}
                      />
                      <span className="relative">{children}</span>
                    </span>
                  </>
                );
              },
            }}
          />
          {slice.variation === "default" && (
            <>
              <PrismicRichText
                field={slice.primary.description}
                components={{
                  paragraph: ({ children }) => (
                    <p
                      className={`mx-auto mt-6 max-w-2xl text-lg tracking-tight ${
                        themeColor === "dark" ? "text-white" : "text-slate-700"
                      }`}
                    >
                      {children}
                    </p>
                  ),
                }}
              />
              <div className="mt-10 flex justify-center gap-x-6">
                {slice.primary.buttons?.map((item, idx) => {
                  return item.cta_type === "Primary" ? (
                    <Button
                      key={idx}
                      field={item.cta_link}
                      variant="solid"
                      color={`${themeColor === "dark" ? "white" : "slate"}`}
                    >
                      {item.cta_label}
                    </Button>
                  ) : item.cta_type === "Secondary" ? (
                    <Button key={idx} field={item.cta_link} variant="outline">
                      <svg
                        aria-hidden="true"
                        className={`h-3 w-3 flex-none ${
                          themeColor === "dark"
                            ? "fill-light-blue"
                            : "fill-dark-blue"
                        } group-active:fill-current`}
                      >
                        <path d="m9.997 6.91-7.583 3.447A1 1 0 0 1 1 9.447V2.553a1 1 0 0 1 1.414-.91L9.997 5.09c.782.355.782 1.465 0 1.82Z" />
                      </svg>
                      <span
                        className={`ml-3 ${
                          themeColor === "dark" && "text-white"
                        }`}
                      >
                        {item.cta_label}
                      </span>
                    </Button>
                  ) : (
                    <Button
                      key={idx}
                      field={item.cta_link}
                      variant="link"
                      color={`${themeColor === "dark" ? "white" : "slate"}`}
                    >
                      <span
                        className={`${themeColor === "dark" && "text-white"}`}
                      >
                        {item.cta_label}
                      </span>
                    </Button>
                  );
                })}
              </div>
            </>
          )}
        </Container>
      </div>
    </section>
  );
}
