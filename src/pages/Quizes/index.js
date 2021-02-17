import React, { Component, useEffect } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import Quiz from "../../components/Quiz";
import { ActionTypes } from "../../constants/actionTypes";

const Quizes = (props) => {
  const [quiz, setQuiz] = React.useState();
  const pager = {
    index: 0,
    size: 1,
    count: 1,
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const queryValue = params.get("subject");
    const url = `/data/${queryValue}.json`;
    console.log(queryValue);

    fetch(`../${url}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        let quiz = res;
        quiz.questions.forEach((q) => {
          q.options.forEach((o) => (o.selected = false));
        });
        quiz.config = Object.assign(props.quiz.config || {}, quiz.config);
        pager.count = quiz.questions.length / pager.size;
        props.onQuizLoad(quiz);
        props.onPagerUpdate(pager);
      });
  }, []);

  return (
    <div>
      <Quiz quiz={quiz} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return { ...state.quiz };
};

const mapDispatchToProps = (dispatch) => ({
  onQuizLoad: (payload) => dispatch({ type: ActionTypes.QuizLoad, payload }),
  onPagerUpdate: (payload) =>
    dispatch({ type: ActionTypes.PagerUpdate, payload }),
});

Quizes.propTypes = {
  quiz: PropTypes.object.isRequired,
  onQuizLoad: PropTypes.func.isRequired,
  onPagerUpdate: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Quizes);
