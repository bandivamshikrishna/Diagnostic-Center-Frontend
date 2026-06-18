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

  console.log("The api call is ", args);
  console.log("The result is", result);

  if (result?.error?.status === 401) {
    console.log("calling refresh api");
    const refreshResult = await baseQuery(
      "/user/refreshToken",
      api,
      extraOptions,
    );
    console.log("The refresh result is ", refreshResult);
    if (refreshResult?.meta.response.status === 200) {
      console.log("Calling base query again");
      const accessToken =
        refreshResult.meta.response.headers.get("Authorization");
      console.log("The access token is ", accessToken);
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
      }
      console.log("The api value is ", api);
      console.log("The args", args);
      args.headers.Authorization = accessToken;
      console.log("The updated args", args);
      console.log("The extra ", extraOptions);
      result = await baseQuery(args, api, extraOptions);
    } else {
      console.log("Loggggotttt");
      api.dispatch(logoutUser());
      api.dispatch(setAuthChecked(true));
      api.dispatch(userDetailsAPI.util.resetApiState());
      //   navigate("/login", { replace: true });
    }
  }
  return result;
};
