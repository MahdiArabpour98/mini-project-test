"use client";

import { useState } from "react";
import { Modal } from "@/components/modal";
import { Button } from "@/components/ui/button";
import CreateForm from "./create-form";

const CreateModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>افزودن کاربر</Button>
      <Modal open={open} onOpenChange={setOpen} title="افزودن کاربر">
        <div className="flex flex-col gap-2">
          <CreateForm onComplete={() => setOpen(false)} />
        </div>
      </Modal>
    </>
  );
};

export default CreateModal;
