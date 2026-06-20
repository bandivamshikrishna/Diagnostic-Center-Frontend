import { Outlet } from "react-router";
import { useGetCurrentUserDetailsQuery } from "../redux/apis/UserDetails";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { Loading } from "./Loading";
import {
  logoutUser,
  setUserDetails,
  setAuthChecked,
} from "../redux/features/UserSlice";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

export const ProtectedLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthChecked } = useSelector((state) => state.UserSlice);
  const { email } = useSelector((state) => state.UserSlice?.user);
  const accessToken = localStorage.getItem("accessToken");


  const { data, isLoading, error } = useGetCurrentUserDetailsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: isAuthChecked && email != "",
  });
  useEffect(() => {
    if (data) {
      dispatch(setAuthChecked(true));
      dispatch(setUserDetails(data));
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (
      error?.status === 401 ||
      accessToken == null ||
      accessToken == undefined ||
      accessToken == ""
    ) {
      dispatch(logoutUser());
      dispatch(setAuthChecked(true));
      navigate("/login", { replace: true });
    }
  }, [error, dispatch, navigate, accessToken]);

  return (
    <>
      {isLoading && <Loading />}
      <Outlet />
    </>
  );
};
