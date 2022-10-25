import React, { useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

export default function AddModal({ setAddModal }) {
  const { addUser } = useContext(UserContext);

  //capture new user
  const [email, setName] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [telephone, setTelephone] = useState("");
  const [gender, setGender] = useState("");
  const [image, setImage] = useState("");

  const newUserData = { email, password, fullname, telephone, gender, image };

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser(newUserData);
    setAddModal(false);
  };

  return (
    <>
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
              <div className="bg-[#eee8e4] px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h2 className="text-lg text-center font-bold border-b-2 border-b-black">
                  Create User
                </h2>
                <form className="pb-2 my-2" onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">
                      Email
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                      type="text"
                      name="email"
                      value={email}
                      placeholder="Email Address"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">
                      Password
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3"
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">
                      Full Name
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3"
                      type="text"
                      name="fullname"
                      value={fullname}
                      placeholder="fullname"
                      onChange={(e) => setFullname(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">
                      Phone Number
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3"
                      type="text"
                      name="telephone"
                      value={telephone}
                      placeholder="telephone"
                      onChange={(e) => setTelephone(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">
                      Gender
                    </label>
                    <span className="form-check">
                      <input
                        className="form-radio"
                        type="radio"
                        name="gender"
                        value="male"
                        onChange={(e) => setGender(e.target.value)}
                      />
                      <label className="ml-4 text-sm sm:text-base">Male</label>
                    </span>
                    <span className="form-check ml-4">
                      <input
                        className="form-radio"
                        type="radio"
                        name="gender"
                        value="female"
                        onChange={(e) => setGender(e.target.value)}
                      />
                      <label className="ml-4 text-sm sm:text-base">
                        Female
                      </label>
                    </span>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">
                      Link to profile picture
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3"
                      type="text"
                      name="image"
                      value={image}
                      placeholder="link"
                      onChange={(e) => setImage(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-x-2">
                    <button className="w-full inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out">
                      Create
                    </button>
                    <button
                      onClick={() => setAddModal(false)}
                      className="w-full inline-block px-6 py-2 border-2 border-gray-800 text-gray-800 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
