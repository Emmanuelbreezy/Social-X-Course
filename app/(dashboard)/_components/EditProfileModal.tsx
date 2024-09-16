"use client";
import React from "react";
import Modal from "@/components/modal";
import { useStore } from "@/hooks/useStore";

const EditProfileModal = () => {
  const { isEditModalOpen, closeEditModal } = useStore();
  return (
    <Modal
      title="Edit Profile"
      subTitle=""
      isOpen={isEditModalOpen}
      onClose={closeEditModal}
      body={
        <div className="w-full h-[400px]">
          <input />
        </div>
      }
    />
  );
};

export default EditProfileModal;
