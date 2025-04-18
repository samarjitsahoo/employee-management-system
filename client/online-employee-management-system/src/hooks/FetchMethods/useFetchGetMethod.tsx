"use client";
import { useEffect } from "react";
import { getUrl } from "@/constants/url";

import { RootState } from "@/lib/store";
import { useSelector, useDispatch } from "react-redux";
import {
  setStartLoadingTrue,
  setStartLoadingFalse,
} from "@/lib/features/MainLoading/mainLoadingSlice";

const useFetchGetMethod = (
  endpoint: string,
  role: string,
  callback: (data:  null) => void,
  shouldReverse: boolean = false,
  page?: number,
  specificSearch?: string
) => {
  const dispatch = useDispatch();

  const token = useSelector((state: RootState) => state.authDetail.token);

  const fetchData = async () => {
    fetch(`${getUrl()}/${endpoint}?shouldReverse=${shouldReverse}${page ? `&page=${page}` : ""}${specificSearch ? `&specificSearch=${specificSearch}` : ""}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        role: role,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        callback(data);
      })
      .finally(() => {
        dispatch(setStartLoadingFalse());
      });
  };

  useEffect(() => {
    dispatch(setStartLoadingTrue());
    fetchData();
  }, [page && page, specificSearch && page === 0 && specificSearch]);
};

export default useFetchGetMethod;
