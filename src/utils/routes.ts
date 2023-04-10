import { BeerID } from "@/domain/beersRepository";

export const ROUTES = {
  HOME: () => "/",
  BEER_DETAILS: (id: BeerID) => `/beers/${id}`,
};
