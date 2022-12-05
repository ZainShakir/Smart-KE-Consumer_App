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
    "http://192.168.10.4:3080/consumer/register",
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
  const response = await axios.post("http://192.168.10.4:3080/consumer/login", {
    email: email,
    password: password,
  });
  const token = response.data;
  return token;
}

export async function ResetPass(email) {
  const response = await axios.post(
    "http://192.168.10.4:3080/consumer/forgot-pass",
    {
      email: email,
    }
  );
  return response;
}

export async function GetDetails(token) {
  const response = await axios.get(
    `http://192.168.10.4:3080/consumer/useprofile`,
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
    `http://192.168.10.4:3080/consumer/editprofile`,
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
  const response = await axios.patch(
    `http://192.168.10.4:3080/consumer/editprofile`,
    { photo: img },
    {
      headers: {
        "x-access-token": token,
      },
    }
  );
  return response;
}

export async function check_prime(token) {
  const response = await axios.get(
    `http://192.168.10.4:3080/account/checkprime`,
    {
      headers: {
        "x-access-token": token,
      },
    }
  );

  return response;
}

export async function get_prime(token) {
  const response = await axios.get(
    `http://192.168.10.4:3080/account/paccount`,
    {
      headers: {
        "x-access-token": token,
      },
    }
  );

  return response;
}

export async function add_acc(token, account_no, name, status) {
  const response = await axios.post(
    `http://192.168.10.4:3080/account/addaccount`,
    {
      account_no: account_no,
      status: status,
      name: name,
    },
    {
      headers: {
        "x-access-token": token,
      },
    }
  );
  return response;
}

export async function accounts(token) {
  const response = await axios.get(
    `http://192.168.10.4:3080/account/saccount`,
    {
      headers: {
        "x-access-token": token,
      },
    }
  );
  return response;
}

export async function setprime(token, acc_no) {
  const response = await axios.patch(
    `http://192.168.10.4:3080/account/setprime`,
    {
      acc_no: acc_no,
    },
    {
      headers: {
        "x-access-token": token,
      },
    }
  );
  return response;
}

export async function create_complain(
  token,
  acc_no,
  complain_type,
  Details,
  affected_area
) {
  const response = await axios.post(
    `http://192.168.10.4:3080/user_complain/create_complain`,
    {
      complain_type: complain_type,
      Details: Details,
      Account_no: acc_no,
      affected_area: affected_area,
    },
    {
      headers: {
        "x-access-token": token,
      },
    }
  );
  return response;
}

export async function get_complains(token, acc_no) {
  const response = await axios.get(
    `http://192.168.10.4:3080/user_complain/get_complains/${acc_no}`,
    {
      headers: {
        "x-access-token": token,
      },
    }
  );
  return response;
}

export async function delete_acc(token, acc_no) {
  const response = await axios.delete(
    `http://192.168.10.4:3080/account/daccount`,
    {
      headers: {
        "x-access-token": token,
      },
      data: {
        acc_no: acc_no,
      },
    }
  );
  return response.data;
}
