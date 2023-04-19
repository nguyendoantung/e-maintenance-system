import { BrowserRouter, Route, Switch } from "react-router-dom";
import Page404 from "../page/Page404";
const Routers = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          {/* <Route path="/">
            <div>Hello mother fuck</div>
          </Route> */}
          {/* <Route component={Page404} exact/> */}
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default Routers;
