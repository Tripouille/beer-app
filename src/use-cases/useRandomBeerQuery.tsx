import { useAppRepositories } from "@/providers/AppRepositoriesProvider";
import {
  UseQueryOptions,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { beersQueryKeys } from "./beersQueryKeys";
import { Beer } from "@/domain/beersRepository";

export const useRandomBeerQuery = (
  randomID: string,
  options?: UseQueryOptions<Beer>
) => {
  const queryClient = useQueryClient();
  const { beersRepository } = useAppRepositories();

  return useQuery({
    queryKey: beersQueryKeys.random(randomID),
    queryFn: beersRepository.getRandomBeer,
    onSuccess: (beer) => {
      queryClient.setQueryData(beersQueryKeys.detail(beer.id), beer);
    },
    ...options,
  });
};
