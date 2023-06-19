import { BrowserRouter, Route, Switch } from "react-router-dom";
import Page404 from "../page/Page404";
import Layout from "../page/home/Layout";
import LoginPage from "../page/login/LoginPage";
import AdminPage from "../page/admin/AdminPage";
import HomePage from "../page/home/HomePage";
import { LIST_ROUTE } from "./contants";

const Routers = () => {
    return (
        <>
            <BrowserRouter>
                <Layout>
                    <Switch>
                        <Route
                            exact
                            path={LIST_ROUTE.HOME_PAGE}
                            component={HomePage}
                        />
                        <Route
                            exact
                            path={LIST_ROUTE.LOGIN_PAGE}
                            component={LoginPage}
                        />
                        <Route
                            exact
                            path={LIST_ROUTE.ADMIN_PAGE}
                            component={AdminPage}
                        />
                        <Route component={Page404} exact />
                    </Switch>
                </Layout>
            </BrowserRouter>
        </>
    );
};

export default Routers;
