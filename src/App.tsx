import React from "react";
import "./App.css";
import { CatType } from "./types";
import getRandomCat from "./utils";
import CatItem from "./cat-item";

class App extends React.Component<{}, { allCats: CatType[] }> {
  intervalId: undefined | ReturnType<typeof setInterval> = undefined;

  constructor(props: {}) {
    super(props);
    this.state = {
      allCats: [],
    };
  }

  componentDidMount(): void {
    const cb = () => {
      const newCat = getRandomCat();

      this.setState((prevState) => ({
        allCats: [...prevState.allCats, newCat],
      }));

      this.startTimeoutForCatItem(newCat.id);
    };

    cb();

    this.intervalId = setInterval(cb, 5000);
  }

  componentWillUnmount(): void {
    this.setState({ allCats: [] }); // In development mode, cb() in componentDidMount will execute twice, so two cats will be added, this can be removed in production mode
    clearTimeout(this.intervalId);
    this.state.allCats.forEach((el) => clearTimeout(el.timeoutId));
  }

  handleFeedCat = (id: number) => {
    clearTimeout(this.state.allCats.find((el) => el.id === id)?.timeoutId);

    this.setState((prevState) => ({
      allCats: prevState.allCats.map((el) =>
        el.id === id ? { ...el, hungry: false } : el
      ),
    }));

    this.startTimeoutForCatItem(id);
  };

  startTimeoutForCatItem = (id: number) => {
    const timeoutId = setTimeout(() => {
      const timeoutId = setTimeout(() => {
        this.setState((prevState) => ({
          allCats: prevState.allCats.filter((el) => el.id !== id),
        }));
      }, 5000);

      this.setState((prevState) => ({
        allCats: prevState.allCats.map((el) =>
          el.id === id ? { ...el, hungry: true, timeoutId } : el
        ),
      }));
    }, 30000);

    this.setState((prevState) => ({
      allCats: prevState.allCats.map((el) =>
        el.id === id ? { ...el, timeoutId } : el
      ),
    }));
  };

  render() {
    return (
      <div className="app">
        <div className="cats-container">
          <p className="heading">All Cats</p>
          <div className="cats-list-container">
            <div className="cats-list">
              {this.state.allCats.map((el) => (
                <CatItem
                  key={el.id}
                  {...el}
                  handleFeedCat={this.handleFeedCat}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="cats-container">
          <p className="heading">Neighbour's Cats</p>
          <div className="cats-list-container">
            <div className="cats-list">
              {this.state.allCats
                .filter((el) => !el.hasCollar)
                .map((homelessCat) => (
                  <CatItem
                    key={homelessCat.id}
                    {...homelessCat}
                    handleFeedCat={this.handleFeedCat}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
