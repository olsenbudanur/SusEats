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

const cuisines = ["Mexican", "Thai", "Chinese"];

export default function Profile(props) {
  const [foodPrefs, setFoodPrefs] = useState([]);

  return (
    <Box>
      <Navbar
        changePage={props.changePage}
        background="linear-gradient(to bottom right, #57CC99, #38A3A5)"
      />
      <Box sx={{ borderRadius: "10px", backgroundColor: "#FFF", p: 2, m: 2 }}>
        <Grid container spacing={2} p={2}>
          <Grid item xs={12}>
            <Typography variant="h4">Edit My Profile</Typography>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <TextField fullWidth label="First Name"></TextField>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <TextField fullWidth label="Last Name"></TextField>
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
          <Grid item xs={4}>
            <Button variant="contained" sx={{color: "white", background: "linear-gradient(to bottom right, #57CC99, #38A3A5)"}}>Submit Changes</Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
