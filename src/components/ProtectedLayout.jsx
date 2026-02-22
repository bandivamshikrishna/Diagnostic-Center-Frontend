import { Outlet } from "react-router";
import {
  useGetCurrentUserDetailsQuery,
  useLazyGetUserNewAccessTokenQuery,
} from "../redux/apis/UserDetails";
import { useDispatch } from "react-redux";
import { skipToken } from "@reduxjs/toolkit/query";
import { useEffect, useState } from "react";
import { Loading } from "./Loading";
import { logoutUser, setUserDetails } from "../redux/features/UserDetailsSlice";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

export const ProtectedLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const user = useSelector((state) => state.userDetails.user?.email);

  let showLoading = false;
  const callAPI = !accessToken || !user;
  console.log("The call api", callAPI);
  const [refreshing, setRefreshing] = useState(false);
  const { data, isLoading, refetch, isError, error, isSuccess } =
    useGetCurrentUserDetailsQuery(callAPI ? "" : skipToken);

  const [
    triggerRefresh,
    {
      isLoading: isRefreshingLoading,
      isSuccess: isRefreshSuccess,
      isError: isRefreshError,
    },
  ] = useLazyGetUserNewAccessTokenQuery();

  useEffect(() => {
    const handleRefresh = async () => {
      if (refreshing) return;
      setRefreshing(true);

      try {
        await triggerRefresh().unwrap();
        console.log("refresh api called");
        refetch();
      } catch (e) {
        console.log("the error is", e);
        dispatch(logoutUser());
        navigate("/login", { replace: true });
      }
    };

    if (isSuccess && data) {
      dispatch(setUserDetails(data));
    } else if ((isError && error?.status == "403") || !accessToken) {
      handleRefresh();
    } else if (isError) {
      console.log("The error is ", error);
    }
  }, [
    dispatch,
    data,
    triggerRefresh,
    refreshing,
    isRefreshSuccess,
    refetch,
    isRefreshError,
    navigate,
    accessToken,
    isRefreshingLoading,
    isSuccess,
    error,
    isError,
  ]);

  showLoading = isLoading || isRefreshingLoading;

  if (showLoading) return <Loading />;
  return <Outlet />;
};
