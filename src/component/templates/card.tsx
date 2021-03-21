import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import CustomizedDialogs from './dialog';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export default function BookCard({ Book }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const classes = useStyles();

  return (
    <Card className={classes.root} style={{ backgroundColor: `${Book.background}` }}>
      <Link to={`/${Book.name}`}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt={Book.name}
            height="140"
            image={Book.image}
            title={Book.name}
          />
          <CardContent>
            <Typography style={{ color: "#ffffff" }} gutterBottom variant="h5" component="h2">
              {Book.name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions>
        <CustomizedDialogs Content={Book} />
      </CardActions>
    </Card>
  );
}
