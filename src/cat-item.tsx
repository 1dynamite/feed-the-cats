import { CatItemPropsType } from "./types";

export default function CatItem(props: CatItemPropsType) {
  return (
    <div className="cat-item">
      <div className="collar">
        {props.hasCollar ? (
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
        <span>{props.name}</span>
        <span>{props.age}</span>
      </div>
      <div className="cat-color" style={{ backgroundColor: props.color }}></div>
      {props.hungry ? (
        <div
          className="feed-me-popup"
          onClick={() => props.handleFeedCat(props.id)}
        >
          Feed me
        </div>
      ) : null}
    </div>
  );
}
