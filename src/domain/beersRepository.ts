import { fetcher } from "@/utils/fetcher";
import { z } from "zod";

export const beerIDSchema = z.number().brand("beerID");
export type BeerID = z.infer<typeof beerIDSchema>;

export const beerSchema = z.object({
  id: beerIDSchema,
  name: z.string(),
  description: z.string(),
  first_brewed: z.string(),
  image_url: z.string().nullish(),
});
export type Beer = z.infer<typeof beerSchema>;

export const beersSchema = z.array(beerSchema);
export type Beers = z.infer<typeof beersSchema>;

export interface BeersRepository {
  getRandomBeer(): Promise<Beer>;
}

export const realBeersRepository: BeersRepository = {
  async getRandomBeer() {
    const response = await fetcher({
      url: "https://api.punkapi.com/v2/beers/random",
    });
    const data = (await response.json()) as Beer[];
    return beerSchema.parse(data[0]);
  },
};