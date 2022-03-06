import { Box } from "@mui/system";
import { AppBar, Button, Grid, Typography } from "@mui/material";
import Navbar from "../ComponentTemplates/Navbar";
import sus from "../Images/sus.png";

export default function Home(props) {
  return (
    <Box>
      <Box
        className="animated-gradient"
        sx={{
          height: "80vh",
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
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="center"
            >
              <Grid
                item
                md={3}
                lg={2}
                sx={{ display: { xs: "none", sm: "none", md: "flex" }, p: 2 }}
              >
                <img src={sus} style={{ width: "250px", height: "auto" }} />
              </Grid>
              <Grid item xs={12} sm={12} md={9} lg={9}>
                <Grid container spacing={2} sx={{px: 2, mx: 2}}>
                  <Grid item xs={12}>
                    <Typography
                      variant={"h1"}
                      sx={{ color: "white", display: "inline" }}
                    >
                      EAT MORE SUS
                      <Typography sx={{ display: "inline" }} variant="h6">
                        tainably
                      </Typography>
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      pt={2}
                      variant="outlined"
                      sx={{ color: "white", borderColor: "white", display: "block" }}
                      onClick={() => {
                        props.changePage("Sales");
                      }}
                    >
                      find food.
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Grid container spacing={0} sx={{ pt: 2, textAlign: "center" }}>
        <Grid item xs={12}>
          <Box sx={{ p: 2, m: 2 }}>
            <Typography variant="h2">What Is SUSEATS?</Typography>
            <Typography paragraph sx={{ fontWeight: 300 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              et efficitur enim. Morbi ante magna, hendrerit sit amet nulla ac,
              auctor auctor velit. Integer ultricies hendrerit enim, at auctor
              enim dictum sed. Nulla facilisi. Aliquam pharetra sapien tellus,
              sed fringilla libero sodales ac. Donec ornare sem nec tellus
              laoreet, eget laoreet sem ornare. Etiam cursus purus sit amet nunc
              suscipit dapibus. Quisque vestibulum varius diam. Integer
              venenatis tempor ultrices. Morbi sagittis, urna in mollis ornare,
              elit sem tincidunt risus, eget ullamcorper nibh mi eget velit.
              Nulla sollicitudin risus turpis. Ut at lorem ac quam tempor cursus
              accumsan quis leo. In molestie lectus diam, sed euismod est ornare
              in. Pellentesque vel purus eu justo vehicula mollis. Etiam quis
              scelerisque ipsum. Nunc commodo elementum diam ut facilisis.
              Mauris aliquam ligula id risus accumsan, sit amet elementum eros
              commodo. Vivamus efficitur vitae dui sit amet feugiat. Nulla sed
              gravida metus, id ullamcorper mauris. Proin et malesuada lorem.
              Quisque nulla augue, mattis eu felis nec, dapibus porttitor nibh.
              Quisque sed porta tellus, et malesuada dolor. Etiam cursus mi non
              tellus eleifend pretium. Suspendisse ex lorem, tincidunt quis sem
              quis, fringilla suscipit dolor.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ p: 2, m: 2 }}>
            <Typography variant="h2">How to Use SUSEATS</Typography>
            <Typography paragraph sx={{ fontWeight: 300 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              et efficitur enim. Morbi ante magna, hendrerit sit amet nulla ac,
              auctor auctor velit. Integer ultricies hendrerit enim, at auctor
              enim dictum sed. Nulla facilisi. Aliquam pharetra sapien tellus,
              sed fringilla libero sodales ac. Donec ornare sem nec tellus
              laoreet, eget laoreet sem ornare. Etiam cursus purus sit amet nunc
              suscipit dapibus. Quisque vestibulum varius diam. Integer
              venenatis tempor ultrices. Morbi sagittis, urna in mollis ornare,
              elit sem tincidunt risus, eget ullamcorper nibh mi eget velit.
              Nulla sollicitudin risus turpis. Ut at lorem ac quam tempor cursus
              accumsan quis leo. In molestie lectus diam, sed euismod est ornare
              in. Pellentesque vel purus eu justo vehicula mollis. Etiam quis
              scelerisque ipsum. Nunc commodo elementum diam ut facilisis.
              Mauris aliquam ligula id risus accumsan, sit amet elementum eros
              commodo. Vivamus efficitur vitae dui sit amet feugiat. Nulla sed
              gravida metus, id ullamcorper mauris. Proin et malesuada lorem.
              Quisque nulla augue, mattis eu felis nec, dapibus porttitor nibh.
              Quisque sed porta tellus, et malesuada dolor. Etiam cursus mi non
              tellus eleifend pretium. Suspendisse ex lorem, tincidunt quis sem
              quis, fringilla suscipit dolor.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ p: 2, m: 2 }}>
            <Typography variant="h2">Frequently Asked Questions</Typography>
            <Typography paragraph sx={{ fontWeight: 300 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              et efficitur enim. Morbi ante magna, hendrerit sit amet nulla ac,
              auctor auctor velit. Integer ultricies hendrerit enim, at auctor
              enim dictum sed. Nulla facilisi. Aliquam pharetra sapien tellus,
              sed fringilla libero sodales ac. Donec ornare sem nec tellus
              laoreet, eget laoreet sem ornare. Etiam cursus purus sit amet nunc
              suscipit dapibus. Quisque vestibulum varius diam. Integer
              venenatis tempor ultrices. Morbi sagittis, urna in mollis ornare,
              elit sem tincidunt risus, eget ullamcorper nibh mi eget velit.
              Nulla sollicitudin risus turpis. Ut at lorem ac quam tempor cursus
              accumsan quis leo. In molestie lectus diam, sed euismod est ornare
              in. Pellentesque vel purus eu justo vehicula mollis. Etiam quis
              scelerisque ipsum. Nunc commodo elementum diam ut facilisis.
              Mauris aliquam ligula id risus accumsan, sit amet elementum eros
              commodo. Vivamus efficitur vitae dui sit amet feugiat. Nulla sed
              gravida metus, id ullamcorper mauris. Proin et malesuada lorem.
              Quisque nulla augue, mattis eu felis nec, dapibus porttitor nibh.
              Quisque sed porta tellus, et malesuada dolor. Etiam cursus mi non
              tellus eleifend pretium. Suspendisse ex lorem, tincidunt quis sem
              quis, fringilla suscipit dolor.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
