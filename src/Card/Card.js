import React from 'react';
import CardItem from "./CardItem";
import "./Card.css";

import Grow from '@material-ui/core/Grow';

const Card = ({ name, data }) => {
  const bgColour = []
  if(name === "Indeed") bgColour.push("#0000ff", "blue")
  if(name === "Totaljobs") bgColour.push("#00cd00", "green")
  if(name === "Reed") bgColour.push("#cd00cd", "purple")

  return ( 
    <Grow 
      in
      style={{ transformOrigin: '0 0 0' }}
      {...({ timeout: 1000 })} 
      >
      <div className="card" >
        <h1 className="title-style" style={{color: bgColour[0]}} >{name}</h1>
        {data[0].noData 
          ? <h1 style={{color: "#8842d5"}} >{data[0].noData}</h1>
          : <CardItem data={data} colour={bgColour[1]} />
        }
      </div>
    </Grow>
   );
}

  

export default Card;