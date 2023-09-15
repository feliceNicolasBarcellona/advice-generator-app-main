import { Fragment, useState, useEffect, useCallback } from "react";
import "./App.css";
import dividerDesktop from "./images/pattern-divider-desktop.svg";
import dividerMobile from "./images/pattern-divider-mobile.svg";
import AdviceOutput from "./components/AdviceOutput/AdviceOutput";
import Card from "./components/UI/Card";
import Button from "./components/UI/Button";

const App = () => {
  const [slip, setSlip] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAdvicesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://api.adviceslip.com/advice");

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      setSlip(data.slip);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchAdvicesHandler();
  }, [fetchAdvicesHandler]);

  return (
    <Fragment>
      <main>
        <Card>
          <div className="card-body">
            {!isLoading && !error && <AdviceOutput slip={slip} />}
            {isLoading && <p className="loading">Loading...</p>}
            {error && !isLoading && <p className="response-error">{error}</p>}
          </div>
          <img
            className="divider-desktop"
            src={dividerDesktop}
            alt="divider-desktop"
          />
          <img
            className="divider-mobile"
            src={dividerMobile}
            alt="divider-mobile"
          />
          {/* <button onClick={fetchAdvicesHandler}></button> */}
          <Button type="button" onClick={fetchAdvicesHandler}></Button>
        </Card>
      </main>
      <div className="attribution">
        Challenge by{" "}
        <a href="https://www.frontendmentor.io?ref=challenge" target="">
          Frontend Mentor
        </a>
        . Coded by{" "}
        <a href="https://www.frontendmentor.io/profile/feliceNicolasBarcellona">
          Felice Nicolas Barcellona
        </a>
        .
      </div>
    </Fragment>
  );
};

export default App;
