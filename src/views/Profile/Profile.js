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
import Alert from "../../components/Alert";
const Profile = () => {
  const [profile, setProfile] = useState();
  const currentUser = JSON.parse(localStorage.getItem("user"));
  console.log(currentUser.id);
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [selectedFile, setSelectedFile] = useState();

  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFile(file);
    setFileInputState(e.target.value);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      uploadImage(reader.result);
    };
    reader.onerror = () => {
      console.error("AHHHHHHHH!!");
      setErrMsg("something went wrong!");
    };
  };

  const uploadImage = async (base64EncodedImage) => {
    try {
      // await fetch('/api/upload', {
      //     method: 'POST',
      //     body: JSON.stringify({ data: base64EncodedImage }),
      //     headers: { 'Content-Type': 'application/json' },
      // });
      const res = await Client.post(`uploadImage/${currentUser.id}`, {
        data: base64EncodedImage,
      });

      if (res.data.success) {
        setProfile(res.data.data);
        setFileInputState("");
        setPreviewSource("");
        setSuccessMsg("Image uploaded successfully");
        console.log(res.data);
        console.log("Success");
      } else {
        console.log("Failed");
      }
    } catch (err) {
      console.error(err);
      setErrMsg("Something went wrong!");
    }
  };

  const getUser = async () => {
    const res = await Client.get(`profileShipper/${currentUser.id}`);
    if (res.data.success) {
      setProfile(res.data.data);
      console.log(res.data);
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
                <TableContainer component={Paper} sx={{ minWidth: 410 }}>
                  <Table
                    sx={{
                      minWidth: 420,
                    }}
                    aria-label="custom pagination table"
                  >
                    {profile && (
                      <TableBody
                        sx={{
                          paddingLeft: "100px",
                          margin: "20px",
                        }}
                      >
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
                  href={`/profile/updateprofile`}
                  endIcon={<EditRoundedIcon />}
                  sx={{ backgroundColor: "#0466c8" }}
                >
                  {" "}
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
                {previewSource !== "" ? (
                  <img
                    src={previewSource}
                    alt="chosen"
                    height="100"
                    width="100"
                    style={{ borderRadius: "50%" }}
                  />
                ) : profile !== undefined && profile.photo !== undefined ? (
                  <img
                    src={profile.photo}
                    alt="logo"
                    height="120"
                    width="120"
                    style={{ borderRadius: "50%" }}
                  />
                ) : (
                  <img src={photo} alt="logo" height="100" width="100" />
                )}
              </div>
              <br />
              <Alert msg={errMsg} type="danger" />
              <Alert msg={successMsg} type="success" />
              <div className="head">
                <p> Click here to upload your profile photo from your media.</p>
              </div>
              <br />
              <br />

              <div className="choose">
                <input
                  id="fileInput"
                  type="file"
                  name="image"
                  onChange={handleFileInputChange}
                  value={fileInputState}
                  className="form-input"
                  style={{
                    alignSelf: "center",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                />
              </div>
              <Button
                variant="contained"
                // type="submit"
                onClick={handleSubmitFile}
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
