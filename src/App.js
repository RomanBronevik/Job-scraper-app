import React, { useState } from 'react';
import './App.css';
import Card from "./Card/Card";

import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Switch from "./Switch/Switch";
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200,
    },
    '& label.Mui-focused': {
      color: '#8842d5',
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#8842d5"
    }
  },
  line: {
    marginTop: 35,
    width: '70%',
    marginLeft: "auto",
    marginRight: "auto"
  },
}));

const ColorLinearProgress = withStyles({
  colorPrimary: {
    backgroundColor: '#8842d5',
  },
  barColorPrimary: {
    backgroundColor: '#fff',
  },
})(LinearProgress);


const App = () => {

  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState(false);
  const [input, setInput] = useState(
    {
      job: "",
      city: "",
    }
  );

  const onChangeHandler = (e) => {
    e.preventDefault()
    setText(false)
    let name = e.target.name
    let val = e.target.value
    setInput(prevState => (
      {
        ...prevState,
        [name]: val
      }
    ))
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    e.target.reset()
    document.getElementById("whatBox").blur()
    document.getElementById("whereBox").blur()
    setLoading(true)
    const sort = document.querySelector('input[name="sort"]:checked').value
    const response = await fetch("http://localhost:5000/search", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({job: input.job, city: input.city, sort: sort})
    })
    const data = await response.json()
    data && setText(true)
    data && setLoading(false)
    setData(data)
    document.getElementById('cardId').scrollIntoView({
      behavior: 'smooth'
    });
  }

  const cardSites = data && Object.keys(data[0].items)
  const displayCard = cardSites && cardSites.map((item, index) => (
    <Card key={index}  name={item} data={data[0].items[item]} />
    ))

  const classes = useStyles();

  const btnStyle = {background: "#8842d5", color: "white", marginTop: "20px"}
  const textColour = {color: "#8842d5"}
  const searchText = <h3>Showing results for "<span style={textColour} >{input.job}</span>" jobs in "<span style={textColour} >{input.city}</span>"</h3>

  return (
    <div className="App">
      <h1 className="header" onClick={() => window.location.reload()} >Jobs-4-U</h1>
      <form className={classes.root} onSubmit={onSubmitHandler} noValidate autoComplete="off">
        <TextField id="whatBox" name="job" label="What" variant="outlined" onChange={onChangeHandler} />
        <TextField id="whereBox" name="city" label="Where" variant="outlined" onChange={onChangeHandler} />
        <Button className="btn-style" variant="contained" type="submit" style={btnStyle} >Search</Button>
      </form>
      <Switch />      
      {loading && <ColorLinearProgress className={classes.line} />}
      {text && searchText}
      <div id="cardId" >
        {displayCard}
      </div>
    </div>
  );
}

export default App;