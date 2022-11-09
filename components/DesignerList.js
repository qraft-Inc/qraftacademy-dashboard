import React, { useContext } from "react";
import { AiFillDelete, AiFillEye } from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { UserContext } from "../contexts/UserContext";
import EditModal from "./modals/EditModal";
import useShow from "./hooks/useShow";
import ViewAdminModal from "./modals/ViewMarketingModal";
import PasswordModal from "./modals/PasswordModal";
import Image from "next/image";
import profile from "../public/images/profile.png";

export default function DesignerList({ user }) {
  const { deleteUser } = useContext(UserContext);

  //custome hook
  const [
    showEditModal,
    setEditModal,
    showViewModal,
    setViewModal,
    showPasswordModal,
    setPasswordModal,
  ] = useShow();

  return (
    <>
      <div className="sm:w-max p-1 flex gap-1 items-center rounded-lg border bg-white shadow-md md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        {user.image ? (
          <div className="w-20 md:w-20">
            <Image
              alt="profile pic"
              src={user.user.image}
              className="col-auto rounded-full"
              width={3077}
              height={3448}
              placeholder="blur"
              blurDataURL
            />
          </div>
        ) : (
          <div className="w-20 md:w:24">
            <Image
              alt="profile pic"
              src={profile}
              className="col-auto rounded-full"
              width={1010}
              height={1010}
              placeholder="blur"
              blurDataURL
            />
          </div>
        )}

        <ul className="text-sm font-medium text-gray-900 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          <li className="py-2 px-4 w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
            Name : <span className="font-bold">{user.user.fullname}</span>
          </li>
          <li className="py-2 px-4 w-full border-b border-gray-200 dark:border-gray-600">
            Email : <span className="font-bold">{user.user.email}</span>
          </li>
          <li className="py-2 px-4 w-full border-b border-gray-200 dark:border-gray-600">
            Mobile : <span className="font-bold">{user.user.telephone}</span>
          </li>
        </ul>

        <ul className="flex flex-col justify-center ">
          <li className="">
            <button
              onClick={() => {
                setPasswordModal(true);
              }}
            >
              <RiLockPasswordFill size="1.3rem" />
            </button>
          </li>
          <li className="">
            <button
              onClick={() => {
                setViewModal(true);
              }}
            >
              <AiFillEye size="1.3rem" className="text-[#f0ad4e]" />
            </button>
          </li>
          <li className="">
            <button type="button" onClick={() => setEditModal(true)}>
              <FaEdit size="1.3rem" className="text-blue-400 " />
            </button>
          </li>
          <li className="">
            <button type="button" onClick={() => deleteUser(user._id)}>
              <AiFillDelete size="1.3rem" className="text-red-500" />
            </button>
          </li>
        </ul>
      </div>

      {showPasswordModal ? (
        <PasswordModal user={user} setPasswordModal={setPasswordModal} />
      ) : null}
      {showEditModal ? (
        <EditModal user={user} setEditModal={setEditModal} />
      ) : null}
      {showViewModal ? (
        <ViewAdminModal user={user} setViewModal={setViewModal} />
      ) : null}
    </>
  );
}
