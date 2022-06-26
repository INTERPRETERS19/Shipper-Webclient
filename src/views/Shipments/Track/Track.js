import React, { useState, useEffect } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Sidebar from "../../../components/Sidebar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Track() {
  const [APIData, setAPIData] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    axios.get(`/allshipment/${currentUser.id}`).then((response) => {
      setAPIData(response.data.data);
      console.log(response.data.data);
    });
  }, []);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = APIData.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(APIData);
    }
  };

  return (
    <div className="root">
      <Sidebar />
      <div
        className="main"
        style={{ marginLeft: "280px", paddingTop: "100px" }}
      >
        <div></div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h4" sx={{ marginLeft: "30px" }}>
            <b>Track Shipments</b>
          </Typography>
          <br />
          <div className="Search">
            <TextField
              id="outlined-search"
              label="Track Your Shipment"
              type="search"
              sx={{
                alignSelf: "flex-end",
                float: "right",
                width: "400px",
                marginRight: "50px",
              }}
              onChange={(e) => searchItems(e.target.value)}
            />
          </div>
        </div>
        <br />
        <Item
          sx={{
            display: "flex",
            flexFlow: "wrap",
            padding: "2%",
            flexDirection: "row",
            alignSelf: "center",
            justifyContent: "center",
          }}
        >
          {searchInput.length > 0
            ? filteredResults.map((item) => {
                return (
                  <div
                    style={{
                      justifyItems: "inherit",
                      width: "30vw",
                    }}
                  >
                    <Card
                      sx={{
                        padding: "20px",
                        backgroundColor: "rgba(65, 137, 185, 0.2)",
                        margin: "10px",
                        textAlign: "left",
                      }}
                    >
                      <CardContent>
                        Shipment ID : {item.id} <br />
                        Recipient Name : {item.recipient_name}
                        <br />
                        Shipment Status : {item.current_status} <br />
                        Created Date : {item.created_at.substring(0, 10)}
                      </CardContent>
                    </Card>
                  </div>
                );
              })
            : APIData.map((item) => {
                // return (
                <Card>
                  <Card.Content>
                    <Card.Header>{item.id}</Card.Header>
                    <Card.Description>{item.recipient_name}</Card.Description>
                    <Card.Description>{item.current_status}</Card.Description>
                    <Card.Description>
                      {item.created_at.substring(0, 10)}
                    </Card.Description>
                  </Card.Content>
                </Card>;
              })}
        </Item>
      </div>
    </div>
  );
}
