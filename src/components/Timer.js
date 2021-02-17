import React, { Component } from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core";

const style = {
  text: {
    color: "black",
    fontWeight: "bold",
    fontSize: 20,
  },
};

class Timer extends Component {
  state = {
    minutes: this.props.minutes,
    seconds: this.props.seconds,
  };

  componentDidMount() {
    this.myInterval = setInterval(() => {
      const { seconds, minutes } = this.state;

      if (seconds > 0) {
        this.setState(({ seconds }) => ({
          seconds: seconds - 1,
        }));
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(this.myInterval);
        } else {
          this.setState(({ minutes }) => ({
            minutes: minutes - 1,
            seconds: 59,
          }));
        }
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  render() {
    const { minutes, seconds } = this.state;
    const { classes, move } = this.props;
    return (
      <div style={{ marginTop: 5 }}>
        {minutes === 0 && seconds === 0 ? (
          move()
        ) : (
          <h3 className={classes.text}>
            Time Remaining:{" "}
            <span
              style={{
                color: minutes === 0 && seconds < 15 ? "red" : "green",
                fontSize: 20,
              }}
            >
              {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </span>
          </h3>
        )}
      </div>
    );
  }
}

Timer.propTypes = {
  minutes: PropTypes.number,
  seconds: PropTypes.number,
  move: PropTypes.func.isRequired,
};

export default withStyles(style)(Timer);
