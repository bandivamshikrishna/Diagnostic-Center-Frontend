import { useSelector } from "react-redux";

export const Dashboard = () => {
  const userEmail = useSelector((state) => state.UserSlice.user.email);
  return (
    <>
      <p>Dashboard {userEmail}</p>
    </>
  );
};
