export type FetcherSearchParams = Record<string, string>;
type Fetcher = (
  info: { url: string; searchParams?: FetcherSearchParams },
  init?: RequestInit
) => Promise<Response>;

export const fetcher: Fetcher = async (info, init) => {
  const url = `${info.url}${
    info.searchParams ? `?${new URLSearchParams(info.searchParams)}` : ""
  }`;

  const res = await fetch(url, init);
  /**
   * Fetch promises only reject with a TypeError when a network error occurs.
   * Since 4xx and 5xx responses aren't network errors, there's nothing to catch.
   * According to the react query documentation, we should throw in case there is an error.
   * https://tanstack.com/query/v4/docs/guides/queries#query-basics
   */
  if (!res.ok) throw new Error(`${res.status}`);
  return res;
};
