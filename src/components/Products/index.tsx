import React from "react";
import { Formik } from "formik";
import useProducts from "../../hooks/useProducts";
import ProductsTable from "./ProductsTable";

export const Products = () => {
  const { data: products = [], refetch } = useProducts();
  console.log("test-products", products);
  const initialValues = products || [];
  const handleSubmit = () => {
    console.log("submit");
    refetch();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      enableReinitialize
      pagination={false}
    >
      {({ values, setFieldValue, handleSubmit, handleChange }) => {
        return <ProductsTable />;
      }}
    </Formik>
  );
};
