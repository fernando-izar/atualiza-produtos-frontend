import React from "react";
import { Table, notification, Input } from "antd";
import { Formik } from "formik";
import useProducts from "../../hooks/useProducts";
import { useFormikContext } from "formik";
import ProductsTable from "./ProductsTable";

export const Products = () => {
  const { data: products } = useProducts();
  const initialValues = products;
  const handleSubmit = () => {
    console.log("submit");
  };

  return (
    <Formik
      initialValues={initialValues || {}}
      onSubmit={handleSubmit}
      enableReinitialize={true}
      pagination={false}
    >
      {({ values, setFieldValue }) => {
        return <ProductsTable />;
      }}
    </Formik>
  );
};
