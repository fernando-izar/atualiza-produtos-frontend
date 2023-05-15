import React from "react";
import { Table, notification, Input, Collapse } from "antd";
import { IPack } from "../../hooks/usePacks";

type PacksTableProps = {
  packs?: IPack[];
};

const PacksTable: React.FC<PacksTableProps> = ({ packs }) => {
  const columns = [
    {
      title: "Código",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Produto",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Custo",
      dataIndex: "cost_price",
      key: "cost_price",
    },
    {
      title: "Preço de venda",
      dataIndex: "sales_price",
      key: "sales_price",
    },
    {
      title: "Quantidade",
      dataIndex: "qty",
      key: "qty",
    },
  ];
  return (
    <Collapse>
      {packs?.map((pack) => {
        const data = pack.products;
        return (
          <Collapse.Panel
            header={`Pacote: ${pack.pack_name}, Código: ${pack.id}`}
            key={pack.id}
          >
            <Table
              dataSource={data}
              columns={columns}
              pagination={false}
            ></Table>
          </Collapse.Panel>
        );
      })}
    </Collapse>
  );
};

export default PacksTable;
