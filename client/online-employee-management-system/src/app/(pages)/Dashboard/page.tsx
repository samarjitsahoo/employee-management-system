"use client";
import { useEffect, useState } from "react";
import useFetchGetMethod from "@/hooks/FetchMethods/useFetchGetMethod";
import type { noticeData } from "@/constants/Types/response-data";
import HeroHeader from "@/components/Dashboard/HeroHeader/hero-header.component";
import HeroContent from "@/components/Dashboard/HeroContent/hero-content.component";
import SubHeaderContainer from "@/components/Dashboard/SubHeaderContainer/sub-header-container.component";

interface Employee {
  employeeId: string;
  username: string;
  firstName: string;
  lastName: string;
}

type serverData = {
  data: noticeData[] | null;
  pageCount: number;
}

export default function Dashboard() {
  const [topEmployee, setTopEmployee] = useState<Employee | null>(null);
  const [noticeData, setNoticeData] = useState<serverData | null>(null);

    useFetchGetMethod(
      "get-all-notices",
       "both", 
      (data: null | serverData) => setNoticeData(data),
      true
    )

  useEffect(() => {
    fetch("https://employee-management-system-nfjs.onrender.com/top-employees")
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setTopEmployee(data[0]);
        }
      })
      .catch((err) => console.error("Error fetching top employee:", err));
  }, []);

  return (
    <div>
      <HeroHeader
        greeting="Welcome"
        title="Hello"
        message="You can manage your things from here"
        showEmoji={true}
        showCurrentUserName={true}
        showSvg={true}
      />
      <SubHeaderContainer noticeData={noticeData && noticeData.data && noticeData.data.slice(0, 5)} />
      <HeroHeader
        greeting="We congratulate"
        title="Employee of the Year"
        message={
          topEmployee
            ? `#${topEmployee.employeeId} - ${topEmployee.firstName} ${topEmployee.lastName} (@${topEmployee.username})`
            : "Loading..."
        }
        showEmoji={false}
        showCurrentUserName={false}
        swapTextLocation={true}
        showSvg={false}
      />
      <HeroContent />
    </div>
  );
}
