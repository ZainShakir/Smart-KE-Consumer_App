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
  console.log(firstname, lastname, email, password, cnic);
  const response = await axios.post(
    "http://192.168.10.7:3080/consumer/register",
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
  const response = await axios.post("http://192.168.10.7:3080/consumer/login", {
    email: email,
    password: password,
  });
  const token = response.data;
  return token;
}

export async function ResetPass(email) {
  const response = await axios.post(
    "http://192.168.10.7:3080/consumer/forgot-pass",
    {
      email: email,
    }
  );
  return response;
}

export async function GetDetails(token) {
  const response = await axios.get(
    `http://192.168.10.7:3080/consumer/useprofile`,
    {
      headers: {
        "x-access-token": token,
      },
    }
  );
  return response;
}

export async function EditProfile(token, first_name, last_name, contact_no) {
  const response = await axios.patch(
    `http://192.168.10.7:3080/consumer/editprofile`,
    { first_name: first_name, last_name: last_name, contact_no: contact_no },
    {
      headers: {
        "x-access-token": token,
      },
    }
  );
  return response;
}

export async function EditPicture(token, img) {
  console.log(token);
  const response = await axios.patch(
    `http://192.168.10.7:3080/consumer/editprofile`,
    { photo: img },
    {
      headers: {
        "x-access-token": token,
      },
    }
  );
  return response;
}
