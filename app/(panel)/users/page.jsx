import { getAllUsers } from "./actions/crud";
import { columns } from "./components/columns";
import { DataTable } from "../../../components/data-table/data-table";
import CreateModal from "./components/create-modal";
import { Suspense } from "react";

export default async function UsersPage({ searchParams }) {
  const sp = await searchParams;

  const page = await sp?.page;
  const perPage = await sp?.perPage;
  const q = await sp?.q;
  const role = await sp?.role;

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
        <DataTable columns={columns} data={data} options={otherData} />
      </div>
    </Suspense>
  );
}
