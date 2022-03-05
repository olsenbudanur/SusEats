import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import AuctionCard from "../ComponentTemplates/AuctionCard";
import Navbar from "../ComponentTemplates/Navbar";
import Burrito from "../Images/Burrito.jpeg"

export default function Auctions(props) {
  return (
    <Box>
      <Navbar
        changePage={props.changePage}
        background="linear-gradient(to bottom right, #57CC99, #38A3A5)"
      />
      <Grid container spacing={2} p={2}>
        <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
        <AuctionCard image={Burrito}/>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
        <AuctionCard image={Burrito}/>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
        <AuctionCard image={Burrito}/>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
        <AuctionCard image={Burrito}/>
        </Grid>
      </Grid>
    </Box>
  );
}
