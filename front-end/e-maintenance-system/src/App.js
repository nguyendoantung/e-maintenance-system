import React from "react";
import { QueryClientProvider, QueryClient } from "react-query";

import configureStore from "./redux/store";
import Routers from "./routers/Routers";

import { Provider } from "react-redux";
import { CssBaseline } from "@material-ui/core";

const store = configureStore();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      cacheTime: 0,
    },
  },
});

function App() {
  const [token, setToken] = React.useState(localStorage.getItem("token"));

  React.useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [localStorage.getItem("token")]);
  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <CssBaseline />
          <Routers />
        </QueryClientProvider>
      </Provider>
    </>
  );
}

export default App;
