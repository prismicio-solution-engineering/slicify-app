import type { Content } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { Container } from "@/components/Container";
import { ThemeContainer } from "@/components/Theme";

export default function LogoCloudGrid({
  slice,
}: {
  slice: Content.LogoCloudSliceThreeColumns;
}) {
  const themeColor =
    slice.primary.theme === "Blue" || slice.primary.theme === "Dark"
      ? "dark"
      : "light";

  return (
    <section id={slice.primary.anchor || undefined}>
      <ThemeContainer theme={slice.primary.theme}>
        <Container className="pb-16 pt-20 text-center lg:pt-32">
          <PrismicRichText
            field={slice.primary.title}
            components={{
              paragraph: ({ children }) => (
                <p
                  className={`font-display text-xl ${
                    themeColor === "dark" ? "text-white" : "text-dark-gray"
                  }`}
                >
                  {children}
                </p>
              ),
            }}
          />
          <div
            role="list"
            className="mt-8 flex items-center justify-center gap-x-8 sm:flex-col sm:gap-x-0 sm:gap-y-10 xl:flex-row xl:gap-x-12 xl:gap-y-0"
          >
            <ul className="grid grid-cols-1 gap-y-8 overflow-hidden sm:mx-0 sm:grid-cols-2 md:grid-cols-3 sm:gap-x-20 sm:gap-y-8">
              {slice.primary.logos?.map((company, idx) => (
                <li key={idx} className="object-cover h-70">
                  <PrismicNextImage
                    field={company.logo}
                    width={200}
                    unoptimized
                  />
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </ThemeContainer>
    </section>
  );
}
