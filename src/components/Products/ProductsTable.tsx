import React from "react";
import { Table, notification, Input } from "antd";
import { useFormikContext } from "formik";
import { IProduct } from "../../hooks/useProducts";

const ProductsTable = () => {
  const { values, setFieldValue } = useFormikContext<IProduct[]>();
  const columns = [
    {
      title: "Código",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Nome",
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
      title: "Novo Preço de venda",
      dataIndex: "sales_price_updated",
      key: "sales_price_updated",
      render: (value: number, obj: IProduct, index: string | number) => {
        return (
          <Input
            value={value}
            onChange={(e) => {
              setFieldValue("sales_price_updated", e.target.value);
            }}
          ></Input>
        );
      },
    },
  ];

  return (
    <Table dataSource={values} columns={columns} pagination={false}></Table>
  );
};

export default ProductsTable;
