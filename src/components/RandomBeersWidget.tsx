"use client";
import { styled, theme } from "@/styles/config";
import { useRandomBeerQuery } from "@/use-cases/useRandomBeerQuery";
import Image from "next/image";
import { useState } from "react";
import { nanoid } from "nanoid";
import Link from "next/link";
import { ROUTES } from "@/utils/routes";
import {
  leftSlideAnimation,
  rightSlideAnimation,
  twinkleAnimation,
} from "@/styles/animations";
import getBeerImageSrc from "@/domain/beersUtils";

export const RandomBeersWidget = () => {
  return (
    <RandomBeersWidgetContainer>
      <RandomBeerCard />
      <RandomBeerCard />
    </RandomBeersWidgetContainer>
  );
};

const RandomBeersWidgetContainer = styled("aside", {
  "--beer-card-min-width": "20em",
  "--beer-card-min-height": "12em",
  "--beer-card-border-radius": theme.radius.sm,
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: theme.spaces.md,
});

export const RandomBeerCard = () => {
  const [randomBeerID] = useState(nanoid);
  const {
    data: beer,
    isLoading,
    isError,
  } = useRandomBeerQuery(randomBeerID, { refetchInterval: 10000 });

  if (isLoading) return null;
  if (isError) return null;

  return (
    <BeerCard key={beer.id}>
      <Link href={ROUTES.BEER_DETAILS(beer.id)}>
        <Image alt={beer.name} src={getBeerImageSrc(beer)} fill sizes="2em" />
        <h2>{beer.name}</h2>
        <time>{beer.first_brewed}</time>
      </Link>
    </BeerCard>
  );
};

const BeerCard = styled("article", {
  overflow: "hidden",
  "&:hover": {
    transform: "scale(1.05)",
  },

  "@media (prefers-reduced-motion: no-preference)": {
    "&:nth-of-type(odd) a": {
      animation: `${rightSlideAnimation} 0.4s ease-out`,
    },
    "&:nth-of-type(even) a": {
      animation: `${leftSlideAnimation} 0.4s ease-out`,
    },
  },

  a: {
    height: "100%",
    display: "grid",
    gridTemplateAreas: `'image title'
                        'image first_brewed'`,
    gridTemplateColumns: "2em 1fr",
    placeItems: "center",
    width: "var(--beer-card-min-width)",
    minHeight: "var(--beer-card-min-height)",
    border: `2px solid ${theme.colors.identity500}`,
    borderRadius: "var(--beer-card-border-radius)",
    padding: theme.spaces.sm,
    gap: theme.spaces.sm,
    position: "relative",
    textDecoration: "none",
    transition: "transform 0.1s ease-in-out",

    "&:hover": {
      background: theme.colors.neutral100,
    },
  },

  "h2, time": {
    color: theme.colors.identity500,
  },

  img: {
    gridArea: "image",
    placeSelf: "center",
    objectFit: "contain",
  },

  h2: {
    gridArea: "title",
    justifySelf: "start",
    alignSelf: "end",
  },

  time: {
    gridArea: "first_brewed",
    placeSelf: "start",
  },
});

const BeerCardSkeleton = styled("div", {
  width: "var(--beer-card-min-width)",
  height: "var(--beer-card-min-height)",
  borderRadius: "var(--beer-card-border-radius)",
  background: theme.colors.neutral400,

  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${twinkleAnimation} 1s linear infinite alternate`,
  },
});
