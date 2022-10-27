import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Formik, Field, Form } from "formik";

export default function EditModal({ user, setEditModal }) {
  const { updateUser } = useContext(UserContext);
  const id = user._id;

  // initial form value
  const initialValues = {
    email: user.email,
    fullname: user.fullname,
    telephone: user.telephone,
    image: user.image,
  };

  const onSubmit = async (values) => {
    updateUser(id, values);
    setEditModal(false);
    console.log(values)
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
                  Edit User
                </h2>
                <Formik
                  initialValues={initialValues}
                  onSubmit={onSubmit}
                >
                  <Form className="pb-2 my-2">
                    <div className="mb-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-bold mb-2"
                      >
                        Email
                      </label>
                      <Field
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                        type="email"
                        aria-label="email"
                        name="email"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-bold mb-2">
                        Full Name
                      </label>

                      <Field
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                        type="text"
                        aria-label="text"
                        name="fullname"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-bold mb-2">
                        Phone Number
                      </label>

                      <Field
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                        type="text"
                        aria-label="text"
                        name="telephone"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-bold mb-2">
                        Link to profile picture
                      </label>

                      <Field
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                        type="text"
                        aria-label="photo"
                        name="photo"
                      />

                    </div>
                    <div className="flex gap-x-2">
                      <button type="submit" className="w-full inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out">
                        Update
                      </button>
                      <button
                        type="submit"
                        onClick={() => setEditModal(false)}
                        className="w-full inline-block px-6 py-2 border-2 border-gray-800 text-gray-800 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                      >
                        Cancel
                      </button>
                    </div>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
