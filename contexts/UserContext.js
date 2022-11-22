import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [state, setState] = useState({
    users: [],
    searchedData: [],
    loading: false,
    errorMessage: "",
  });

  // show all users
  // useEffect(() => {
  //   async function fetchUserData() {
  //     try {
  //       setState({ ...state, loading: true });
  //       const response = await axios.get("/api/user");

  //       setState({
  //         ...state,
  //         users: response.data,
  //         searchedData: response.data,
  //         loading: false,
  //       });

  //     }

  //     catch (err) {
  //       setState({ ...state, loading: false, errorMessage: err.message });
  //     }
  //   }
  //   fetchUserData();
  // }, []);

  const fetchUserData = async () => {
    try {
      setState({ ...state, loading: true });
      const response = await axios.get("/api/user");

      setState({
        ...state,
        users: response.data,
        searchedData: response.data,
        loading: false,
      });
    } catch (err) {
      setState({ ...state, loading: false, errorMessage: err.message });
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  const addAdmin = async (newAdmin) => {
    try {
      const response = await axios.post(`/api/user`, newAdmin);
      setState({ ...state, users: response.data });
      toast.success("Added Successfully!", { position: "top-center" });
      fetchUserData();
    } catch (err) {
      setState({ ...state, errorMessage: err.message });
    }
  };

  // update user

  const updateUser = async (userId, newFormData) => {
    try {
      const { data } = await axios.put(`api/user/${userId}`, newFormData);
      setState({ ...state, users: data.user.user });
      toast.success("Updated Successfully!", { position: "top-center" });
      fetchUserData();
    } catch (err) {
      setState({ ...state, errorMessage: err.message });
    }
  };

  // update user password
  const updatePassword = async (userId, newPassword) => {
    try {
      const {data} = await axios.put(`/api/password/${userId}`, newPassword);
      console.log({data})
      setState({ ...state, users: data.user.user });
      toast.success("Updated Successfully!", { position: "top-center" });
      fetchUserData();
    } catch (err) {
      setState({ ...state, errorMessage: err.message });
    }
  };

  // delete user
  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(`/api/user/${userId}`);
      toast.success(response.data, { position: "top-center" });
      fetchUserData();
    } catch (err) {
      setState({ ...state, errorMessage: err.message });
    }
  };

  return (
    <UserContext.Provider
      value={{
        state,
        setState,
        updateUser,
        updatePassword,
        deleteUser,
        addAdmin,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
export default UserContextProvider;
