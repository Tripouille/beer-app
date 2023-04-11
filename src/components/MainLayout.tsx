"use client";
import { styled, theme } from "@/styles/config";
import { ROUTES } from "@/utils/routes";
import Link from "next/link";
import { PropsWithChildren } from "react";

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <MainLayoutContainer>
      <header>
        <h1>
          <Link href={ROUTES.HOME()}>Beer App 🍺</Link>
        </h1>
      </header>
      {children}
    </MainLayoutContainer>
  );
};

const MainLayoutContainer = styled("main", {
  "--main-layout-max-width": "50em",
  display: "flex",
  flexFlow: "column",
  alignItems: "center",
  gap: theme.spaces.md,
  maxWidth: "var(--main-layout-max-width)",
  margin: "auto",

  "*": {
    boxSizing: "border-box",
    color: theme.colors.neutral700,
  },

  "p, h1, h2, h3, h4, h5": {
    margin: 0,
  },

  ul: {
    padding: 0,
  },

  header: {
    h1: {
      color: theme.colors.identity700,
    },
  },

  "input[type='search']::-webkit-search-decoration": {
    "-webkit-appearance": "none",
  },
});
