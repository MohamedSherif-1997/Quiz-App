import React, { Component } from "react";
import PropTypes from "prop-types";
import { ActionTypes } from "../constants/actionTypes";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core";

import Timer from "../components/Timer";

const style = {
  options: {
    backgroundColor: "#cadaee",
    cursor: "pointer",
    fontSize: "15px",
    margin: "4px",
    // width:'60%'
  },
  input: {
    height: " 15px",
    marginRight: "6px",
    width: "15px",
  },
  label: {
    cursor: "pointer",
    display: "block",
    padding: "10px",
  },
  button: {
    width: "50px",
    backgroundColor: "#32CD32",
    margin: 10,
    color: "black",
    fontSize: "15px",
    fontWeight: "bold",
    border: "2px",
    //  "&:hover":{
    //     backgroundColor:'#32CD32',
    //  }
  },
  info: {
    display: "flex",
  },
};

const Questions = (props) => {
  const { classes } = props;
  const onAnswer = (question, option) => {
    let quiz = JSON.parse(JSON.stringify(props.quiz));
    let q = quiz.questions.find((x) => x.id === question.id);
    if (q.questionTypeId === 1) {
      q.options.forEach((x) => {
        x.selected = false;
      });
    }
    q.options.find((x) => x.id === option.id).selected = true;
    props.onAnswer(quiz);
  };

  let questions = props.quiz.questions
    ? props.quiz.questions.slice(
        props.pager.index,
        props.pager.index + props.pager.size
      )
    : [];
  return (
    <div id="quiz">
      <h2 className="text-center font-weight-normal">{props.quiz.name}</h2>
      <hr />
      {questions.map((q) => (
        <div
          key={q.id}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#F8F8FF",
          }}
        >
          <div className={classes.info}>
            <div className="badge badge-info" style={{ margin: 10 }}>
              Question {props.pager.index + 1} of {props.pager.count}.
            </div>
            <div>
              <Timer
                seconds={q.timer?.seconds}
                minutes={q.timer?.minutes}
                move={props.move}
              />
            </div>
          </div>

          <h3 className="font-weight-normal">
            {props.pager.index + 1}. <span>{q.name}</span>
          </h3>
          <div className="row text-left options">
            {q.options.map((option) => (
              <div key={option.id} className="col-6">
                <div className={classes.options}>
                  <label className={classes.label} htmlFor={option.id}>
                    <input
                      id={option.id}
                      checked={option.selected}
                      type="checkbox"
                      onChange={() => onAnswer(q, option)}
                      className={classes.input}
                    />
                    {option.name}
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <hr />
      <div className="text-center">
        {/* {props.quiz.config.allowBack && (
          <button id="first" className="btn btn-default" onClick={props.move}>
            First
          </button>
        )} */}
        {props.quiz.config.allowBack && (
          <button
            id="prev"
            className={classes.button}
            onClick={props.move}
            disabled={props.pager.index + 1 === 1}
          >
            Prev
          </button>
        )}
        <button
          id="next"
          className={classes.button}
          onClick={props.move}
          disabled={props.pager.index + 1 === props.pager.count}
        >
          Next
        </button>
        {/* <button id="last" className="btn btn-default" onClick={props.move}>
          Last
        </button> */}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  ...state.quiz,
  ...state.mode,
  ...state.pager,
});

const mapDispatchToProps = (dispatch) => ({
  onAnswer: (payload) => dispatch({ type: ActionTypes.QuizAnswer, payload }),
});

Questions.propTypes = {
  quiz: PropTypes.object.isRequired,
  move: PropTypes.func.isRequired,
  onAnswer: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(style)(
  connect(mapStateToProps, mapDispatchToProps)(Questions)
);
