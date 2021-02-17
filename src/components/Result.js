import React from 'react';

import { withStyles, Card } from "@material-ui/core";

const style={
    card:{
        width:'60%',
        margin:5

    },
resultQuestion :{
        backgroundColor: "white",
        margin: 4,
        padding: 6,
      },
      result:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',
        margin:10
      }
}

function Result(props) {
    const {classes}=props
    let questions = props.questions;
    questions.forEach(q => { q.isCorrect = q.options.every(x => x.selected === x.isAnswer); })
    const totalQuestions=questions.length;
    const correctAnswer=questions.filter(x=>x.isCorrect===true).length

    const checkPercentage=(questions)=>{     
     if(correctAnswer===totalQuestions){
         return (<h3 style={{fontSize:'15px',fontWeight:'bold'}} className="badge badge-success">Excellent</h3>)
     }
     else if(correctAnswer>=questions.length/2){
        return (<h3 style={{fontSize:'15px',fontWeight:'bold'}}>Good</h3>)
     }
     else {
        return (<h3 className="badge badge-warning" style={{fontSize:'15px',fontWeight:'bold'}}>Failed</h3>)
     }
    }

    return (
        <div className={classes.result}>          
          <div style={{fontSize:15,fontWeight:'bold'}}>
          Quiz Result : {checkPercentage(questions)}
              </div>
              <div style={{fontSize:15,fontWeight:'bold'}}>
          Quiz Marks : {correctAnswer} Of {totalQuestions}
              </div>  
            {questions.map((q, index) =>
                <Card key={q.id} className={classes.card}>
                    <div className={classes.resultQuestion}>
                        <h5>{index + 1}. {q.name}</h5>
                        <div className="row">
                            {
                                q.options.map(option =>
                                    <div key={option.id} className="col-6">
                                        <input id={option.id} type="checkbox" disabled="disabled" checked={option.selected} /> {option.name}
                                    </div>
                                )
                            }
                        </div>
                        <div className={`m-1 p-1 text-bold ${q.isCorrect ? 'text-success' : 'text-danger'}`}>Your answer is {q.isCorrect ? 'Correct' : 'Wrong'}.</div>
                    </div>
                </Card>
            )}            
            <h4 className="alert alert-info text-center margin:5">GOOD LUCK!!</h4>
        </div>
    )
}

export default withStyles(style)(Result);