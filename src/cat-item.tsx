import React from "react";
import { CatItemPropsType } from "./types";

export default class CatItem extends React.Component<CatItemPropsType, {}> {
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
