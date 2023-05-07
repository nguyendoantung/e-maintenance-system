import React from "react";
import Footer from "./Footer";
import { AppBar } from "@material-ui/core";
import MainContent from "./MainContent";

const Content = () => {
  return (
    <>
      <MainContent />
      <AppBar
        style={{
          top: "auto",
          bottom: 0,
        }}
      >
        <Footer />
      </AppBar>
    </>
  );
};

export default Content;
