import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [adviceID, setAdviceID] = useState(null);
  const [adviceContent, setAdviceContent] = useState("");
  const [loading, setLoading] = useState(true);

  const adviceData = async () => {
    try {
      const response = await fetch("https://api.adviceslip.com/advice");
      const data = await response.json();
      setAdviceID(data.slip.id);
      setAdviceContent(data.slip.advice);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching advice:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      adviceData();
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleReload = () => {
    setLoading(true);
    adviceData();
  };

  return (
    <>
      <div className="backbg">
        <div className="card text-center pt-5 px-4 rounded-3">
          {loading ? (
            <p className="loading text-center ">Loading...</p>
          ) : (
            <div>
              <p className="adv">ADVICE #{adviceID}</p>
              <p className="quo">"{adviceContent}"</p>
            </div>
          )}

          <img
            className="pause"
            src="/src/images/pattern-divider-desktop.svg"
            alt=""
          />
          <button className="glow" onClick={handleReload}>
            <img src="/src/images/icon-dice.svg" alt="" />
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
