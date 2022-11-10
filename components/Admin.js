import React, { useContext, Fragment, useState, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import useShow from "./hooks/useShow";
import { GrAddCircle } from "react-icons/gr";
import { ImUserTie } from "react-icons/im";
import AdminList from "./AdminList";
import MarketingList from "./MarketingList";
import DesignerList from "./DesignerList";
import DeveloperList from "./DeveloperList";
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
  const [courseList, setCourseList] = useState("admin");
  const [admin, setAdmin] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [designers, setDesigners] = useState(false);
  const [developers, setDevelopers] = useState(false);

  //custome hook
  const [showAddModal, setAddModal] = useShow();

  // searchName user
  const handleSearch = (e) => {
    setSearchName({ ...searchName, text: e.target.value });

    const result = users.filter((user) => {
      return user.user.fullname.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setUserData({ ...userData, searchedData: result });
  };

  useEffect(() => {
    courseList === "admin" ? setAdmin(true) : setAdmin(false);
    courseList === "marketing" ? setMarketing(true) : setMarketing(false);
    courseList === "designers" ? setDesigners(true) : setDesigners(false);
    courseList === "developers" ? setDevelopers(true) : setDevelopers(false);
  }, [courseList]);

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
                // blurDataURL
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
          <div className="flex gap-36">
            <button
              type="button"
              className="flex items-center gap-0.5 max-w-max inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out"
              onClick={() => setAddModal(true)}
            >
              <GrAddCircle size="1rem" />
              Create
            </button>
            <div className="flex justify-center">
              <div className="dropend relative">
                <button
                  className="dropdown-toggle px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded
          shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg active:text-white
          transition duration-150 ease-in-out flex items-center whitespace-nowrap"
                  type="button"
                  id="dropdownMenuButton1e"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {courseList}
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="caret-right"
                    className="w-1.5 ml-2"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 192 512"
                  >
                    <path
                      fill="currentColor"
                      d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"
                    ></path>
                  </svg>
                </button>
                <ul
                  className="dropdown-menu min-w-max absolute hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg
          shadow-lg mt-1 hidden m-0 bg-clip-padding border-none"
                  aria-labelledby="dropdownMenuButton1e"
                >
                  <li
                    className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700
              hover:bg-gray-100"
                    onClick={(e) => {
                      e.preventDefault();
                      setCourseList("admin");
                    }}
                  >
                    Admin
                  </li>
                  <li
                    className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700
              hover:bg-gray-100"
                    onClick={(e) => {
                      e.preventDefault();
                      setCourseList("developers");
                    }}
                  >
                    Developers
                  </li>
                  <li
                    className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                    onClick={(e) => {
                      e.preventDefault();
                      setCourseList("designers");
                    }}
                  >
                    Designers
                  </li>
                  <li
                    className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                    onClick={(e) => {
                      e.preventDefault();
                      setCourseList("marketing");
                    }}
                  >
                    Marketing
                  </li>
                </ul>
              </div>
            </div>
          </div>

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
                    {/* <pre>{JSON.stringify(user.marketing)}</pre> */}
                    {user.user.isAdmin === true && admin ? (
                      <AdminList user={user} />
                    ) : null}

                    {user.marketing && marketing ? (
                      <MarketingList user={user} />
                    ) : null}

                    {user.designers && designers ? (
                      <DesignerList user={user} />
                    ) : null}

                    {user.developers && developers ? (
                      <DeveloperList user={user} />
                    ) : null}
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
