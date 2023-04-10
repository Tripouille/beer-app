import { useAppRepositories } from "@/providers/AppRepositoriesProvider";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { beersQueryKeys } from "./beersQueryKeys";
import { Beer, BeerID } from "@/domain/beersRepository";

export const useBeerQuery = (
  beerID: BeerID,
  options?: UseQueryOptions<Beer>
) => {
  const { beersRepository } = useAppRepositories();

  return useQuery({
    queryKey: beersQueryKeys.detail(beerID),
    queryFn: () => beersRepository.getBeer(beerID),
    ...options,
  });
};
