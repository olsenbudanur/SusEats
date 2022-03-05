import {
  Button,
  Drawer,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Box } from "@mui/system";
import AuctionCard from "../ComponentTemplates/AuctionCard";
import Navbar from "../ComponentTemplates/Navbar";
import Burrito from "../Images/Burrito.jpeg";
import { Typography } from "@mui/material";
import { AppBar } from "@mui/material";
import { Filter, FilterAlt } from "@mui/icons-material";
import { useState } from "react";
import { Slider } from "@mui/material";

export default function Auctions(props) {
  const [priceFilter, setPriceFilter] = useState("");
  const [cuisineFilter, setCuisineFilter] = useState("");

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
  return (
    <Box>
      <Navbar
        changePage={props.changePage}
        background="linear-gradient(to bottom right, #57CC99, #38A3A5)"
      />
      <Box>
        <Grid container spacing={2} p={3} alignItems="center">
          <Grid item xs={12}>
            <Box
              sx={{ background: "#FFF", borderRadius: "10px", py: 2, px: 2 }}
            >
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={6} md={3} sm={3} lg={2}>
                  <FormControl fullWidth>
                    <InputLabel id="price" sx={{background: "#FFF"}}>Price</InputLabel>
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
                    <InputLabel id="price" sx={{background: "#FFF"}}>Cuisine</InputLabel>
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
                  lg={4}
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
    </Box>
  );
}
