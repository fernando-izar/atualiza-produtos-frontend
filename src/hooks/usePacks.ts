import { useQuery, UseQueryResult } from "react-query";
import { notification } from "antd";
import { IProduct } from "./useProducts";

import api from "../services/api";

export interface IProductPack {
  product?: IProduct;
  qty: number;
  code?: string;
  name?: string;
  cost_price?: number;
  sales_price?: number;
}

export interface IPack {
  id: number;
  products: IProductPack[];
  pack_name?: string;
}

const getPacks = async (): Promise<IPack[]> => {
  try {
    const { data } = await api.get("/pack");
    return data;
  } catch (error) {
    notification.error({ message: "Erro ao buscar packs" });
    return [];
  }
};

export default function usePacks(query?: string): UseQueryResult<IPack[]> {
  return useQuery(["packs", query], getPacks);
}
