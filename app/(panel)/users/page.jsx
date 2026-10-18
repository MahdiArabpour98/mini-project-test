import { getAllUsers } from "./actions/crud";
import { columns } from "./components/columns";
import { DataTable } from "../../../components/data-table/data-table";
import CreateModal from "./components/create-modal";
import { Suspense } from "react";
import SearchTable from "@/components/search-table";
import HandleFilter from "@/components/handle-filter";

export default async function UsersPage({ searchParams }) {
  const { page, perPage, q = "", role } = await searchParams;

  const fetchData = await getAllUsers({
    page: page ? +page : 1,
    perPage: perPage ? +perPage : 10,
    q: q || "",
    role: role || null,
  });

  const fetchedData = fetchData.data;

  const { data, ...otherData } = fetchedData;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="container mx-auto space-y-4 p-10 py-10">
        <CreateModal />
        <SearchTable q={q} />
        <HandleFilter currentRole={role} />
        <DataTable columns={columns} data={data} options={otherData} />
      </div>
    </Suspense>
  );
}
