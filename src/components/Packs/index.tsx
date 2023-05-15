import React from "react";
import usePacks from "../../hooks/usePacks";
import PacksTable from "./PacksTable";

export const Packs = () => {
  const { data: packs } = usePacks();

  return <PacksTable packs={packs} />;
};
