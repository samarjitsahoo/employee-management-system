"use client";
import useFetchGetMethod from "@/hooks/FetchMethods/useFetchGetMethod";
import Table from "@/components/Table/table.component";
import DetailModal from "@/components/DetailModal/detail-modal.component";
import { useState } from "react";
import type { defaultData } from "@/constants/Types/response-data";
import SearchBox from "@/components/SearchBox/search-box.component";
import TotalCounter from "@/components/TotalCounter/total-counter.component";
import PaginationBar from "@/components/PaginationBar/pagination-bar.component";
import Loader from "@/components/Loader/loader.component";
import * as XLSX from "xlsx";

type serverData = {
  data: defaultData[] | null;
  pageCount: number;
};

export default function MainBody(): JSX.Element {
  const [data, setData] = useState<serverData | null>(null);
  const [modalDetailToShow, setModalDetailToShow] =
      useState<defaultData | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
  const [searchData, setSearchData] = useState<string>("");
  const [page, setPage] = useState<number>(0);

  useFetchGetMethod(
    "get-all-attendances",
    "both",
    (data: serverData | null) => setData(data),
    false,
    page,
    searchData
  );
  console.log(data);

  // Function to download data as CSV
  const downloadCSV = () => {
    if (!data?.data) return;
    const headers = ["Name", "Regd No", "Email", "Designation"];
    const rows = data.data.map((attendance) => [
      `${attendance.firstName} ${attendance.lastName}`,
      attendance.regdNo,
      attendance.email,
      attendance.designation,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const link = document.createElement("a");
    link.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csvContent);
    link.target = "_blank";
    link.download = "attendance.csv";
    link.click();
  };

  // Function to download data as Excel
  const downloadExcel = () => {
    if (!data?.data) return;
    const rows = data.data.map((attendance) => ({
      Name: `${attendance.firstName} ${attendance.lastName}`,
      "Regd No": attendance.regdNo,
      Email: attendance.email,
      Designation: attendance.designation,
    }));

    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Attendance");

    XLSX.writeFile(wb, "attendance.xlsx");
  };

  return (
    <div>
      {showModal && (
              <DetailModal
                data={modalDetailToShow}
                hide={() => setShowModal(false)}
              />
            )}
      <SearchBox updateSearchData={setSearchData} />
      <TotalCounter title="Total no. of employee present today" pageCount={data && data.pageCount} />
      {data && data.data && data.data.length > 0 ? (
        <div>
          <div className="mb-4">
            <button
              onClick={downloadCSV}
              className="px-4 py-2 bg-blue-600 text-white rounded-md mr-2"
            >
              Download CSV
            </button>
            <button
              onClick={downloadExcel}
              className="px-4 py-2 bg-green-600 text-white rounded-md"
            >
              Download Excel
            </button>
          </div>
          <Table
          handleRowDetailToShowInModal={(row) => {
            setModalDetailToShow(row);
            setShowModal(true);
          }}
            headers={["Employee Name", "Regd.ID", "Email ID", "Designation"]}
            data={data && data.data}
          />
          <PaginationBar
            page={page}
            pageCount={data && data.pageCount}
            incrementPage={setPage}
            decrementPage={setPage}
            setCustomPage={setPage}
          />
        </div>
      ) : data === null ? (
        <Loader title={"Loading..."} />
      ) : (
        <Loader title={"No data found"} />
      )}
    </div>
  );
}
