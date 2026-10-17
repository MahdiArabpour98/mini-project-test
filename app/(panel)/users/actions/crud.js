"use server";

import prismadb from "@/lib/prismadb";
import { routes } from "@/lib/routes/routes";
import { userSchema } from "@/lib/validation/user";
import { revalidatePath } from "next/cache";

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

export const createUser = async (values) => {
  const validateData = userSchema.safeParse(values);

  if (!validateData.success) {
    return {
      ok: false,
      status: 400,
      message: "فرمت دیتای ارسالی صحیح نمیباشد",
      errors: validateData.error.flatten().fieldErrors,
    };
  }

  const data = await prismadb.user.create({
    data: { ...values },
  });

  revalidatePath(routes.panel.users);

  return {
    ok: true,
    status: 201,
    data,
    message: "کاربر جدید اضافه شد",
  };
};

export const editUser = async (id, values) => {
  const validateData = userSchema.safeParse(values);

  if (!validateData.success) {
    return {
      ok: false,
      status: 400,
      message: "فرمت دیتای ارسالی صحیح نمیباشد",
      errors: validateData.error.flatten().fieldErrors,
    };
  }

  const data = await prismadb.user.update({
    where: { id },
    data: { ...values },
  });

  revalidatePath(routes.panel.users);

  return {
    ok: true,
    status: 201,
    data,
    message: "کاربر مورد نظر ویرایش شد",
  };
};

export const deleteUser = async (id) => {
  if (!id) {
    return {
      ok: false,
      status: 400,
      message: "id مورد نظر وجود ندارد",
    };
  }

  const data = await prismadb.user.delete({
    where: { id },
  });

  revalidatePath(routes.panel.users);

  return {
    ok: true,
    status: 200,
    data,
    message: "کاربر مورد نظر حذف شد",
  };
};
