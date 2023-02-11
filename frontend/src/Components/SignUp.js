import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";

export default function SignUp() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = {
      name: data.get("name"),
      email: data.get("email"),
      town: data.get("town"),
      district: data.get("district"),
      state: data.get("state"),
      password: data.get("password"),
    };
    try {
      // const response = await axios.post(
      //   "http://localhost:7000/user/signup",
      //   user
      // );
      // const userdata = response.data;
      const response = await fetch("http://localhost:7000/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const userdata = await response.json();
      console.log("userdata", userdata);
    } catch (error) {
      console.log("error during signing up", error);
    }
  };

  return (
    <Grid
      item
      xs={12}
      sm={8}
      md={5}
      component={Paper}
      elevation={6}
      square
      className="signin_right_form"
      style={{
        boxShadow: "none",
        backgroundColor: "#eee",
        marginTop: "10vh",
        overflow: "scroll",
      }}
    >
      <Box
        sx={{
          mx: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: "10vh",
          pb: "3vh",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="town"
            label="Town/City"
            name="town"
            autoComplete="town"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="district"
            label="District"
            name="district"
            autoComplete="district"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="state"
            label="State"
            name="state"
            autoComplete="state"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
            name="remember"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/account">{"Already have an account? Log in"}</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
}
