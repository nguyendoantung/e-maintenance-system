// import logo from '../logo.svg'
import axios from "axios";
// import rootApi from "../api/rootApi";

function Header(props) {
  function logMeOut() {
    axios({
      baseURL: process.env.REACT_APP_URL_API,
      method: "POST",
      url: "/authenticate/logout",
    })
      .then((response) => {
        props.token();
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  return (
    <header className="App-header">
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
      <button onClick={logMeOut}>Logout</button>
    </header>
  );
}

export default Header;
