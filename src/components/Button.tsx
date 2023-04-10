"use client";
import { styled, theme } from "@/styles/config";

export const Button = styled("button", {
  padding: `${theme.spaces.sm} ${theme.spaces.md}`,
  background: "white",
  border: `2px solid ${theme.colors.identity500}`,
  borderRadius: theme.radius.sm,
  color: theme.colors.identity500,
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: theme.fontSizes.sm,
});
