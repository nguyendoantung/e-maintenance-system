import { BrowserRouter, Route, Switch } from "react-router-dom";
import Page404 from "../page/Page404";
import LoginPage from "../page/auth/LoginPage";
import AdminPage from "../page/admin/AdminPage";
import HomePage from "../page/home/HomePage";
import { LIST_ROUTE } from "./contants";
import UserRoute from "../components/routes/UserRoute";
import RegisterPage from "../page/auth/RegisterPage";
import AuthRoute from "../components/routes/AuthRoute";
import Contact from "../page/contact/contact";
import Service from "../page/service/service";
import GuestRoute from "../components/routes/GuestRoute";
import ListPrice from "../page/fixed/price"

const Routers = () => {
    return (
        <>
            <BrowserRouter>
                <Switch>
                    <AuthRoute
                        exact
                        path={LIST_ROUTE.LOGIN_PAGE}
                        component={LoginPage}
                    />
                    <AuthRoute
                        exact
                        path={LIST_ROUTE.REGISTER}
                        component={RegisterPage}
                    />
                    <GuestRoute
                        exact
                        path={LIST_ROUTE.HOME_PAGE}
                        component={HomePage}
                    />
                    <GuestRoute
                        exact
                        path={"/bao-gia"}
                        component={ListPrice}
                    />
                    <UserRoute
                        exact
                        path={LIST_ROUTE.CONTACT}
                        component={Contact}
                    />
                    <UserRoute
                        exact
                        path={LIST_ROUTE.SERVICE}
                        component={Service}
                    />
                    {/* <UserRoute
                        exact
                        path={LIST_ROUTE.LOGIN_PAGE}
                        component={LoginPage}
                    />
                    <AuthRoute
                        exact
                        path={LIST_ROUTE.REGISTER}
                        component={RegisterPage}
                    />
                    <UserRoute
                        exact
                        path={LIST_ROUTE.HOME_PAGE}
                        component={HomePage}
                    />
                    {/* <UserRoute
                        exact
                        path={LIST_ROUTE.ADMIN_PAGE}
                        component={AdminPage}
                    /> */}
                    <Route
                        exact
                        path={LIST_ROUTE.ADMIN_PAGE}
                        component={AdminPage}
                    />
                    <UserRoute component={Page404} exact />
                </Switch>
            </BrowserRouter>
        </>
    );
};

export default Routers;
