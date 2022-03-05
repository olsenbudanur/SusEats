import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useState } from "react";

export default function AuctionCard(props) {
  const [hearted, setHearted] = useState(false);

  return (
    <Box
      className="auction-card"
      sx={{
        width: "100%",
        height: "100%",
        background: "#FFF",
        borderRadius: "10px",
      }}
    >
      <img
        src={props.image}
        alt={props.alt}
        style={{ width: "100%", borderRadius: "20px" }}
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
              The Taco Stand
            </Typography>
            <Typography sx={{ fontSize: 18 }} paragraph>
              Chicken Burrito
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
              0.52
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ background: "#EEE", borderRadius: "0 0 10px 10px" }}>
        <Grid container spacing={0} sx={{ py: 1, px: 3, textAlign: "right" }}>
          <Grid item xs={12}>
            {hearted ?<Favorite sx={{fill: "red"}} onClick={() => {setHearted(false)}}/> : <FavoriteBorder className="heart-icon" onClick={() => {setHearted(true)}}/>}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
