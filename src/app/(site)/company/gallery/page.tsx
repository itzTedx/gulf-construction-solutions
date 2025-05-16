import { Metadata } from "next";
import { Suspense } from "react";

import GalleryGrid from "@/features/gallery/GalleryGrid";
import { getGalleries } from "@/sanity/lib/fetch";

export const metadata: Metadata = {
  title: "Project Gallery |  Gulf Construction Services",
  description:
    "Browse through our comprehensive collection of construction projects, successful team achievements, and innovative solutions at Gulf Construction Solutions. View our portfolio showcasing excellence in construction.",
  keywords: [
    "construction portfolio",
    "project gallery",
    "construction projects",
    "AGCS projects",
    "building portfolio",
    "construction achievements",
    "Allied Gulf gallery",
  ],
  openGraph: {
    title: "Project Gallery | Gulf Construction Solutions",
    description:
      "Explore our portfolio of successful construction projects and team achievements at Gulf Construction Solutions",
    type: "website",
    locale: "en_US",
    siteName: "Gulf Construction Solutions",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.agcs.com/gallery",
  },
};

// JSON-LD structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Project Gallery",
  description:
    "Browse through our comprehensive collection of construction projects and achievements",
  publisher: {
    "@type": "Organization",
    name: "Gulf Construction Solutions",
  },
};

export default async function GalleryPage() {
  const galleries = await getGalleries();

  return (
    <main className="container py-4 md:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="md:py-9">
        <h1 className="text-center text-4xl md:text-6xl" id="gallery-title">
          Our Gallery
        </h1>
        <p className="text-muted-foreground text-center text-lg font-light md:mt-2 md:text-xl">
          Discover our extensive portfolio of successful construction projects
          and innovative solutions
        </p>
      </header>

      <section aria-labelledby="gallery-title">
        <Suspense
          fallback={
            <div aria-label="Loading gallery content">Loading gallery...</div>
          }
        >
          <GalleryGrid galleries={galleries} />
        </Suspense>
      </section>
    </main>
  );
}
