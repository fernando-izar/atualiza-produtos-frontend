import React, { useState } from "react";
import { Table, notification, Input, Button, Space, Tooltip } from "antd";
import { useFormikContext } from "formik";
import {
  IProduct,
  IProductsValidated,
  IProductValidated,
} from "../../hooks/useProducts";
import api from "../../services/api";

const ProductsTable: React.FC = () => {
  const [isValidated, setIsValidated] = useState(false);
  const [brokenRules, setBrokenRules] = useState<IProductValidated[]>([]);
  const { values, setFieldValue, setValues, handleSubmit } =
    useFormikContext<IProduct[]>();
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
        console.log("test-value", value, obj, index);
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
                disabled={isValidated}
                status={
                  brokenRules[index]?.is_validated === false ? "error" : ""
                }
                type={"number"}
                value={value}
                onChange={(e) => {
                  const newValue = e.target.value;
                  setFieldValue(`[${index}].new_sales_price`, +newValue);
                }}
                min={0}
                step="0.01"
                pattern="\d+(\.\d{1,2})?"
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
    } finally {
    }
  };

  const onUpdate = async () => {
    try {
      const { data } = await api<IProduct[]>({
        url: "/product/update",
        method: "PUT",
        data: values,
      });
      setValues(data);
      notification.success({
        message: "Preços atualizados com sucesso",
      });
    } catch (error) {
      notification.error({
        message: "Erro ao atualizar os preços",
      });
    } finally {
      setIsValidated(false);
      handleSubmit();
    }
  };

  return (
    <>
      <Space direction="horizontal" size={20}>
        <Button type="primary" title="Validar" onClick={onValidate}>
          Validar
        </Button>
        <Button
          type="primary"
          title="Atualizar Preços"
          disabled={!isValidated}
          onClick={onUpdate}
        >
          Atualizar Preços
        </Button>
      </Space>
      <Table dataSource={values} columns={columns} pagination={false}></Table>
    </>
  );
};

export default ProductsTable;
