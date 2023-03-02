import React from "react";

function Card(props) {
  return (
    <div className="col-sm-6 mb-3 mb-sm-0">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">{props.text}</p>
          <a href={props.link} className="btn btn-primary">
            {props.buttonText}
          </a>
        </div>
      </div>
    </div>
  );
}

export default Card;