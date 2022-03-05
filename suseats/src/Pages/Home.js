import { Box } from "@mui/system";
import { AppBar, Button, Grid, Typography } from "@mui/material";
import Navbar from "../ComponentTemplates/Navbar";



export default function Home(props) {
  return (
    <Box
      sx={{
        height: "80vh",
        background: "linear-gradient(to bottom right, #57CC99, #38A3A5)",
      }}
    >
      <Navbar changePage={props.changePage} background="transparent" />
      <Grid
        container
        spacing={2}
        pt={{ xs: 10, sm: 15 }}
        px={2}
        justifyContent="flex-start"
      >
        <Grid item xs={12}>
          <Typography variant={"h1"} sx={{ color: "white" }}>
            EAT MORE SUS.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button
            pt={2}
            variant="outlined"
            sx={{ color: "white", borderColor: "white" }}
            onClick={() => {
              props.changePage("Sales");
            }}
          >
            find food.
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
