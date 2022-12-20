import { useEffect, useState } from "react";
import "./App.css";
import { CatType } from "./types";
import getRandomCat from "./utils";
import CatItem from "./cat-item";

let intervalId: undefined | ReturnType<typeof setInterval> = undefined;

function App() {
  const [cats, setCats] = useState<CatType[]>([]);

  useEffect(() => {
    const cb = () => {
      const newCat = getRandomCat();

      setCats((cats) => [...cats, newCat]);

      startTimeoutForCatItem(newCat.id);
    };

    cb();

    intervalId = setInterval(cb, 5000);

    return () => {
      setCats([]); // In development mode, cb() in componentDidMount will execute twice, so two cats will be added, this can be removed in production mode
      clearTimeout(intervalId);
      cats.forEach((cat) => clearTimeout(cat.timeoutId));
    };
  }, []);

  const handleFeedCat = (id: number) => {
    clearTimeout(cats.find((el) => el.id === id)?.timeoutId);

    setCats((cats) =>
      cats.map((cat) => (cat.id === id ? { ...cat, hungry: false } : cat))
    );

    startTimeoutForCatItem(id);
  };

  const startTimeoutForCatItem = (id: number) => {
    const timeoutId = setTimeout(() => {
      const timeoutId = setTimeout(() => {
        setCats((cats) => cats.filter((el) => el.id !== id));
      }, 5000);

      setCats((cats) =>
        cats.map((el) =>
          el.id === id ? { ...el, hungry: true, timeoutId } : el
        )
      );
    }, 30000);

    setCats((cats) =>
      cats.map((el) => (el.id === id ? { ...el, timeoutId } : el))
    );
  };

  return (
    <div className="app">
      <div className="cats-container">
        <p className="heading">All Cats</p>
        <div className="cats-list-container">
          <div className="cats-list">
            {cats.map((cat) => (
              <CatItem key={cat.id} {...cat} handleFeedCat={handleFeedCat} />
            ))}
          </div>
        </div>
      </div>
      <div className="cats-container">
        <p className="heading">Neighbour's Cats</p>
        <div className="cats-list-container">
          <div className="cats-list">
            {cats
              .filter((cat) => !cat.hasCollar)
              .map((homelessCat) => (
                <CatItem
                  key={homelessCat.id}
                  {...homelessCat}
                  handleFeedCat={handleFeedCat}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
