import { it, describe, vi, expect } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { RandomBeersWidget } from "./RandomBeersWidget";
import { AppRepositories } from "@/providers/AppRepositoriesProvider";
import { QueryProvider } from "@/providers/QueryProvider";
import { QueryClient } from "@tanstack/react-query";
import { Beer, BeerID, beerSchema } from "@/domain/beersRepository";

type GetRamdomBeer = AppRepositories["beersRepository"]["getRandomBeer"];

function mount(getRandomBeer: GetRamdomBeer) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  const fakeAppRepositories = {
    beersRepository: {
      getRandomBeer,
    },
  } as AppRepositories;

  cleanup();
  return render(
    <QueryProvider
      queryClient={queryClient}
      appRepositories={fakeAppRepositories}
    >
      <RandomBeersWidget />
    </QueryProvider>
  );
}

const FakeBeer: Beer = {
  id: 1 as BeerID,
  name: "Beer",
  description: "Description",
  image_url: "https://images.punkapi.com/v2/keg.png",
  first_brewed: "09/2007",
};

describe(RandomBeersWidget.name, () => {
  it("asks for 2 random beers", async () => {
    const getRandomBeer = vi.fn().mockImplementation(async () => FakeBeer);

    const component = mount(getRandomBeer);
    await component.findAllByTestId("loading-state");

    expect(getRandomBeer).toBeCalledTimes(2);
  });

  it("shows 2 random beers", async () => {
    let id = 0;
    const getRandomBeer = vi.fn().mockImplementation(async () => {
      id++;
      return beerSchema.parse({
        id,
        name: "name_" + id,
        description: "description_" + id,
        image_url: "/image_url_" + id,
        first_brewed: "first_brewed_" + id,
      });
    });

    const component = mount(getRandomBeer);
    await component.findByText("name_1");
    await component.findByText("name_2");

    expect(component.container).toMatchSnapshot();
  });

  it("shows 2 loading beers", async () => {
    const pendingPromise = new Promise(function () {});
    const getRandomBeer = vi.fn().mockReturnValue(pendingPromise);

    const component = mount(getRandomBeer);
    await component.findAllByTestId("loading-state");

    expect(component.container).toMatchSnapshot();
  });

  it("shows 2 error messages", async () => {
    const getRandomBeer = vi.fn().mockReturnValue(Promise.reject(""));

    const component = mount(getRandomBeer);
    await component.findAllByTestId("error-state");

    expect(component.container).toMatchSnapshot();
  });
});
