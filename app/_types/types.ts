import { ReactNode } from "react";

export type ChildrenOnlyProps = {
  children: ReactNode;
};

export type PageSearchParamsProps = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

export type AccessTokenJwtPayload = {
  user: { userId: string };
};

export type RefreshTokenJwtPayload = {
  user: {
    userId: string;
  };
  refreshToken: string;
};

export type UserDataType = {
  user?: {
    firstName?: string;
    lastName?: string;
    address?: string;
    city?: string;
    email?: string;
    phoneNumber?: string;
    postCode?: string;
    country?: string;
  };
  status: number;
};

export type StateCartAfterFetchType = {
  cart: {
    cartAfterFetch: SingleProductType[];
  };
};

export type StateCart = {
  cart: string[];
};

export type SingleProductType = {
  _id: string;
  name: string;
  imageURL: string;
  quantity: number;
  price: number;
  category: string;
  featured: string;
  discount: number;
  averageRating: number;
  images: {
    imageURL: string;
  }[];
  numOfReviews: number;
  noDiscountPrice: number;
};
