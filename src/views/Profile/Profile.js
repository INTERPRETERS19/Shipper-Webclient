import { useState, useEffect } from "react";
import "./Profile.css";
import SideBar from "../../components/Sidebar";
import Client from "../../api/Client";

const SHIPPER_ID = "62aa2102e556536279786217";

const Profile = () => {
  const [user, setUser] = useState();
  useEffect(() => {
    getUser(SHIPPER_ID);
  }, []);

  const getUser = async (userId) => {
    await Client.get("/profile", { _id: SHIPPER_ID })
      .then((response) => {
        setUser(response);
        console.log(response);
      })
      .catch((err) => {
        console.log("Unable to get profile");
      });
  };
  return (
    <div className="rootp">
      <SideBar />

      <div className="mainp">
        <div className="titleP">
          <h1>View Profile</h1>
        </div>

        {user && (
          <div className="Full">
            <div className="widgetssBig">
              <div>
                <h4>First Name</h4>
              </div>

              <div className="field">{user.data.firstName}</div>
            </div>
            <div className="widgetssBig">
              <div>
                <h4>Last Name</h4>
              </div>

              <div className="field">{user.data.lastName}</div>
            </div>
            <div className="widgetssBig">
              <div>
                <h4>Email</h4>
              </div>

              <div className="field">{user.data.email}</div>
            </div>
            <div className="widgetssBig">
              <div>
                <h4>Street</h4>
              </div>

              <div className="field">{user.data.street}</div>
            </div>
            <div className="widgetssBig">
              <div>
                <h4>District</h4>
              </div>

              <div className="field">{user.data.district}</div>
            </div>
            <div className="widgetssBig">
              <div>
                <h4>City</h4>
              </div>

              <div className="field">{user.data.city} </div>
            </div>
            <div className="widgetssBig">
              <div>
                <h4>MobileNumber</h4>
              </div>

              <div className="field">{user.data.mobile_no}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
