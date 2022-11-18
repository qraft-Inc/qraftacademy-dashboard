import { useState } from "react";

export default function useShow() {
  const [showViewModal, setViewModal] = useState(false);
  const [showEditModal, setEditModal] = useState(false);
  const [showAddModal, setAddModal] = useState(false);
  const [showPasswordModal, setPasswordModal] = useState(false);

  return [
    showEditModal,
    setEditModal,
    showViewModal,
    setViewModal,
    showAddModal,
    setAddModal,
    showPasswordModal,
    setPasswordModal,
  ];
}
