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

  const addUser = async (newUser) => {
    try {
      const response = await axios.post(`/api/user`, newUser);
      setState({ ...state, users: response.data });
      toast.success("Added Successfully!", { position: "top-center" });
      fetchUserData();
    } catch (err) {
      setState({ ...state, errorMessage: err.message });
    }
  };

  // update user

  const updateUser = async (id, newFormData) => {
    try {
      const { data } = await axios.put(`api/user/${id}`, newFormData);
      setState({ ...state, users: data.user.user });
      toast.success("Updated Successfully!", { position: "top-center" });
      fetchUserData();
    } catch (err) {
      setState({ ...state, errorMessage: err.message });
    }
  };

  // update user password
  const updatePassword = async (id, newPassword) => {
    try {
      const response = await axios.put(`/api/password/${id}`, newPassword);
      // setState({ ...state, users: response.data });
      setState({ ...state, users: data.user.user });
      toast.success("Updated Successfully!", { position: "top-center" });
      fetchUserData();
    } catch (err) {
      setState({ ...state, errorMessage: err.message });
    }
  };

  // delete user
  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(`/api/user/${id}`);
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
        addUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
export default UserContextProvider;
