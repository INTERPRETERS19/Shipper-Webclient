import React, { useState, useEffect } from "react";
import { Card, CardContent, Grid, Button } from "@mui/material";
import { TableBody, Typography, TableCell, TableRow } from "@mui/material";
import QRCode from "qrcode";
import SideBar from "../../components/Sidebar";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { useLocation } from "react-router-dom";
import Client from "../../api/Client";
function QrCode() {
  const location = useLocation();
  const [text, setText] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [ShipmentInfo, setShipmentInfo] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const getShipmentInfo = async () => {
    const res = await Client.get(`shipmentInfo/${location.state.id}`);
    setIsLoading(true);
    if (res.data.success) {
      setShipmentInfo(res.data.data);
      console.log(res.data);

      console.log("Success");
      setIsLoading(false);
    } else {
      console.log("Failed");
    }
  };
  // console.log(location.state.id);
  console.log(ShipmentInfo);
  useEffect(() => {
    getShipmentInfo();
  }, []);

  function clickHandler() {
    const qrText = `Shipment ID: ${ShipmentInfo.id},
      \nRecipient name:${ShipmentInfo.recipient_name},
      \nMobile Number:${ShipmentInfo.mobile_phone_number},
     \nStreet:${ShipmentInfo.r_no_street},
      \nCity:${ShipmentInfo.r_city},
      \nDistrict:${ShipmentInfo.r_district},
     \nCOD:${ShipmentInfo.COD},
     `;

    console.log(qrText);
    generateQrCode(qrText);
  }

  const generateQrCode = async (qrText) => {
    try {
      const response = await QRCode.toDataURL(qrText);
      setImageUrl(response);
    } catch (error) {
      console.log(error);
    }
  };

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
    <div
      style={{
        width: "100vw",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <SideBar />
      <Card
        sx={{
          paddingLeft: "320px",
          paddingTop: "65px",
        }}
      >
        <h1 className="title">Generate Shipment QR code</h1>
        <br />
        <h3 className="title">Shipment Info</h3>
        <br />
        {isLoading === "true" ? (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        ) : (
          ""
        )}
        <CardContent>
          <Grid container spacing={1}>
            {ShipmentInfo && (
              <TableBody sx={{ width: "40%", backgroundColor: "#f5f5f5" }}>
                <Info detail="ID" value={ShipmentInfo.id} />
                <Info
                  detail="Receipient Name"
                  value={ShipmentInfo.recipient_name}
                />
                <Info
                  detail="Mobile Number"
                  value={ShipmentInfo.mobile_phone_number}
                />
                <Info detail="Street" value={ShipmentInfo.r_no_street} />
                <Info detail="City" value={ShipmentInfo.r_city} />
                <Info detail="District" value={ShipmentInfo.r_district} />
                <Info detail="COD" value={ShipmentInfo.COD} />
                <br />
                <br />
                <br />
              </TableBody>
            )}
            <Grid
              item
              xl={7}
              sm={12}
              xs={12}
              sx={{
                alignSelf: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              {imageUrl ? (
                <a href={imageUrl} download>
                  <img src={imageUrl} alt="img" />
                </a>
              ) : null}
              <br />
              <br />
              <Button
                variant="contained"
                color="primary"
                onClick={() => clickHandler()}
                sx={{
                  backgroundColor: "#001E3C",
                  minWidth: "50%",
                  alignItems: "center",
                  textAlign: "center",
                  flexDirection: "column",
                  justifyContent: "center",
                  height: 50,
                }}
              >
                Generate
              </Button>
              <br />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}

export default QrCode;
