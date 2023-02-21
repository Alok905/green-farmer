import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const Service = () => {
  return (
    <Grid
      container
      component="main"
      sx={{ height: "100vh", width: "100vw", bgcolor: "#eee" }}
      className="sign_container"
    >
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="signin_left_img service_container"
      />
    </Grid>
  );
};

export default Service;
