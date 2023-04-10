"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactElement } from "react";
import {
  AppRepositoriesProvider,
  AppRepositories,
} from "./AppRepositoriesProvider";
import { realBeersRepository } from "@/domain/beersRepository";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const defaultQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
    },
  },
});

const defaultAppRepositories: AppRepositories = {
  beersRepository: realBeersRepository,
};

export function QueryProvider({
  children,
  queryClient,
  appRepositories,
}: {
  children: ReactElement;
  queryClient?: QueryClient;
  appRepositories?: AppRepositories;
}) {
  return (
    <AppRepositoriesProvider
      appRepositories={appRepositories ?? defaultAppRepositories}
    >
      <QueryClientProvider client={queryClient ?? defaultQueryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AppRepositoriesProvider>
  );
}
