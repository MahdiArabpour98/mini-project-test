"use server";

import prismadb from "@/lib/prismadb";

export const getAllUsers = async (options = {}) => {
  const page = options?.page || 1;
  const perPage = options?.perPage || 10;
  const skip = (page - 1) * perPage;
  const take = perPage;

  const searchString = options.q;

  const searchFilter = {
    OR: [
      { fullName: { contains: searchString, mode: "insensitive" } },
      { phoneNumber: { contains: searchString, mode: "insensitive" } },
      { nationalCode: { contains: searchString, mode: "insensitive" } },
    ],
  };

  const where = searchFilter;

  const total = await prismadb.user.count({ where });

  const data = await prismadb.user.findMany({
    where,
    include: { posts: true },
    orderBy: { createdAt: "desc" },
    skip,
    take,
  });

  return {
    ok: true,
    status: 200,
    data: {
      data,
      total,
      page,
      perPage,
    },
    message: "داده ها ارسال شدند",
  };
};
