import React, { useState } from "react";
import PropTypes from "prop-types";

import { withStyles, Card } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";

import { DATA } from "../../constants/test";

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  header: {
    height: "100px",
    textAlign: "left",
    // color: "sky-blue",
    backgroundColor: "floralwhite",
    fontSize: "20px",
  },
  center: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    height: "60vh",
    backgroundColor: "#FFFFFF",
    margin: 20,
  },
  cardRoot: {
    width: "25%",
  },
  cardAction: {
    "&:hover": {
      color: "green",
      textDecoration: "underline",
    },
  },
  media: {
    height: 140,
  },
};

const DashBoard = (props) => {
  const { classes, history } = props;
  const [quizes, setQuizes] = useState([]);
  const [quizId, setQuizId] = useState();

  const onChange = (value) => {
    setQuizId(value);
    history.push({
      pathname: "/quiz/test",
      search: `${props.location.search}?subject=${value}`,
    });
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <h3 style={{ margin: "30px 0 0 20px" }}>Quizz Time!!</h3>
      </div>
      <div>
        {DATA.map((sub) => (
          <Paper className={classes.center} variant="outlined" square>
            <div>
              <h3
                style={{
                  color: "Black",
                  fontSize: "15px",
                  margin: "10px  0 50px 30px",
                }}
              >
                {sub.title} :
              </h3>
            </div>

            <div
              style={{
                marginTop: 10,
                display: "flex",
                justifyContent: "space-around",
                alignItems: "flex-start",
                flexWrap: "wrap",
              }}
            >
              {sub.data.map((subjectName, index) => (
                <Card className={classes.cardRoot} key={index}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={subjectName.img}
                      //   title="Contemplative Reptile"
                    />
                  </CardActionArea>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      className={classes.cardAction}
                      onClick={() => onChange(subjectName.name)}
                    >
                      {subjectName.name}
                    </Button>
                  </CardActions>
                </Card>
              ))}
            </div>
          </Paper>
        ))}
      </div>
    </div>
  );
};

DashBoard.propTypes = {
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DashBoard);
