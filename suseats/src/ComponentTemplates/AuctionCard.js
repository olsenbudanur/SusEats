import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import { Grid, TextField } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
const { ethers } = require("ethers");

export default function AuctionCard(props) {
  const [hearted, setHearted] = useState(false);
  const [bidAmount, setBidAmount] = useState("");
  const address = props.address;
  const id = props.id;

  const [price, setPrice] = useState(0.0);

  const fetchPrice = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      action: "getbidsbyauction",
      auctionid: id,
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
        result = JSON.parse(result);
        let maxBid = 0.0;
        result.bids.forEach((item) => {
          console.log(item)
          if (parseFloat(item.amount) > maxBid) {
            maxBid = parseFloat(item.amount);
          }
        })
        setPrice(maxBid);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    fetchPrice();
  })

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
  return (
    <Box
      className="auction-card"
      sx={{
        width: "100%",
        background: "#FFF",
        borderRadius: "10px",
      }}
    >
      <img
        src={props.image}
        alt={props.alt}
        style={{
          objectFit: "cover",
          width: "100%",
          height: "40vh",
          borderRadius: "20px",
        }}
      />
      <Box sx={{ p: 2 }}>
        <Grid
          container
          spacing={0}
          sx={{ py: 0, px: 1 }}
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={8}>
            <Typography
              sx={{ fontSize: 18, py: 0, m: 0, color: "#888" }}
              paragraph
            >
              {props.restaurantName}
            </Typography>
            <Typography sx={{ fontSize: 18 }} paragraph>
              {props.description}
            </Typography>
          </Grid>
          <Grid item xs={4} sx={{ textAlign: "right" }}>
            <Typography
              paragraph
              sx={{ fontSize: 14, py: 0, m: 0, color: "#888" }}
            >
              Price:
            </Typography>
            <Typography paragraph sx={{ fontSize: 22 }}>
              {price} ETH
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Bid Amount"
              onChange={(e) => {
                setBidAmount(e.target.value);
              }}
            ></TextField>
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              sx={{
                color: "white",
                background:
                  "linear-gradient(to bottom right, #57CC99, #38A3A5)",
              }}
              onClick={() => {
                console.log(props.user)
                if (props.user !== "" && props.user !== undefined) {
                  var myHeaders = new Headers();
                  myHeaders.append("Content-Type", "application/json");

                  var raw = JSON.stringify({
                    action: "addbid",
                    auctionid: id,
                    userid: props.user,
                    amount: parseFloat(bidAmount),
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
                      alert("Bid Successfully Placed!");
                      fetchPrice();
                    }
                    )
                    .catch((error) => console.log("error", error));
                } else {
                  alert("Log in before placing a bid");
                }
              }}
            >
              Enter Bid
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ background: "#EEE", borderRadius: "0 0 10px 10px" }}>
        <Grid container spacing={0} sx={{ py: 1, px: 3, textAlign: "right" }}>
          <Grid item xs={12}>
            {hearted ? (
              <Favorite
                sx={{ fill: "red" }}
                onClick={() => {
                  setHearted(false);
                }}
              />
            ) : (
              <FavoriteBorder
                className="heart-icon"
                onClick={() => {
                  setHearted(true);
                }}
              />
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
