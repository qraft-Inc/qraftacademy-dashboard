import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [userData, setUserData] = useState({
    users: [],
    searchedData: [],
    loading: false,
    errorMessage: "",
  });

  // show all users
  useEffect(() => {
    async function fetchUserData() {
      try {
        setUserData({ ...userData, loading: true });
        const response = await axios.get("/api/user");
        setUserData({
          ...userData,
          users: response.data,
          searchedData: response.data,
          loading: false,
        });
      } catch (err) {
        setUserData({ ...userData, loading: false, errorMessage: err.message });
      }
    }
    fetchUserData();
  }, []);

  const addUser = async (newUser) => {
    try {
      const response = await axios.post(`/api/user`, newUser);
      setUserData({ ...userData, users: response.data });
      toast.success("Added Successfully!", { position: "top-center" });
      fetchUserData();
    } catch (err) {
      setUserData({ ...userData, errorMessage: err.message });
    }
  };

  // update user
  const updateUser = async (id, { newFormData }) => {
    console.log("newFormData", newFormData);
    // {email,fullname,image,telephone} : newFormData
    const email = newFormData.email;
    const fullname = newFormData.fullname;
    const image = newFormData.image;
    const telephone = newFormData.telephone;

    try {
      const response = await axios.put(`api/user/${id}`, {
        email,
        fullname,
        image,
        telephone,
      });
      // console.log("reponse",response.data);
      setUserData({ ...userData, users: response.data });
      toast.success("Updated Successfully!", { position: "top-center" });
      fetchUserData();
    } catch (err) {
      setUserData({ ...userData, errorMessage: err.message });
    }
  };

  // update user password
  const updatePassword = async (id, newPassword) => {
    try {
      const response = await axios.put(`/api/password/${id}`, newPassword);
      setUserData({ ...userData, users: response.data });
      toast.success("Updated Successfully!", { position: "top-center" });
      fetchUserData();
    } catch (err) {
      setUserData({ ...userData, errorMessage: err.message });
    }
  };

  // delete user
  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(`/api/user/${id}`);
      fetchUserData();
      toast.success(response.data, { position: "top-center" });
    } catch (err) {
      setUserData({ ...userData, errorMessage: err.message });
    }
  };

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        updateUser,
        updatePassword,
        deleteUser,
        addUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
export default UserContextProvider;
