import axios from "axios";
import { Alert } from "react-native";
import { useContext, useEffect, useState } from "react";

export async function createUser({
  firstname,
  lastname,
  email,
  password,
  cnic,
}) {
  const response = await axios.post(
    "https://keplatform.herokuapp.com/users/register",
    {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
      cnic: cnic,
    }
  );
  const token = response.data;
  return token;
}

export async function loginUser(email, password) {
  const response = await axios.post(
    "https://keplatform.herokuapp.com/users/login",
    {
      email: email,
      password: password,
    }
  );
  const token = response.data;
  return token;
}
