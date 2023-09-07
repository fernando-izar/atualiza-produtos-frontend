import React, { useEffect } from "react";
import usePacks from "../../hooks/usePacks";
import PacksTable from "./PacksTable";

type PacksProps = {
  key?: string;
};

export const Packs: React.FC<PacksProps> = ({ key }) => {
  const { data: packs, refetch } = usePacks();
  useEffect(() => {
    if (key === "2") {
      refetch();
    }
  }, [key, refetch]);

  return <PacksTable packs={packs} />;
};
