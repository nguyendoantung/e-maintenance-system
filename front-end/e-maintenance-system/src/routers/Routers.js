import { BrowserRouter, Route, Switch } from "react-router-dom";
import Page404 from "../page/Page404";
import HomePage from "../page/home/HomePage";
import LoginPage from "../page/login/LoginPage";

const Routers = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          {/* <Route component={Page404} exact/> */}
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default Routers;
