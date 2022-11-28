import React from "react";
import "./App.css";

interface CatType {
  id: number;
  hasCollar: boolean;
  name: string;
  color: string;
  age: string;
  hungry: boolean;
  timeoutId: undefined | ReturnType<typeof setTimeout>;
}

interface CatItemPropsType extends CatType {
  handleFeedCat: (name: number) => void;
}

const getRandomCat = (() => {
  const predefinedNames = [
    "Max",
    "Oscar",
    "Bella",
    "Coco",
    "Simba",
    "Willow",
    "Milo",
    "Leo",
    "Arya",
    "Charlie",
    "Loki",
    "Daisy",
    "Luna",
    "Shireen",
    "Lucy",
    "Pumpkin",
    "Stella",
    "Ollie",
    "Jax",
    "Lola",
    "Lana",
    "Oreo",
    "Grace",
  ];
  const predefinedColors = [
    "rgba(0,0,0,0.1)",
    "rgba(0,0,0,0.2)",
    "rgba(0,0,0,0.3)",
    "rgba(0,0,0,0.4)",
    "rgba(0,0,0,0.5)",
    "rgba(0,0,0,0.6)",
    "rgba(0,0,0,0.7)",
    "rgba(0,0,0,0.8)",
    "rgba(0,0,0,0.9)",
    "black",
    "#7f1d1d",
    "#7c2d12",
    "#fbbf24",
    "#facc15",
    "#eab308",
    "#d97706",
    "#fef9c3",
    "#f97316",
    "#a16207",
    "#fde68a",
    "white",
  ];

  let id = 0;

  return () =>
    ({
      id: id++,
      hasCollar: Math.random() < 0.5,
      name: predefinedNames[
        Math.trunc(Math.random() * 100) % predefinedNames.length
      ],
      color:
        predefinedColors[
          Math.trunc(Math.random() * 100) % predefinedColors.length
        ],
      age: `${(0.1 + Math.random() * 10).toFixed(1)} years old`,
      hungry: false,
      timeoutId: undefined,
    } as CatType);
})();

class CatItem extends React.Component<CatItemPropsType, {}> {
  render() {
    return (
      <div className="cat-item">
        <div className="collar">
          {this.props.hasCollar ? (
            <img
              className="collar-img"
              alt="collar"
              src="https://i.imgur.com/hIVdMR6.jpg"
            />
          ) : (
            <span>No collar</span>
          )}
        </div>
        <div className="info">
          <span>{this.props.name}</span>
          <span>{this.props.age}</span>
        </div>
        <div
          className="cat-color"
          style={{ backgroundColor: this.props.color }}
        ></div>
        {this.props.hungry ? (
          <div
            className="feed-me-popup"
            onClick={() => this.props.handleFeedCat(this.props.id)}
          >
            Feed me
          </div>
        ) : null}
      </div>
    );
  }
}

class App extends React.Component<{}, { allCats: CatType[] }> {
  timeoutId: undefined | ReturnType<typeof setTimeout> = undefined;

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

      this.timeoutId = setTimeout(cb, 5000);
    };

    this.timeoutId = setTimeout(cb);
  }

  componentWillUnmount(): void {
    clearTimeout(this.timeoutId);
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
