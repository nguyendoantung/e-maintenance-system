import { QueryClientProvider, QueryClient } from "react-query";
import { BrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Header from "./components/Header";
import useToken from "./utils/token";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      cacheTime: 0,
    },
  },
});

function App() {
  const { token, removeToken, setToken } = useToken();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <header className="App-header">
            <p>Here's the music!</p>
          </header>
        </div>
        <BrowserRouter>
          <div className="App">
            <Header token={removeToken} />
            {!token && token !== "" && token !== undefined ? (
              <Login setToken={setToken} />
            ) : (
              <Profile />
              // <>
              //   <Route
              //     exact
              //     path="/profile"
              //     element={<Profile token={token} setToken={setToken} />}
              //   ></Route>
              // </>
            )}
          </div>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
