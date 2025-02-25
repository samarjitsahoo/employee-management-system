"use client";
import { useState } from "react";
import GiveResignation from "../GiveResignation/give-resignation.component";
import ApproveResignation from "../ApproveResignation/approve-resignation.component";
import useFetchGetMethod from "@/hooks/FetchMethods/useFetchGetMethod";
import Toast from "@/components/Toast/toast.component";
import { getUrl } from "@/constants/url";
import type { toastType } from "@/constants/Types/local";
import type { defaultData } from "@/constants/Types/response-data";

import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";

type dataToSendType = {
    reason: string;
};

export default function MainBody() {

    const [data, setData] = useState<defaultData[] | null>(null);
    const [dataToSend, setDataToSend] = useState<dataToSendType>({
        reason: "",
    });
    const [toast, setToast] = useState<toastType>({ show: false, message: "" });
    const { role, token } = useSelector((state: RootState) => state.authDetail);

        useFetchGetMethod('get-all-resign-applications', 'admin', (data: defaultData[] | null) => setData(data));

    const handleGiveResignation = () => {
        fetch(`${getUrl()}/add-resign`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                role: "employee",
            },
            body: JSON.stringify(dataToSend),
        })
            .then((res) => res.json())
            .then((data) => {
                setToast({ show: true, message: data.message ? data.message : data.error });
            })
    }

    const handleAction = async (id: string, action: string) => {
        const response = await fetch(`${getUrl()}/resign-action`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
              role: "admin",
            },
            body: JSON.stringify({ _id: id, action: action }),
          });
          const data = await response.json();
          console.log("data: ", data);
          window.location.reload();
    }

    console.log(dataToSend);

    return (
        <div className="font-times">
            <Toast show={toast.show} hide={() => setToast({ show: false, message: "" })} message={toast.message} />
            {
                role === "admin" ? <ApproveResignation data={data} handleAction={handleAction} /> : <GiveResignation updateDataToSend={(e) => setDataToSend({ ...dataToSend, reason: e })} submit={handleGiveResignation} />
            }
        </div>
    );
}