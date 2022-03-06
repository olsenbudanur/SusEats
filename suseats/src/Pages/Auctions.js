import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import AuctionCard from "../ComponentTemplates/AuctionCard";
import Navbar from "../ComponentTemplates/Navbar";
import Burrito from "../Images/Burrito.jpeg";
import { useState } from "react";
import { Slider } from "@mui/material";
import { AddRounded } from "@mui/icons-material";
import { Button } from "@mui/material";
const { ethers } = require("ethers");

export default function Auctions(props) {
  const [priceFilter, setPriceFilter] = useState("");
  const [cuisineFilter, setCuisineFilter] = useState("");

  const [address, setAddress] = useState("");
  const [bidAmount, setBidAmount] = useState("");
  async function makeAuction() {
    if (typeof window.ethereum !== "undefined") {
      //
      // Connect to metamask
      await window.ethereum.request({ method: "eth_requestAccounts" });

      //
      // The address of the Auction Factory
      const contractAddress = "0xc62a40087d0BBfbb2CD4d6CCaE29430F6176b7cc";

      const abi = [
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "auctions",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
          constant: true,
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "time",
              type: "uint256",
            },
          ],
          name: "createAuction",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "getAuctions",
          outputs: [
            {
              internalType: "address[]",
              name: "",
              type: "address[]",
            },
          ],
          stateMutability: "view",
          type: "function",
          constant: true,
        },
      ];

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      let a = await contract.createAuction(120);

      let b = await contract.getAuctions();
      console.log(a);
      console.log(b);
    } else {
      console.log("no metamask");
    }
  }

  async function bid() {
    //
    // Auction address is hardcoded, change that
    await window.ethereum.request({ method: "eth_requestAccounts" });
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
    // Bid value is hardcoded, change that
    const options = { value: ethers.utils.parseEther(bidAmount) };

    await contract.bid(options);
  }

  const sliderMarks = [
    {
      value: 1,
      label: "$",
    },
    {
      value: 2,
      label: "$$",
    },
    {
      value: 3,
      label: "$$$",
    },
    {
      value: 4,
      label: "$$$$",
    },
  ];
  console.log(address, bidAmount);
  return (
    <Box>
      <Navbar
        changePage={props.changePage}
        background="linear-gradient(to bottom right, #57CC99, #38A3A5)"
      />
      {props.userType === "person" ? (
        <Box>
          <Grid container spacing={2} p={3} alignItems="center">
            <Grid item xs={12}>
              <Box
                sx={{ background: "#FFF", borderRadius: "10px", py: 2, px: 2 }}
              >
                <Grid container spacing={2} alignItems="center">
                  {/*
                  <Grid item xs={6} md={3} sm={3} lg={2}>
                    <FormControl fullWidth>
                      <InputLabel id="price" sx={{ background: "#FFF" }}>
                        Price
                      </InputLabel>
                      <Select
                        value={priceFilter}
                        labelId="price"
                        lab="Filer by Price"
                        onChange={(e) => {
                          setPriceFilter(e.target.value);
                        }}
                      >
                        <MenuItem value="">None</MenuItem>
                        <MenuItem value="low-high">Price: low to high</MenuItem>
                        <MenuItem value="high-low">Price: high to low</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} md={3} sm={3} lg={2}>
                    <FormControl fullWidth>
                      <InputLabel id="price" sx={{ background: "#FFF" }}>
                        Cuisine
                      </InputLabel>
                      <Select
                        value={cuisineFilter}
                        labelId="price"
                        lab="Filer by Price"
                        onChange={(e) => {
                          setCuisineFilter(e.target.value);
                        }}
                      >
                        <MenuItem value="">None</MenuItem>
                        <MenuItem value="mexican">Mexican</MenuItem>
                        <MenuItem value="chinese">Chinese</MenuItem>
                        <MenuItem value="thai">Thai</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                    sm={6}
                    sx={{ p: 2, pt: 1, textAlign: "center" }}
                    lg={8}
                  >
                    <Slider
                      defaultValue={2}
                      step={1}
                      min={1}
                      max={4}
                      marks={sliderMarks}
                      sx={{ width: "80%" }}
                    />
                  </Grid>
                      */}
                  <Grid item sm={3}></Grid>
                  <Grid item xs={12} sm={2} md={2} lg={2}>
                    <TextField
                      fullWidth
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                      label="Auction Public Address"
                    ></TextField>
                  </Grid>
                  <Grid item xs={12} sm={2} md={2} lg={2}>
                    <TextField fullWidth onChange={(e) => {
                      setBidAmount(e.target.value);
                    }} label="Bid Amount"></TextField>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Button
                      variant="contained"
                      sx={{
                        color: "white",
                        background:
                          "linear-gradient(to bottom right, #57CC99, #38A3A5)",
                      }}
                      onClick={() => {
                        bid();
                      }}
                    >
                      Enter Bid
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
              <AuctionCard image={Burrito} />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
              <AuctionCard image={Burrito} />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
              <AuctionCard image={Burrito} />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
              <AuctionCard image={Burrito} />
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Box>
          <Grid container p={3} spacing={2} justifyContent="center">
            <Grid item>
              <Box
                className="auction-card"
                onClick={makeAuction}
                sx={{
                  background: "#FFF",
                  width: "60vw",
                  height: "60vh",
                  borderRadius: "10px",
                  py: 2,
                  px: 2,
                  textAlign: "center",
                }}
              >
                <AddRounded sx={{ fontSize: 300, fill: "#57CC99" }} />
                <Typography variant="h3">ADD AUCTION</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
}
