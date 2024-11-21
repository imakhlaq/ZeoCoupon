import React from "react";
import PageWithBackButton from "../../_components/PageWithBackButton";

type Props = {};

export default function NewProduct({}: Props) {
  return (
    <PageWithBackButton
      backButtonHref="/dashboard/products"
      pageTitle="Create Product"
    >
      NewProduct
    </PageWithBackButton>
  );
}
