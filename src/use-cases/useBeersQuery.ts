import { useAppRepositories } from "@/providers/AppRepositoriesProvider";
import {
  UseQueryOptions,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { beersQueryKeys } from "./beersQueryKeys";
import { Beers, GetBeersParams } from "@/domain/beersRepository";

export const useBeersQuery = (
  params: GetBeersParams,
  options?: UseQueryOptions<Beers>
) => {
  const queryClient = useQueryClient();
  const { beersRepository } = useAppRepositories();

  return useQuery({
    queryKey: beersQueryKeys.list(params),
    queryFn: () => beersRepository.getBeers(params),
    onSuccess: (beers) => {
      beers.forEach((beer) => {
        queryClient.setQueryData(beersQueryKeys.detail(beer.id), beer);
      });
    },
    ...options,
  });
};
