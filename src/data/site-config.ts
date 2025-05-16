export const siteConfig = {
  name: "Gulf Construction Solutions W.L.L - Bahrain",
  shortName: "Gulf Construction Solutions W.L.L",
  description:
    "AGCS is a Bahrain based Civil and Mechanical contracting company handling various prestigious projects and ranked as a leading General Trading company",
  url: "https://www.gulfconst.me",
  logo: "/favicon.svg",
  ogImage: "/og-img.jpg",

  contact: ["+973 1779 1317", "+973 3818 4631", "+973 3468 5656"],
  authors: [{ name: "Gulf Construction Solutions W.L.L" }],
  creator: "Tojo Alex",
  publisher: "Gulf Construction Solutions W.L.L",
};

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: [
    "gulf construction solutions",
    "agcs",
    "materials",
    "bcr uk",
    "bahrain",
    "middle east",
    "leading",
    "trading",
    "specialty",
    "construction company bahrain",
    "civil contractors bahrain",
    "mechanical contractors",
  ],
  authors: siteConfig.authors,
  creator: siteConfig.creator,
  publisher: siteConfig.publisher,
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.shortName,
    images: [
      {
        url: `${siteConfig.url}${siteConfig.ogImage}`,
        width: 1200,
        height: 630,
        alt: siteConfig.shortName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}${siteConfig.ogImage}`],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};
