import { BeerDetails } from "@/components/BeerDetails";
import { beerIDSchema, realBeersRepository } from "@/domain/beersRepository";
import { createMetadata } from "@/utils/createMetadata";
import { notFound } from "next/navigation";
import Script from "next/script";
import { Article, WithContext } from "schema-dts";

interface BeerDetailsPageProps {
  params: {
    beerID: string;
  };
}

export async function generateMetadata({ params }: BeerDetailsPageProps) {
  try {
    const beerID = beerIDSchema.parse(+params.beerID);
    const beer = await realBeersRepository.getBeer(beerID);

    return createMetadata({
      type: "article",
      title: beer.name,
      description: beer.description,
      images: beer.image_url ? [beer.image_url] : [],
    });
  } catch {
    return {};
  }
}

export default async function BeerDetailsPage({
  params,
}: BeerDetailsPageProps) {
  const beerID = beerIDSchema.safeParse(+params.beerID);
  if (!beerID.success) notFound();
  const beer = await realBeersRepository.getBeer(beerID.data).catch(notFound);
  const jsonLD: WithContext<Article> = {
    "@context": "https://schema.org",
    "@type": "Article",
    name: beer.name,
    description: beer.description,
    image: beer.image_url ? [beer.image_url] : [],
  };

  return (
    <>
      <Script
        id="beer-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
      />
      <BeerDetails beerID={beerID.data} />
    </>
  );
}
