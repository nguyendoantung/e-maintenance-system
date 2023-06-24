import React from "react";
import { Route } from "react-router-dom/cjs/react-router-dom";
import AuthLayout from "../../page/auth/AuthLayout";

export default function AuthRoute({ children, ...props }) {
    return (
        <AuthLayout>
            <Route {...props} />
        </AuthLayout>
    );
}
