"use client";
import { BeerID } from "@/domain/beersRepository";
import { useBeerQuery } from "@/use-cases/useBeerQuery";
import { Button } from "./Button";
import { BREAKPOINT, styled, theme } from "@/styles/config";
import Image from "next/image";
import getBeerImageSrc from "@/domain/beersUtils";
import { twinkleAnimation } from "@/styles/animations";

export interface BeerDetailsProps {
  beerID: BeerID;
}

export const BeerDetails = ({ beerID }: BeerDetailsProps) => {
  const { data: beer, isLoading, isError, refetch } = useBeerQuery(beerID);

  if (isLoading)
    return (
      <BeerDetailsContainer>
        <BeerDetailsSkeleton aria-busy="true" data-testid="loading-state" />
      </BeerDetailsContainer>
    );
  if (isError)
    return (
      <Button onClick={() => refetch()} data-testid="error-state">
        Retry
      </Button>
    );

  return (
    <BeerDetailsContainer>
      <h2>{beer.name}</h2>
      <Image
        alt="beer"
        src={getBeerImageSrc(beer)}
        fill
        sizes={`${BREAKPOINT.sm} 20vw, 100vw`}
      />
      <p>{beer.description}</p>
    </BeerDetailsContainer>
  );
};

const BeerDetailsContainer = styled("article", {
  "--beer-details-container-min-height": "15em",
  display: "grid",
  gridTemplateColumns: "1fr 4fr",
  gridTemplateRows: "auto 200px 1fr",
  placeItems: "center",
  gridTemplateAreas: `'title title'
                      'image image'
                      'description description'`,
  position: "relative",
  gap: theme.spaces.sm,
  minHeight: "var(--beer-details-container-min-height)",
  width: "100%",

  [`@media ${BREAKPOINT.sm}`]: {
    gridTemplateAreas: `'title title'
                        'image description'
                        'image description'`,
  },

  h2: {
    gridArea: "title",
    textAlign: "center",
  },

  img: {
    gridArea: "image",
    objectFit: "contain",
    minHeight: "100px",
  },

  p: {
    gridArea: "description",
    color: theme.colors.identity500,
  },
});

const BeerDetailsSkeleton = styled("div", {
  height: "var(--beer-details-container-min-height)",
  width: "100%",
  backgroundColor: theme.colors.neutral400,
  gridArea: "1 / 1 / 3 / 3",

  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${twinkleAnimation} 1s linear infinite alternate`,
  },
});
