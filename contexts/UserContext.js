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
  const fetchUserData = async () => {
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
  };

  useEffect(async () => {
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
  const updateUser = async (id, newFormData) => {
    try {
      const response = await axios.put(`/api/user/${id}`, newFormData);
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
