import { Suspense } from "react";
import { getUserById } from "../actions/crud";

const UserDetailsPage = async ({ params }) => {
  const { id } = await params;

  const data = await getUserById(parseInt(id));

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col gap-2 p-8">
        <span>{data?.data?.phoneNumber}</span>
        <span>{data?.data?.fullName}</span>
      </div>
    </Suspense>
  );
};

export default UserDetailsPage;
