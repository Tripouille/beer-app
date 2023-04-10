"use client";

import { BeersRepository } from "@/domain/beersRepository";
import { invariant } from "@/utils/invariant";
import { ReactElement, createContext, useContext } from "react";

export interface AppRepositories {
  beersRepository: BeersRepository;
}

const AppRepositoriesContext = createContext<AppRepositories | null>(null);

export function AppRepositoriesProvider({
  appRepositories,
  children,
}: {
  appRepositories: AppRepositories;
  children: ReactElement;
}) {
  return (
    <AppRepositoriesContext.Provider value={appRepositories}>
      {children}
    </AppRepositoriesContext.Provider>
  );
}

export const useAppRepositories = (): AppRepositories => {
  const context = useContext(AppRepositoriesContext);

  invariant(
    context,
    "could not find AppRepositoriesContext, please ensure the component is wrapped in a <AppRepositoriesProvider>"
  );

  return context;
};
