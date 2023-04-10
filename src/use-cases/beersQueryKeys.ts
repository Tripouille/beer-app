/* More about this approach here:
   https://tkdodo.eu/blog/effective-react-query-keys#use-query-key-factories **/

import { BeerID } from "@/domain/beersRepository";

export const beersQueryKeys = {
  all: ["beers"] as const,
  randoms: () => [...beersQueryKeys.all, "random"] as const,
  random: (randomID: string) =>
    [...beersQueryKeys.randoms(), randomID] as const,
  lists: () => [...beersQueryKeys.all, "list"] as const,
  list: (filters: object) => [...beersQueryKeys.lists(), filters] as const,
  details: () => [...beersQueryKeys.all, "detail"] as const,
  detail: (id: BeerID) => [...beersQueryKeys.details(), id] as const,
};
