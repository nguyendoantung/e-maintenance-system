import { BrowserRouter, Route, Switch } from "react-router-dom";
import Page404 from "../page/Page404";
import HomePage from "../page/home/HomePage";
const Routers = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          {/* <Route component={Page404} exact/> */}
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default Routers;
