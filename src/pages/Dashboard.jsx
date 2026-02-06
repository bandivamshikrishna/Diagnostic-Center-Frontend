import { useSelector } from "react-redux";

export const Dashboard = () => {
  const userEmail = useSelector((state) => state.userDetails.user?.email);
  return (
    <>
      <p>Dashboard {userEmail}</p>
    </>
  );
};
