import React from "react";
import { useEffect } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import { useHistory, useLocation } from "react-router-dom";
import logoImage from "../../assets/img/weather.png";
import { Switches } from "../Switches/Switches";
import "./AppHeader.scss";

const routesMap = ["/", "/favorites"];

export const AppHeader = () => {
  const history = useHistory();
  const location = useLocation();
  const [currRouteIdx, setCurrRouteIdx] = React.useState(0);

  useEffect(() => {
    if (location.pathname === "/favorites") {
      setCurrRouteIdx(
        routesMap.findIndex((currRoute) => currRoute === "/favorites")
      );
    } else {
      setCurrRouteIdx(routesMap.findIndex((currRoute) => currRoute === "/"));
    }
  }, [location.pathname]);

  return (
    <>
      <AppBar
        style={{
          background: "#7845a2",
          height: "70px",
        }}
        position="fixed"
        className="app-header"
      >
        <div className="main-container flex align-center space-between">
          <button
            className="logo-button center-childs"
            onClick={() => history.push("/")}
          >
            <img src={logoImage} alt="" />
            <h1 style={{ padding: "20px", color: "white", fontWeight: "bold" }}>
              Weather
            </h1>
          </button>
          <Tabs
            value={currRouteIdx}
            aria-label="styled tabs example"
            indicatorColor="white"
          >
            <Tab
              label="Home"
              onClick={() => {
                history.push("/");
                setCurrRouteIdx(
                  routesMap.findIndex((currRoute) => currRoute === "/")
                );
              }}
            />
            <Tab
              label="Favorites"
              onClick={() => {
                history.push("/favorites");
                setCurrRouteIdx(
                  routesMap.findIndex((currRoute) => currRoute === "/favorites")
                );
              }}
            />
          </Tabs>
        </div>
      </AppBar>
      <div className="main-container">
        <Switches />
      </div>
    </>
  );
};
