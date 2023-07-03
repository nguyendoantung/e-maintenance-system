import React, { useEffect } from "react";
import { Route, useHistory } from "react-router-dom/cjs/react-router-dom";
import Layout from "../../page/home/Layout";
import { useQuery } from "react-query";
import authencation from "../../request/authencation";
import { useDispatch, useSelector } from "react-redux";
import { authActions, selectIsAuth } from "../../redux/slices/auth.slice";
import { LIST_ROUTE } from "../../routers/contants";

export default function UserRoute({ children, ...props }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { data } = useQuery({
        queryKey: ["getMe"],
        queryFn: () => authencation.getMe(),
        onSuccess: () => {
            dispatch(authActions.getMeSuccess());
        },
        onError: () => {
            dispatch(authActions.getMeFailed());
            history.push(LIST_ROUTE.LOGIN_PAGE);
        },
    });
    return (
        <Layout>
            <Route {...props} />
        </Layout>
    );
}
