"use client";
import { KeyboardEvent } from "react";
import { useState } from "react";
import Link from "next/link";
import Button from "@/components/Button/button.component";
import InputField from "../../InputField/Input-field.component";
import Toast from "@/components/Toast/toast.component";
import { getUrl } from "@/constants/url";
import { useRouter } from "next/navigation";
import type { toastType } from "@/constants/Types/local";

import { useDispatch } from "react-redux";
import { setDetail } from "@/lib/features/AuthDetail/authDetailSlice";
import {
  setStartLoadingTrue,
  setStartLoadingFalse,
} from "@/lib/features/MainLoading/mainLoadingSlice";

import { FaEye, FaEyeSlash } from "react-icons/fa"; // Eye icon imports

type propsType = {
  searchParams: searchParamsType;
};

type searchParamsType = {
  role: string;
};

export default function Login(props: propsType) {
  const router = useRouter();
  const dispatch = useDispatch();

  const [dataToSend, setDataToSend] = useState({
    username: "",
    password: "",
  });
  const [toast, setToast] = useState<toastType>({ show: false, message: "" });

  // State to handle visibility of password
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    console.log("dataToSend: ", dataToSend);
    dispatch(setStartLoadingTrue());
    fetch(`${getUrl()}/auth/${props.searchParams.role}-login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((res) => {
        // console.log(res)
        res.json().then((data) => {
          if (!data.error) {
            dispatch(setDetail(data));
            localStorage.setItem("OEMS-authDetail", JSON.stringify(data));
            router.push(`/Dashboard`);
          } else {
            setToast({ show: true, message: data.error });
          }
        });
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        dispatch(setStartLoadingFalse());
      });
  };

  const handleSubmitOnEnterKeyPress = (
    event: KeyboardEvent<HTMLFormElement>
  ) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };
  console.log(dataToSend);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="text-center p-4" style={{ fontFamily: "Lora, serif" }}>
      <Toast
        show={toast.show}
        hide={() => setToast({ show: false, message: "" })}
        message={toast.message}
      />
      <div className="">
        <div className="text-3xl my-4 capitalize">
          {props.searchParams.role} Login
        </div>
        <form onKeyDown={handleSubmitOnEnterKeyPress}>
          <div className="bg-blue-300 min-w-1 max-w-96 rounded mx-auto p-10">
            <InputField
              updateDataToSend={(data) =>
                setDataToSend({ ...dataToSend, username: data })
              }
              label={props.searchParams.role + " username"}
              type="text"
              placeholder={"Enter " + props.searchParams.role + " username"}
            />

            {/* Password Field with Eye Icon for visibility toggle */}
            <div className="relative">
              <InputField
                updateDataToSend={(data) =>
                  setDataToSend({ ...dataToSend, password: data })
                }
                label={"Password"}
                type={showPassword ? "text" : "password"}
                placeholder={"Enter password"}
              />
              <div
                className="absolute top-11 right-3 transform -translate-y-1/2 cursor-pointer text-black"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </div>
            </div>

            <div className="mt-14">
              <Button onClick={handleSubmit}>Enter</Button>
            </div>
          </div>
        </form>
        <div>
          Do not have an account? Click here to &nbsp;
          <Link className="text-blue-200" href={"/Auth?type=signup"}>
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
