import React from "react";
import { useSelector } from "react-redux";
import { RootStateType } from "../../redux/reducers";

const ProfilePage: React.FC = () => {
  // const dispatch = useDispatch();
  const { user } = useSelector((state: RootStateType) => ({
    user: state.user.user
  }));
  return (
    <div>
      <div>
        <h1>Profile Page</h1>
      </div>
      <div>{user.name}</div>
    </div>
  );
};

export default ProfilePage;
