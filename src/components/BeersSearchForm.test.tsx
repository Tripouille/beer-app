import { it, describe, vi, expect } from "vitest";
import { BeersSearchForm } from "./BeersSearchForm";
import { AppRepositories } from "@/providers/AppRepositoriesProvider";
import { QueryClient } from "@tanstack/react-query";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { QueryProvider } from "@/providers/QueryProvider";
import { GetBeersParams } from "@/domain/beersRepository";

type GetBeers = AppRepositories["beersRepository"]["getBeers"];

function mount(getBeers: GetBeers) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 0,
      },
    },
  });
  const fakeAppRepositories = {
    beersRepository: {
      getBeers,
    },
  } as AppRepositories;

  cleanup();
  return render(
    <QueryProvider
      queryClient={queryClient}
      appRepositories={fakeAppRepositories}
    >
      <BeersSearchForm />
    </QueryProvider>
  );
}

describe(BeersSearchForm.name, () => {
  it("calls getBeers with an empty search terms on first mount", () => {
    const getBeers = vi.fn().mockImplementation(async () => []);
    const expectedParams = { beer_name: "" } as GetBeersParams;

    mount(getBeers);

    expect(getBeers).toBeCalledTimes(1);
    expect(getBeers.mock.calls[0][0]).toContain(expectedParams);
  });

  it("calls getBeers on search", async () => {
    const getBeers = vi.fn().mockImplementation(async () => []);
    const searchTerms = "search terms";
    const expectedParams = { beer_name: searchTerms } as GetBeersParams;
    const component = mount(getBeers);

    await component.findByTestId("search-results");
    const input = component.getByRole("searchbox") as HTMLInputElement;
    fireEvent.change(input, { target: { value: searchTerms } });
    await component.findByTestId("loading-state");

    expect(getBeers).toBeCalledTimes(2);
    expect(getBeers.mock.calls[1][0]).toContain(expectedParams);
  });
});
