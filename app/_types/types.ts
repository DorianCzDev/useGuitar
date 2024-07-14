import { ReactNode } from "react";

export type ChildrenOnlyProps = {
  children: ReactNode;
};

export type PageSearchParamsProps = {
  searchParams?: { [key: string]: string | string[] | undefined };
};
