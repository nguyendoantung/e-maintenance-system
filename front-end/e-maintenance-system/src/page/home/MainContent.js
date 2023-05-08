import React from "react";
import preventive_maintenance from "../../image/preventive-maintenance.jpg";
import {
  Card,
  CardContent,
  CardMedia,
  Paper,
  Typography,
  Grid,
} from "@material-ui/core";
import KitchenIcon from "@material-ui/icons/Kitchen";

import PowerIcon from "@material-ui/icons/Power";

const repairTypes = [
  {
    text: "Tủ lạnh",
    icon: KitchenIcon,
  },
  {
    text: "Máy giặt",
    icon: KitchenIcon,
  },
  {
    text: "Điều hòa",
    icon: KitchenIcon,
  },
  {
    text: "Điện",
    icon: PowerIcon,
  },
];

const MainContent = () => {
  return (
    <>
      <img
        src={preventive_maintenance}
        alt="preventive and maintenance"
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          objectFit: "cover",
        }}
      />
      <Grid container spacing={1}>
        <Grid item xs={12} sx={{ border: 0 }}>
          <Grid container justifyContent="center" spacing={1}>
            {repairTypes.map((repairType) => {
              return (
                <Grid key={repairType?.text} item sx={{ border: 0 }}>
                  <Card
                    style={{
                      display: "flex",
                      width: "200px",
                    }}
                  >
                    <repairType.icon />
                    <CardContent>
                      <Typography
                        component="h5"
                        variant="h5"
                        style={{ color: "#3f51b5" }}
                      >
                        {repairType?.text}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>

      <Typography>
        <div></div>
      </Typography>
    </>
  );
};

export default MainContent;
