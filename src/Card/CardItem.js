import React from 'react';
import "./CardItem.css"

import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';

import LocationCityIcon from '@material-ui/icons/LocationCity';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import TodayIcon from '@material-ui/icons/Today';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 350,
    transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
    '&:hover': {
      boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)',
      transform: 'scale(1.04)',
    },
  },
  elevation8: {
    "& .MuiPaper-elevation8": {
      boxShadow: "0px 5px 5px -3px #0000ff, 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)"
    }
  },
  cardheader: {
    "& .MuiCardHeader-title": {
      fontSize: "1.4rem"
    },
    "& .MuiCardHeader-subheader": {
      color: "#8842d5",
      fontWeight: "bold"
    }
  }
}));

const CardItem = ({ data, colour }) => {

  const classes = useStyles();

  let shadow;
  if(colour === "blue") shadow = "0px 10px 5px -3px #0000ff, 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)"
  if(colour === "green") shadow = "0px 10px 5px -3px #00cd00, 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)"
  if(colour === "purple") shadow = "0px 10px 5px -3px #cd00cd, 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)"

  return ( 
    <div>
      {data.map((item, index) => (
        <a style={{textDecoration: "none"}} key={index} href={item.link} target="_blank" rel="noopener noreferrer">
          <Card className={`${classes.root} ${classes.elevation8}`} style={{margin: "20px", boxShadow: shadow}} raised >
            <CardHeader className={classes.cardheader} title={item.title} subheader={item.company} style={{background: "rgba(0,0,0,.1)"}} />
            <CardContent style={{textAlign: "center"}} >
              <Typography variant="body1" color="initial" component="p">
                <LocationCityIcon style={{color: "#8842d5"}} /> {item.location}
              </Typography>
              <CardActions disableSpacing />
              <Typography variant="body1" color="initial" component="p">
                {item.salary && <MonetizationOnIcon style={{color: "#8842d5"}} />} {item.salary}
              </Typography>
              <CardActions disableSpacing />
              <Typography variant="body1" color="initial" component="p" style={{fontWeight: "bold"}}>
                <TodayIcon style={{color: "#8842d5"}} /> {item.date.split("by")[0]}
              </Typography>
            </CardContent>
          </Card>
        </a>
      ))}
    </div>
   );
}
 
export default CardItem;