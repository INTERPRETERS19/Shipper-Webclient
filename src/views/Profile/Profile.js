import { useState, useEffect } from "react";
import "./Profile.css";
import {
  Button,
  Paper,
  Table,
  TableBody,
  Typography,
  TableContainer,
  TableCell,
  TableRow,
} from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import SideBar from "../../components/Sidebar";
import Client from "../../api/Client";
import photo from "../../assets/photo.png";

const Profile = () => {
  const [profile, setProfile] = useState();
  const currentUser = JSON.parse(localStorage.getItem("user"));
  console.log(currentUser.id);

  const getUser = async () => {
    const res = await Client.get(`profileShipper/${currentUser.id}`);
    if (res.data.success) {
      setProfile(res.data.data);
      console.log(res.data);
      console.log(res.data.data.email);
      console.log(profile.email);
      console.log("Success");
    } else {
      console.log("Failed");
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  const Info = ({ detail, value }) => {
    if (value !== "") {
      return (
        <TableRow>
          <TableCell component="th" scope="row">
            <Typography sx={{ fontWeight: "bold" }}>{detail}</Typography>
          </TableCell>
          <TableCell>
            <Typography>{value}</Typography>
          </TableCell>
        </TableRow>
      );
    } else {
      return <></>;
    }
  };

  return (
    <div className="Dashboard">
      <SideBar />

      <div className="main">
        <div className="title">
          <h1>View Profile</h1>
        </div>
        <div className="container">
          <div className="left">
            <div className="box1">
              <>
                <TableContainer component={Paper} sx={{ minWidth: 450 }}>
                  <Table
                    sx={{
                      minWidth: 450,
                    }}
                    aria-label="custom pagination table"
                  >
                    {profile && (
                      <TableBody
                        sx={{
                          paddingLeft: "100px",
                          margin: "30px",
                        }}
                      >
                        {/* <TableRow>{profile.email} </TableRow>
                        <TableRow>{profile.firstName} </TableRow>
                        <TableRow>{profile.lastName} </TableRow>
                        <TableRow>{profile.mobile_no} </TableRow>
                        <TableRow>{profile.street} </TableRow>
                        <TableRow>{profile.city} </TableRow>
                        <TableRow>{profile.district} </TableRow> */}
                        <Info detail="E-mail" value={profile.email} />
                        <Info detail="First Name" value={profile.firstName} />
                        <Info detail="Last Name" value={profile.lastName} />
                        <Info
                          detail="Mobile Number"
                          value={profile.mobile_no}
                        />
                        <Info detail="Street" value={profile.street} />
                        <Info detail="City" value={profile.city} />
                        <Info detail="District" value={profile.district} />
                      </TableBody>
                    )}
                  </Table>
                </TableContainer>

                <br />
                <Button
                  variant="contained"
                  endIcon={<EditRoundedIcon />}
                  sx={{
                    backgroundColor: "rgba(65, 137, 185, 0.8)",
                    width: "80%",
                    textAlign: "center",
                    justifyContent: "center",
                    height: 50,
                    alignSelf: "center",
                  }}
                >
                  Update User
                </Button>
              </>
            </div>
          </div>

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
