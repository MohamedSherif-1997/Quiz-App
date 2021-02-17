import React, { Component } from "react";

const Review = (props) => {
  const isAnswered = (q) => {
    return q.options.some((x) => x.selected) ? "Answered" : "Not Answered";
  };
  return (
    <div>
      <h2 className="text-center font-weight-normal">
        Review Quiz: {props.quiz.name}
      </h2>
      <hr />
      <div className="row text-center">
        {props.quiz.questions.map((q, index) => (
          <div key={q.id} className="col-4 cursor-pointer">
            <div
              id={index}
              onClick={props.move}
              className={`p-3 mb-2 ${
                isAnswered(q) === "Answered" ? "bg-info" : "bg-warning"
              }`}
            >
              {index + 1}. {isAnswered(q)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Review;
