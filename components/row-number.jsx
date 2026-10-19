"use client";

import { useSearchParams } from "next/navigation";

const RowNumber = ({ number }) => {
  const searchParams = useSearchParams();

  const page = +searchParams.get("page") || 1;
  const perPage = +searchParams.get("perPage") || 10;

  const rowNumber = number + (page - 1) * perPage + 1;

  return <span>{rowNumber}</span>;
};

export default RowNumber;
