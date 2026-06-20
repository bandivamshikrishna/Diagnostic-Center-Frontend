import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { logoutUser, setAuthChecked } from "../features/UserSlice";
import { userDetailsAPI } from "./UserDetails";

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_API_BASE_URL}`,
  credentials: "include",
});

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  //   const navigate = useNavigate();
  let result = await baseQuery(args, api, extraOptions);


  if (result?.error?.status === 401) {
    const refreshResult = await baseQuery(
      "/user/refreshToken",
      api,
      extraOptions,
    );
    if (refreshResult?.meta.response.status === 200) {
      const accessToken =
        refreshResult.meta.response.headers.get("Authorization");
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
      }
      args.headers.Authorization = accessToken;
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logoutUser());
      api.dispatch(setAuthChecked(true));
      api.dispatch(userDetailsAPI.util.resetApiState());
      //   navigate("/login", { replace: true });
    }
  }
  return result;
};
