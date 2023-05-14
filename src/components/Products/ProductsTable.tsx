import React, { useState } from "react";
import { Table, notification, Input, Button, Space, Tooltip } from "antd";
import { useFormikContext } from "formik";
import {
  IProduct,
  IProductsValidated,
  IProductValidated,
} from "../../hooks/useProducts";
import api from "../../services/api";

const ProductsTable = () => {
  const [isValidated, setIsValidated] = useState(false);
  const [brokenRules, setBrokenRules] = useState<IProductValidated[]>([]); // [
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
      dataIndex: "new_sales_price",
      key: "new_sales_price",
      render: (value: number, obj: IProduct, index: number) => {
        return (
          <>
            <Tooltip
              title={
                brokenRules[index]?.is_validated
                  ? ""
                  : brokenRules[index]?.broken_rules?.join(", ")
              }
              color={brokenRules[index]?.is_validated ? "green" : "red"}
            >
              <Input
                status={
                  brokenRules[index]?.is_validated === false ? "error" : ""
                }
                onBeforeInput={() => setFieldValue("new_sales_price", value)}
                value={value}
                onChange={(e) => {
                  const newValue = e.target.value;
                  setFieldValue(`[${index}].new_sales_price`, +newValue);
                }}
                min={0}
                placeholder="0.00"
              ></Input>
            </Tooltip>
          </>
        );
      },
    },
  ];

  const onValidate = async () => {
    try {
      const { data } = await api<IProductsValidated>({
        url: "/product/validate",
        method: "POST",
        data: values,
      });
      if (data.is_validated) notification.success({ message: "Validado" });
      if (!data.is_validated) notification.error({ message: "Não validado" });
      const { is_validated = false, productsValidated = [] } = data;
      setIsValidated(is_validated);
      setBrokenRules(productsValidated);
    } catch (error) {
      notification.error({
        message: "Erro ao validar os preços",
      });
    }
  };

  const onUpdate = () => {};

  return (
    <>
      <Space direction="horizontal" size={20}>
        <Button type="primary" title="Validar" onClick={onValidate}>
          Validar
        </Button>
        <Button type="primary" title="Atualizar Preços" disabled={!isValidated}>
          Atualizar Preços
        </Button>
      </Space>
      <Table dataSource={values} columns={columns} pagination={false}></Table>
    </>
  );
};

export default ProductsTable;
