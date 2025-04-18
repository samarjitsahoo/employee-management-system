"use client";
import styles from "./signup.module.scss";
import { KeyboardEvent } from "react";
import { useState } from "react";
import InputField from "../../InputField/Input-field.component";
import Button from "@/components/Button/button.component";
import RadioBtn from "@/components/RadioBtn/radio-btn.component";
import Link from "next/link";
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

type dataToSendType = {
  firstName: string;
  lastName: string;
  username: string;
  designation: string;
  department?: string;
  genderCode: string;
  employmentType: string;
  workExperience: number;
  dob: string;
  dateOfJoining: string;
  regdNo: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  secretCode: string;
};

export default function SignUp() {
  const dispatch = useDispatch();
  const router = useRouter();

  const currentDateAsStringInAnArray = (new Date()).toString().split(' ');

  const [dataToSend, setDataToSend] = useState<dataToSendType>({
    firstName: "",
    lastName: "",
    username: "",
    designation: "",
    department: "",
    genderCode: "",
    employmentType: "",
    workExperience: 0,
    dob: "",
    dateOfJoining: currentDateAsStringInAnArray[1] + "-" + currentDateAsStringInAnArray[2] + "-" + currentDateAsStringInAnArray[3],
    regdNo: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    secretCode: "",
  });
  const [toast, setToast] = useState<toastType>({ show: false, message: "" });

  const fetchData = async () => {
    fetch(`${getUrl()}/auth/${dataToSend.role}-signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          dispatch(setStartLoadingFalse());
          setToast({ show: true, message: data.error });
        } else {
          dispatch(setStartLoadingFalse());
          console.log("dataHere: ", data);
          dispatch(setDetail(data));
          localStorage.setItem("OEMS-authDetail", JSON.stringify(data));
          router.push(`/Dashboard`);
        }
        // console.log(data);
      });
  };

  const handleSubmit = () => {
    if (dataToSend.role === "") {
      setToast({ show: true, message: "Please select role" });
    } else {
      dispatch(setStartLoadingTrue());
      fetchData();
    }
  };

  const handleSubmitOnEnterKeyPress = (event: KeyboardEvent<HTMLFormElement>) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div
      className={`${styles.mainContainer} text-center flex flex-col p-5 sm:p-10 lg:p-20 justify-center`}
      style={{ fontFamily: "Lora, serif" }}
    >
      <Toast
        show={toast.show}
        hide={() => setToast({ show: false, message: "" })}
        message={toast.message}
      />
      <div className="mx-auto w-full">
        <div className="text-2xl sm:text-3xl mb-2">New user? Register here</div>
        <form onKeyDown={handleSubmitOnEnterKeyPress}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 justify-center items-start">
            <div className="col-span-1 mb-4 sm:mb-0">
              <div
                className={`${styles.roleSelection} flex flex-wrap justify-center text-white`}
              >
                <RadioBtn
                  label="Admin"
                  onRadioClick={() => setDataToSend({ ...dataToSend, role: "admin" })}
                />
                <RadioBtn
                  label="Employee"
                  onRadioClick={() => setDataToSend({ ...dataToSend, role: "employee" })}
                />
              </div>
            </div>
            <div className="col-span-1 sm:col-span-2 bg-blue-300 rounded p-4 sm:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField
                  updateDataToSend={(event) =>
                    setDataToSend({ ...dataToSend, firstName: event })
                  }
                  label="First name"
                  type="text"
                  placeholder="Enter First name"
                />
                <InputField
                  updateDataToSend={(event) =>
                    setDataToSend({ ...dataToSend, lastName: event })
                  }
                  label="Last name"
                  type="text"
                  placeholder="Enter Last name"
                />
                <InputField
                  updateDataToSend={(event) =>
                    setDataToSend({ ...dataToSend, username: event })
                  }
                  label="Username"
                  type="text"
                  placeholder="Choose username"
                />
                <InputField
                  updateDataToSend={(event) =>
                    setDataToSend({ ...dataToSend, regdNo: event })
                  }
                  label="Regd. No"
                  type="text"
                  placeholder="Enter Regd. No"
                />
                <InputField
                  updateDataToSend={(event) =>
                    setDataToSend({ ...dataToSend, designation: event })
                  }
                  label="Designation"
                  type="text"
                  placeholder="Enter Designation"
                />
                {dataToSend.role === "employee" && (
                  <InputField
                    updateDataToSend={(event) =>
                      setDataToSend({ ...dataToSend, department: event })
                    }
                    label="Department"
                    type="text"
                    placeholder="Enter Department"
                  />
                )}
                <InputField
                  updateDataToSend={(event) =>
                    setDataToSend({
                      ...dataToSend,
                      workExperience: parseInt(event),
                    })
                  }
                  label="Work Experience (in years)"
                  type="number"
                  placeholder="Enter Work Experience"
                />
                <InputField
                  updateDataToSend={(event) =>
                    setDataToSend({ ...dataToSend, employmentType: event })
                  }
                  label="Employment Type"
                  type="select"
                  selectList={["Full-time", "Part-time", "Contract", "Intern"]}
                  placeholder="Select Employment Type"
                />
                <InputField
                  updateDataToSend={(event) =>
                    setDataToSend({ ...dataToSend, genderCode: event })
                  }
                  label="Gender"
                  type="select"
                  selectList={["Male", "Female"]}
                  placeholder="Select Gender"
                />
                <InputField
                  updateDataToSend={(event) =>
                    setDataToSend({ ...dataToSend, dob: event })
                  }
                  label="Date of Birth"
                  type="date"
                  placeholder="Enter Date of Birth"
                />
                <InputField
                  updateDataToSend={(event) =>
                    setDataToSend({ ...dataToSend, email: event })
                  }
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                />
                <InputField
                  updateDataToSend={(event) =>
                    setDataToSend({ ...dataToSend, password: event })
                  }
                  label="Create password"
                  type="password"
                  placeholder="Enter password"
                />
                <InputField
                  updateDataToSend={(event) =>
                    setDataToSend({ ...dataToSend, confirmPassword: event })
                  }
                  label="Re-enter password"
                  type="password"
                  placeholder="Re-enter password"
                />
                <InputField
                  updateDataToSend={(event) =>
                    setDataToSend({ ...dataToSend, secretCode: event })
                  }
                  label="Authorized Pin"
                  type="text"
                  placeholder="Enter Authorized Pin"
                />
              </div>
              <div className="mt-4">
                <Button onClick={handleSubmit}>Submit</Button>
              </div>
              <div className="mt-4 text-black">
                By signing up, you indicate that you have read, understood and
                agree to Employeeverse&#39;s{" "}
                <Link className="text-blue-600" href={"/TermsOfService"}>
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link className="text-blue-600" href={"/PrivacyPolicy"}>
                  Privacy Policy
                </Link>{" "}
                <br />
              </div>
            </div>
          </div>
          I already have an account. Click here to &nbsp;
          <Link
            className="text-blue-200 login"
            href={"/Auth?type=login&role=employee"}
          >
            Log In
          </Link>
        </form>
      </div>
    </div>
  );
}
