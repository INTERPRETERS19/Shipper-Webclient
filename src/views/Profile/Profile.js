import { useState, useEffect } from "react";
import "./Profile.css";
import SideBar from "../../components/Sidebar";
import Client from "../../api/Client";
import photo from "../../assets/photo.png";
import Button from "@mui/material/Button";
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
    <div className="Dashboard">
      <SideBar />

      <div className="main">
        <div className="title">
          <h1>View Profile</h1>
        </div>
        <div className="container">
          {user && (
            <div className="left">
              <div className="box1">
                <div className="widgetssBig">
                  <h3>First Name</h3>
                  <div className="colon">:</div>

                  <div className="field">{user.data.firstName}</div>
                </div>
                <div className="widgetssBig">
                  <tr>
                    <h3>Last Name</h3>
                  </tr>
                  <tr>
                    {" "}
                    <div className="colon">:</div>
                  </tr>

                  <tr>
                    {" "}
                    <div className="field">{user.data.lastName}</div>
                  </tr>
                </div>
                <div className="widgetssBig">
                  <h3>Email</h3>
                  <div className="colon">:</div>

                  <div className="field">{user.data.email}</div>
                </div>
                <div className="widgetssBig">
                  <h3>Street</h3>
                  <div className="colon">:</div>

                  <div className="field">{user.data.street}</div>
                </div>
                <div className="widgetssBig">
                  <h3>District</h3>
                  <div className="colon">:</div>

                  <div className="field">{user.data.district}</div>
                </div>
                <div className="widgetssBig">
                  <h3>City</h3>
                  <div className="colon">:</div>
                  <div className="field">{user.data.city} </div>
                </div>
                <div className="widgetssBig">
                  <h3>MobileNumber</h3>
                  <div className="colon">:</div>

                  <div className="field">{user.data.mobile_no}</div>
                </div>
              </div>
            </div>
          )}
          <div className="right">
            <div className="box2">
              <div
                style={{
                  alignSelf: "center",
                  textAlign: "center",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img src={photo} alt="logo" height="100" width="100" />
              </div>
              <br />
              <div className="head">
                <p> Click here to upload your profile photo from your media.</p>
              </div>
              <br />
              <br />
              <Button
                variant="contained"
                type="submit"
                sx={{
                  backgroundColor: "#001E3C",
                  width: "70%",
                  textAlign: "center",
                  justifyContent: "center",
                  height: 50,
                  alignSelf: "center",
                }}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
