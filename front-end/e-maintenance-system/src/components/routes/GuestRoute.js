import React from "react";
import { Route } from "react-router-dom/cjs/react-router-dom";
import Layout from "../../page/home/Layout";

export default function GuestRoute({ children, ...props }) {
    return (
        <Layout>
            <Route {...props} />
        </Layout>
    );
}
