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

  const handleFileUpload = async (event: any) => {
    try {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = async (e) => {
        const contents = e.target?.result;
        let text: string;

        if (typeof contents === "string") {
          text = contents;
        } else if (contents instanceof ArrayBuffer) {
          const decoder = new TextDecoder();
          text = decoder.decode(contents);
        } else {
          throw new Error("Invalid file type");
        }

        const rows = text.split("\n").slice(1);

        rows.forEach((row) => {
          const productId = values.findIndex((product) => {
            const code = +row.split(",")[0];
            return product.code === code;
          });
          if (productId !== -1) {
            const newSalesPrice = +row.split(",")[1];
            setFieldValue(`[${productId}].new_sales_price`, +newSalesPrice);
          }
        });

        // const updatedValues = values.map((product: IProduct, index: number) => {
        //   rows.map((row, index) => row[index].split(","));
        //   const row = rows[index];
        //   const columns = row.split(",");
        //   const salelPrice = parseFloat(columns[1]);

        //   return {
        //     ...product,
        //     new_sales_price: salelPrice,
        //   };
        // });
        // setValues(updatedValues);

        notification.success({
          message: "Tabela de preços carregada com sucesso",
        });
      };

      reader.readAsArrayBuffer(file);
    } catch (error) {
      notification.error({
        message: "Erro ao carregar a tabela de preços",
      });
    }
  };

  const uploadPrices = async () => {
    try {
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = ".csv";
      fileInput.addEventListener("change", handleFileUpload, false);
      fileInput.click();
    } catch (error) {
      notification.error({
        message: "Erro ao carregar a tabela de preços",
      });
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
        <Button
          type="primary"
          title="Carregar Tabela de Preços"
          onClick={uploadPrices}
          disabled={isValidated}
        >
          Carregar Tabela de Preços
        </Button>
      </Space>
      <Table dataSource={values} columns={columns} pagination={false}></Table>
    </>
  );
};

export default ProductsTable;
