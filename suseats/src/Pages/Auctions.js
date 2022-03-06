import { Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import AuctionCard from "../ComponentTemplates/AuctionCard";
import Navbar from "../ComponentTemplates/Navbar";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
const { ethers } = require("ethers");

export default function Auctions(props) {
  const [priceFilter, setPriceFilter] = useState("");
  const [cuisineFilter, setCuisineFilter] = useState("");

  const [address, setAddress] = useState("");
  const [bidAmount, setBidAmount] = useState("");
  const [foodDescription, setFoodDescription] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [imageURL, setImageURL] = useState("");

  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      action: "getallauctions",
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
        setAuctions(result.auctions.reverse());
      })
      .catch((error) => console.log("error", error));
  }, []);

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
      console.log(b);
      return b;
    } else {
      console.log("no metamask");
    }
  }

  async function getRunningAuctions() {
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

      let b = await contract.getAuctions();
      return b;
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
  console.log(auctions);
  return (
    <Box>
      <Navbar
        changePage={props.changePage}
        background="linear-gradient(to bottom right, #57CC99, #38A3A5)"
      />
      {props.userType === "person" ? (
        <Box>
          <Grid container spacing={2} p={3} alignItems="center">
            {auctions.map((auction) => {
              return (
                <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
                  <AuctionCard
                    address={auction.address}
                    image={auction.imageurl}
                    restaurantName={auction.restaurantname}
                    description={auction.description}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Box>
      ) : (
        <Box>
          <Grid container p={3} spacing={2} justifyContent="center">
            <Grid item xs={12} sm={6}>
              <Box
                sx={{ background: "#FFF", borderRadius: "10px", py: 2, px: 2 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h4">Create an Auction</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Food Description"
                      onChange={(e) => {
                        setFoodDescription(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Cuisine"
                      onChange={(e) => {
                        setCuisine(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Image URL"
                      onChange={(e) => {
                        setImageURL(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <Button
                      variant="contained"
                      sx={{
                        color: "white",
                        background:
                          "linear-gradient(to bottom right, #57CC99, #38A3A5)",
                      }}
                      onClick={() => {
                        if (
                          cuisine !== "" &&
                          imageURL !== "" &&
                          foodDescription !== ""
                        ) {
                          makeAuction().then((list) => {
                            const mostRecent = list[list.length - 1];
                            var t = new Date();
                            t.setSeconds(t.getSeconds() + 120);
                            console.log(
                              props.user,
                              mostRecent,
                              imageURL,
                              cuisine,
                              foodDescription,
                              t.toString()
                            );
                            var myHeaders = new Headers();
                            myHeaders.append(
                              "Content-Type",
                              "application/json"
                            );

                            var raw = JSON.stringify({
                              action: "addauction",
                              restaurantid: props.user,
                              address: mostRecent,
                              imageurl: imageURL,
                              cuisine: cuisine,
                              description: foodDescription,
                              expiry: t,
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
                              .then((result) => console.log(result))
                              .catch((error) => console.log("error", error));
                          });
                        } else {
                          alert("Please ensure all categories are filled out.");
                        }
                      }}
                    >
                      Create Auction
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
}
