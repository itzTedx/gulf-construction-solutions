import { Metadata } from "next";
import { notFound } from "next/navigation";

import { Card } from "@/components/global/card";
import Header from "@/components/global/header";
import Breadcrumb from "@/features/products/components/breadcrumb";
import {
  getCategories,
  getServiceCategoryBySlug,
  getServicesByCategory,
} from "@/sanity/lib/fetch";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: query } = await params;

  const category = await getServiceCategoryBySlug(query);
  const categoryName = category?.category || "";
  const description = category?.description || "";

  return {
    title: `${categoryName} Services - GCS`,
    description: description,
    keywords: `${categoryName.toLowerCase()} services, construction services, GCS, bahrain construction}`,
    openGraph: {
      title: `${categoryName} Services - GCS`,
      description: description,
      type: "website",
      locale: "en_US",
      siteName: "GCS",
    },
    twitter: {
      card: "summary_large_image",
      title: `${categoryName} Services - GCS`,
      description: description,
    },
    alternates: {
      canonical: `https://gcs.sa/services/${query}`,
    },
  };
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({
    category: category.slug?.current,
  }));
}

export default async function ServicesByCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: query } = await params;

  const services = await getServicesByCategory(query);
  const category = await getServiceCategoryBySlug(query);

  if (!services || services.length === 0) return notFound();

  const text = {
    title: "Get the best services at",
    subtext: "Gulf Construction Solutions W.L.L",
  };

  // Create JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${category?.category} Services`,
    description: category?.description,
    itemListElement: services.map((service, index) => ({
      "@type": "Service",
      position: index + 1,
      name: service.servicesTitle,
      url: `https://gcs.sa/services/${query}/${service.servicesSlug?.current}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <Header text={text} />
        <section className="container grid gap-4 pb-12 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
          <Breadcrumb
            segments={[
              { title: "Services", href: "/services" },
              {
                title: category?.category ?? "",
              },
            ]}
          />
          <div className="sm:col-span-2 md:col-span-3">
            <h1 className="text-4xl font-medium text-sky-600">
              {category?.category} Services
            </h1>
            <p className="text-muted-foreground text-lg font-light">
              {category?.description}
            </p>
          </div>
          {services.map((service) => (
            <Card
              className="aspect-video"
              title={service.servicesTitle}
              image={service.thumbnail}
              key={service._id}
              link={`/services/${query}/${service.servicesSlug?.current}`}
              priority={true}
            />
          ))}
        </section>
      </main>
    </>
  );
}
