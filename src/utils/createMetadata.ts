import { Metadata } from "next";

export interface CreateMetadataParams {
  title: string;
  description: string;
  type: "website" | "article";
  images?: string[];
}

export const createMetadata = ({
  type,
  title,
  description,
  images,
}: CreateMetadataParams): Metadata => {
  const titleWithSiteName = `${title} - Beer App`;
  const openGraphImages = images?.map((image) => ({ url: image }));

  return {
    title: titleWithSiteName,
    description,
    openGraph: {
      type,
      title: titleWithSiteName,
      description,
      locale: "en",
      images: openGraphImages,
    },
    twitter: {
      card: "summary_large_image",
      title: titleWithSiteName,
      description,
      images,
    },
  };
};
