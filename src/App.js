import "./App.css";
import { GoogleLogin } from "react-google-login";
import axios from "axios";
import { useState } from "react";

function App() {
  const responseGoogle = (response) => {
    console.log(response);
    const { code } = response;
    axios
      .post("/api/create-tokens", { code })
      .then((response) => {
        console.log(response.data);
        setSignedIn(true);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const responseError = (error) => {
    console.log(error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/create-event', {
      summary, 
      description, 
      startDateTime, 
      endDatetTime, 
      location,
      guestEmail})
    .then((response) => {
      console.log(response.data);
    })
    .catch((err) => {console.log("axx" + err.message);});

  };

  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [endDatetTime, setEndDatetTime] = useState("");
  const [guestEmail, setGuestEmail] = useState("")
  const [signedIn, setSignedIn] = useState(false);

  return (
    <div>
      <div className="App">
        <h1>Google Calendar API</h1>
      </div>
      {!signedIn ? (
        <div>
          <GoogleLogin
            clientId={process.env.REACT_APP_CLIENT_ID}
            buttonText="Sign in & authorize calendar"
            onSuccess={responseGoogle}
            onFailure={responseError}
            cookiePolicy={"single_host_origin"}
            //IMPORTANT TO GET REFRESH TOKEN
            responseType="code"
            accessType="offline"
            scope="openid email profile https://www.googleapis.com/auth/calendar"
          />
        </div>
      ) : (
        <div>
          <form onSubmit={handleSubmit}>
            {/* summary */}
            <label htmlFor="summary">Summary</label>
            <br />
            <input
              type="text"
              id="summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
            <br />
            {/* Description */}
            <label htmlFor="description">Description</label>
            <br />
            <textarea
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <br />

            {/* location */}
            <label htmlFor="location">Location</label>
            <br />
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <br />

            {/* startDateTime */}
            <label htmlFor="startDateTime">Start Date</label>
            <br />
            <input
              type="datetime-local"
              id="startDateTime"
              value={startDateTime}
              onChange={(e) => setStartDateTime(e.target.value)}
            />
            <br />
            {/* endDatetTime */}
            <label htmlFor="endDatetTime">End Date</label>
            <br />
            <input
              type="datetime-local"
              id="endDatetTime"
              value={endDatetTime}
              onChange={(e) => setEndDatetTime(e.target.value)}
            />
            <br />
            {/* guestEmail */}
            <label htmlFor="guestEmail">Guest</label>
            <br />
            <input
              type="text"
              id="guestEmail"
              value={guestEmail}
              onChange={(e) => setGuestEmail(e.target.value)}
            />
            <br />

            <button type="submit">Create event</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
