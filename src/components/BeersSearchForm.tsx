"use client";

import { Beer } from "@/domain/beersRepository";
import { twinkleAnimation } from "@/styles/animations";
import { styled, theme } from "@/styles/config";
import { useBeersQuery } from "@/use-cases/useBeersQuery";
import { ROUTES } from "@/utils/routes";
import Link from "next/link";
import { ChangeEventHandler, useState } from "react";
import { useDebounce } from "use-debounce";
import { Button } from "./Button";

const SEARCH_DEBOUNCE_TIME_MS = 500;
const SEARCH_INPUT_ID = "beers-search-input";

export const BeersSearchForm = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debounceSearchTerm] = useDebounce(searchTerm, SEARCH_DEBOUNCE_TIME_MS);

  return (
    <BeersSearchFormContainer>
      <SearchBar id={SEARCH_INPUT_ID} onSearch={setSearchTerm} />
      <output htmlFor={SEARCH_INPUT_ID}>
        <BeerList searchTerms={debounceSearchTerm} />
      </output>
    </BeersSearchFormContainer>
  );
};
const BeersSearchFormContainer = styled("form", {
  width: "100%",
});

interface BeerListProps {
  searchTerms: string;
}
export const BeerList = ({ searchTerms }: BeerListProps) => {
  const {
    data: beers,
    isLoading,
    isError,
    refetch,
  } = useBeersQuery({ per_page: "10", beer_name: searchTerms });

  if (isLoading)
    return (
      <BeerListContainer aria-busy="true" data-testid="loading-state">
        <BeerListItemSkeleton />
        <BeerListItemSkeleton />
        <BeerListItemSkeleton />
      </BeerListContainer>
    );
  if (isError)
    return (
      <Button type="button" data-testid="error-state" onClick={() => refetch()}>
        Retry
      </Button>
    );

  return (
    <BeerListContainer data-testid="search-results">
      {beers.map((beer) => (
        <BeerListItem key={beer.id} {...beer} />
      ))}
    </BeerListContainer>
  );
};

type BeerListItemProps = Pick<Beer, "id" | "name" | "first_brewed">;
const BeerListItem = ({ id, name, first_brewed }: BeerListItemProps) => {
  return (
    <li>
      <Link href={ROUTES.BEER_DETAILS(id)}>
        <p>{name}</p>
        <time>{first_brewed}</time>
      </Link>
    </li>
  );
};
const BeerListItemSkeleton = styled("li", {
  height: "var(--beer-list-item-min-height)",
  borderRadius: "var(--beer-list-item-border-radius)",
  background: theme.colors.neutral400,

  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${twinkleAnimation} 1s linear infinite alternate`,
  },
});
const BeerListContainer = styled("ul", {
  "--beer-list-item-min-height": "2.5em",
  "--beer-list-item-border-radius": theme.radius.sm,
  display: "flex",
  flexFlow: "column",
  listStyle: "none",
  width: "100%",
  gap: theme.spaces.xs,

  "li a": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: "var(--beer-list-item-border-radius)",
    padding: theme.spaces.sm,
    transition: "transform 0.1s ease-in-out",
    textDecoration: "none",
    minHeight: "var(--beer-list-item-min-height)",

    p: {
      fontSize: theme.fontSizes.md,
      fontWeight: "semibold",
    },

    "&:hover": {
      transform: "scale(1.02)",
      backgroundColor: theme.colors.neutral100,
    },

    time: {
      fontSize: theme.fontSizes.sm,
    },
  },
});

export interface SearchBarProps {
  id: string;
  onSearch: (searchTerms: string) => void;
}
const SearchBar = ({ id, onSearch }: SearchBarProps) => {
  const handleSearch: ChangeEventHandler<HTMLInputElement> = (event) => {
    onSearch(event.target.value);
  };

  return (
    <SearchBarContainer aria-label="search" role="search">
      <MagnifySVG />
      <input
        id={id}
        type="search"
        placeholder="pilsen lager ..."
        autoComplete="off"
        spellCheck="false"
        onChange={handleSearch}
      />
    </SearchBarContainer>
  );
};
const SearchBarContainer = styled("label", {
  display: "grid",
  gridTemplateColumns: "auto 1fr",
  alignItems: "center",
  gap: theme.spaces.xs,
  padding: theme.spaces.sm,
  border: `1px solid ${theme.colors.identity500}`,
  borderRadius: theme.radius.sm,

  "&:has(input:focus-visible)": {
    outline: `2px solid ${theme.colors.identity500}`,
  },

  input: {
    color: theme.colors.identity500,
    border: "none",
    flexGrow: 1,
    fontSize: theme.fontSizes.md,
    width: "100%",
  },
  "input:focus": {
    outline: "none",
  },
});
const MagnifySVG = () => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="#5F6368"
    >
      <title>Search</title>
      <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
    </svg>
  );
};
