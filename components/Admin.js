import React, { useContext, Fragment, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import useShow from "./hooks/useShow";
import { GrAddCircle } from "react-icons/gr";
import { ImUserTie } from "react-icons/im";
import UserList from "./UserList";
import { signOut } from "next-auth/react";
import AddModal from "./modals/AddModal";
import Footer from "./Footer";
import logo from "../public/images/logo.png";
import Image from "next/image";
import Spinner from "./Spinner";

export default function Admin() {
  const [searchName, setSearchName] = useState({ text: "" });
  const { userData, setUserData } = useContext(UserContext);
  const { searchedData, users, loading } = userData;

  //custome hook
  const [showAddModal, setAddModal] = useShow();

  // searchName user
  const handleSearch = (e) => {
    setSearchName({ ...searchName, text: e.target.value });

    const result = users.filter((user) => {
      return user.fullname.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setUserData({ ...userData, searchedData: result });
  };

  return (
    <div className="flex flex-col h-screen justify-between bg-[#eee8e4]">
      <div className="bg-[#eee8e4]">
        <nav className="w-full lg:flex lg:flex-wrap lg:items-center lg:justify-between py-2 bg-gray-900 text-gray-200 shadow-lg navbar navbar-expand-lg navbar-light">
          <div className="w-full flex items-cent justify-around md:justify-between md:px-6">
            <div className="w-16 h-12">
              <Image
                alt="profile pic"
                src={logo}
                className="rounded-lg"
                width={90}
                height={62}
                placeholder="blur"
                blurDataURL
              />
            </div>
            <div className="flex items-center gap-1 text-xl font-semibold">
              <ImUserTie size="1.5rem" className="text-[#f0ad4e]" />
              User<span className=" text-[#f0ad4e]"> Manager</span>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                signOut();
              }}
              className="inline-block px-4 py-0.5 md:px-6 md:py-2.5 border-2 border-blue-400 text-white font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
            >
              Logout
            </button>
          </div>
        </nav>

        <section className="flex flex-col p-2 md:p-0 mt-3 mb-3 container mx-auto">
          <button
            type="button"
            className="flex items-center gap-0.5 max-w-max inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out"
            onClick={() => setAddModal(true)}
          >
            <GrAddCircle size="1rem" />
            Create
          </button>

          {/* search section */}
          <div className="sm:w-96">
            <div className="input-group relative flex items-stretch w-full mb-2 mt-4">
              <input
                type="search"
                className="rounded-full form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Search by name...."
                aria-label="Search"
                aria-describedby="button-addon3"
                value={searchName.text}
                onChange={handleSearch}
              />

            </div>
          </div>
        </section>

        {/* card section */}
        {loading ? (
          <Spinner />
        ) : (
          <section className="w-full sm:container sm:mx-auto">
            <div className="bg-gray-200 p-4 grid gap-y-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-10">
              {searchedData.length > 0 &&
                searchedData.map((user) => (
                  <Fragment key={user._id}>
                    <UserList user={user} />
                  </Fragment>
                ))}
            </div>
          </section>
        )}
        {showAddModal ? (
          <AddModal setAddModal={setAddModal} setUserData={setUserData} />
        ) : null}

      </div>
      <Footer />
    </div>
  );
}
