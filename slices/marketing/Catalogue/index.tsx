"use client";
import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { ThemeContainer } from "@/components/Theme";
import { UnderlineDoodle } from "@/components/UnderlineDoodle";
import { Container } from "@/components/Container";

export type Product = {
  sku: number;
  name: string;
  price: string;
  image_url: string;
  website_link: string;
};

/**
 * Props for `Catalogue`.
 */
export type CatalogueProps = SliceComponentProps<Content.CatalogueSlice>;

/**
 * Component for "Catalogue" Slices.
 */
const Catalogue: FC<CatalogueProps> = ({ slice }) => {
  const themeColor =
    slice.primary.theme === "Blue" || slice.primary.theme === "Dark"
      ? "dark"
      : "light";

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      id={slice.primary.anchor || undefined}
    >
      <ThemeContainer
        theme={slice.primary.theme}
        className="py-16 sm:px-16 md:py-24 lg:py-24"
      >
        <div className="bg-white">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
            <div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
              <PrismicRichText
                field={slice.primary.title}
                components={{
                  heading2: ({ children }) => (
                    <h2
                      className={`text-3xl text-center font-display leading-10 tracking-tight ${
                        themeColor === "dark" ? "text-white" : "text-dark-gray"
                      }`}
                    >
                      {children}
                    </h2>
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
              <PrismicRichText
                field={slice.primary.description}
                components={{
                  paragraph: ({ children }) => (
                    <p
                      className={`mt-4 text-lg tracking-tight ${
                        themeColor === "dark"
                          ? "text-light-gray"
                          : "text-light-black"
                      }`}
                    >
                      {children}
                    </p>
                  ),
                }}
              />
            </div>
          </div>
        </div>

        {isFilled.integrationField(slice.primary.products[0]) ? (
          <Container className="px-10">
            <div className="mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-0 lg:gap-x-8">
              {slice.primary.products.map((product: any) => (
                <div key={product.product.sku} className="group relative">
                  <img
                    alt={product.product.name}
                    src={product.product.image_url}
                    className="h-96 w-full rounded-lg object-cover group-hover:opacity-75 sm:aspect-[2/3] sm:h-auto"
                  />
                  <h3 className="mt-4 text-base font-semibold text-gray-900">
                    <a href={product.product.website_link}>
                      <span className="absolute inset-0" />
                      {product.product.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {product.product.price}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        ) : (
          <p
            className={`py-16 px-10 text-center ${
              themeColor === "dark" ? "text-light-gray" : "text-light-black"
            }`}
          >
            No product to display
          </p>
        )}
      </ThemeContainer>
    </section>
  );
};

export default Catalogue;
