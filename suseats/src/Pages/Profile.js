import { Box } from "@mui/system";
import { useState } from "react";
import Navbar from "../ComponentTemplates/Navbar";

import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { Grid, TextField, Typography } from "@mui/material";
import { Button } from "@mui/material";
const { ethers } = require("ethers");

const cuisines = ["Mexican", "Thai", "Chinese"];

export default function Profile(props) {
  const [foodPrefs, setFoodPrefs] = useState([]);
  const [userType, setUserType] = useState("");

  const [loginIdentifier, setLoginID] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [auctionToEnd, setAuctionToEnd] = useState("");

  async function endAuction(address) {
    //
    console.log(address)
    await window.ethereum.request({ method: "eth_requestAccounts" });
    // Auction address is hardcoded, change that
    const auctionAddress = address;
    const abi = [
      {
        inputs: [
          {
            internalType: "uint256",
            name: "biddingTime",
            type: "uint256",
          },
          {
            internalType: "address payable",
            name: "beneficiaryAddress",
            type: "address",
          },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        inputs: [],
        name: "AuctionAlreadyEnded",
        type: "error",
      },
      {
        inputs: [],
        name: "AuctionEndAlreadyCalled",
        type: "error",
      },
      {
        inputs: [],
        name: "AuctionNotYetEnded",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "highestBid",
            type: "uint256",
          },
        ],
        name: "BidNotHighEnough",
        type: "error",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "address",
            name: "winner",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "AuctionEnded",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "address",
            name: "bidder",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "HighestBidIncreased",
        type: "event",
      },
      {
        inputs: [],
        name: "auctionEndTime",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "beneficiary",
        outputs: [
          {
            internalType: "address payable",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "highestBid",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "highestBidder",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "bid",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
      {
        inputs: [],
        name: "withdraw",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "auctionEnd",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ];

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(auctionAddress, abi, signer);

    //
    // No clue if this is necesary
    const options = { value: ethers.utils.parseEther("0.0001") };
    await contract.auctionEnd();
  }


  console.log(auctionToEnd);
  //name, email, phone, password, food pref., public key
  if (props.isAuthenticated) {
    return (
      <Box>
        <Navbar
          changePage={props.changePage}
          background="linear-gradient(to bottom right, #57CC99, #38A3A5)"
        />
        <Box sx={{ borderRadius: "10px", backgroundColor: "#FFF", p: 2, m: 2 }}>
          {userType === "person" ? (
            <Grid container spacing={2} p={2}>
              <Grid item xs={12}>
                <Typography variant="h4">Edit My Profile</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5">Basics</Typography>
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <TextField fullWidth label="First Name"></TextField>
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <TextField fullWidth label="Last Name"></TextField>
              </Grid>
              <Grid
                item
                sm={4}
                md={6}
                sx={{ display: { xs: "none", sm: "flex" } }}
              />
              <Grid item xs={12} sm={4} md={3}>
                <TextField fullWidth label="Email"></TextField>
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <TextField fullWidth label="Phone"></TextField>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5">
                  Tailor Your Recommendations
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <TextField fullWidth label="Address"></TextField>
              </Grid>
              <Grid item xs={12}>
                <FormControl sx={{ width: 300 }}>
                  <InputLabel
                    id="demo-multiple-checkbox-label"
                    sx={{ background: "#FFF" }}
                  >
                    Cuisine Preferences
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={foodPrefs}
                    onChange={(event) => {
                      setFoodPrefs(event.target.value);
                    }}
                    input={<OutlinedInput label="Cuisines" />}
                    renderValue={(selected) => selected.join(", ")}
                  >
                    {cuisines.map((cuisine) => (
                      <MenuItem key={cuisine} value={cuisine}>
                        <Checkbox checked={foodPrefs.indexOf(cuisine) > -1} />
                        <ListItemText primary={cuisine} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  sx={{
                    color: "white",
                    background:
                      "linear-gradient(to bottom right, #57CC99, #38A3A5)",
                  }}
                >
                  Submit Changes
                </Button>
              </Grid>
            </Grid>
          ) : (
            <Grid container spacing={2} p={2}>
              <Grid item xs={12}>
                <Typography variant="h4">Edit Restaurant Profile</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5">Basics</Typography>
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <TextField fullWidth label="Restaurant Name"></TextField>
              </Grid>
              <Grid
                item
                sm={8}
                md={9}
                sx={{ display: { xs: "none", sm: "flex" } }}
              />
              <Grid item xs={12} sm={4} md={3}>
                <TextField fullWidth label="Address"></TextField>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  sx={{
                    color: "white",
                    background:
                      "linear-gradient(to bottom right, #57CC99, #38A3A5)",
                  }}
                >
                  Submit Changes
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5">End Auctions</Typography>
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <TextField
                  fullWidth
                  onChange={(e) => {
                    setAuctionToEnd(e.target.value);
                  }}
                  label="Auction Public Key"
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  sx={{
                    color: "white",
                    background:
                      "linear-gradient(to bottom right, #57CC99, #38A3A5)",
                  }}
                  onClick={() => {
                    endAuction(auctionToEnd);
                  }}
                >
                  End Auction
                </Button>
              </Grid>
            </Grid>
          )}
        </Box>
      </Box>
    );
  } else {
    return (
      <Box>
        <Navbar
          changePage={props.changePage}
          background="linear-gradient(to bottom right, #57CC99, #38A3A5)"
        />
        <Box sx={{ borderRadius: "10px", backgroundColor: "#FFF", p: 2, m: 2 }}>
          <Grid container spacing={2} p={2}>
            <Grid item xs={12}>
              <Typography variant="h4">Log In</Typography>
            </Grid>
            {userType === "" ? (
              <Grid container spacing={2} sx={{ p: 2 }}>
                <Grid item xs={12}>
                  <Typography variant={"h5"}>I am a...</Typography>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      color: "white",
                      background:
                        "linear-gradient(to bottom right, #57CC99, #38A3A5)",
                    }}
                    onClick={() => {
                      setUserType("person");
                    }}
                  >
                    Person
                  </Button>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      color: "white",
                      background:
                        "linear-gradient(to bottom right, #57CC99, #38A3A5)",
                    }}
                    onClick={() => {
                      setUserType("restaurant");
                    }}
                  >
                    Restaurant
                  </Button>
                </Grid>
              </Grid>
            ) : null}
            {userType === "person" || userType === "restaurant" ? (
              <Grid container spacing={2} sx={{ p: 2 }}>
                <Grid item xs={12} sm={4} md={3}>
                  <TextField
                    fullWidth
                    label={userType === "person" ? "Email" : "Public Key"}
                    onChange={(e) => {
                      setLoginID(e.target.value);
                    }}
                  ></TextField>
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                  <TextField
                    type="password"
                    fullWidth
                    label="Password"
                    onChange={(e) => {
                      setLoginPassword(e.target.value);
                    }}
                  ></TextField>
                </Grid>
                <Grid item sm={4} />
                <Grid item xs={6} md={3}>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      color: "white",
                      background:
                        "linear-gradient(to bottom right, #57CC99, #38A3A5)",
                    }}
                    onClick={() => {
                      var myHeaders = new Headers();
                      myHeaders.append("Content-Type", "application/json");

                      var raw =
                        userType === "person"
                          ? JSON.stringify({
                              action: "login",
                              email: loginIdentifier,
                              password: loginPassword,
                            })
                          : JSON.stringify({
                              action: "loginrest",
                              pubkey: loginIdentifier,
                              password: loginPassword,
                            });

                      var requestOptions = {
                        method: "POST",
                        headers: myHeaders,
                        body: raw,
                        redirect: "follow",
                      };

                      fetch(
                        "https://us-central1-aiot-fit-xlab.cloudfunctions.net/suseats",
                        requestOptions
                      )
                        .then((response) => response.text())
                        .then((result) => {
                          console.log(result);
                          result = JSON.parse(result);
                          console.log(result);
                          console.log(result["status"]);

                          if (result.status === "success") {
                            props.setAuthenticated(true);
                            props.setUser(result.userid);
                            props.setUserType(userType);
                          }
                        })
                        .catch((error) => console.log("error", error));
                    }}
                  >
                    Log In
                  </Button>
                </Grid>
                <Grid item xs={4} md={3}>
                  <Button fullWidth variant="text">
                    Register
                  </Button>
                </Grid>
              </Grid>
            ) : null}
          </Grid>
        </Box>
      </Box>
    );
  }
}
