import { useQuery, UseQueryResult } from "react-query";
import { notification } from "antd";

import api from "../services/api";

export interface IProduct {
  id: number;
  name: string;
  cost_price: number;
  sales_price: number;
  new_sales_price?: number;
}

export interface IProductsValidated {
  is_validated?: boolean;
  productsValidated?: IProductValidated[];
}

export interface IProductValidated {
  code?: number;
  name?: string;
  is_validated?: boolean;
  broken_rules?: string[];
}

const getProducts = async (): Promise<IProduct[]> => {
  try {
    const { data } = await api.get("/product");
    return data;
  } catch (error) {
    notification.error({ message: "Erro ao buscar produtos" });
    return [];
  }
};

export default function useProducts(
  query?: string
): UseQueryResult<IProduct[]> {
  return useQuery(["products", query], getProducts);
}
