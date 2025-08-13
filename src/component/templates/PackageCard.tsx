import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Chip,
  Divider,
  Button,
  Box,
} from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import LanguageIcon from '@material-ui/icons/Language';
import AssignmentIcon from '@material-ui/icons/Assignment';
import CodeIcon from '@material-ui/icons/Code';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import GetAppIcon from '@material-ui/icons/GetApp';
import StarIcon from '@material-ui/icons/Star';
import CallSplitIcon from '@material-ui/icons/CallSplit';
import ErrorIcon from '@material-ui/icons/Error';
import UpdateIcon from '@material-ui/icons/Update';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    },
    cardContent: {
      flexGrow: 1,
    },
    statsContainer: {
      padding: theme.spacing(2),
      backgroundColor: theme.palette.grey[50],
      borderLeft: `1px solid ${theme.palette.divider}`,
      [theme.breakpoints.down('xs')]: {
        borderLeft: 'none',
        borderTop: `1px solid ${theme.palette.divider}`,
      },
    },
    statItem: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: theme.spacing(2),
    },
    statIcon: {
      marginRight: theme.spacing(1.5),
      color: theme.palette.text.secondary,
    },
    chip: {
      marginRight: theme.spacing(0.5),
      marginBottom: theme.spacing(0.5),
    },
    actions: {
      padding: theme.spacing(0, 2, 2, 2),
    }
  })
);

const StatItem = ({ icon, text }) => {
  const classes = useStyles();
  return (
    <Box className={classes.statItem}>
      {icon}
      <Typography variant="body2" color="textSecondary">
        {text}
      </Typography>
    </Box>
  );
};

export default function PackageCard({ value }) {
  const classes = useStyles();

  return (
    <Card className={classes.card} elevation={2}>
      <Grid container>
        <Grid item xs={12} sm={8}>
          <CardContent className={classes.cardContent}>
            <Typography variant="h5" gutterBottom>
              {value.name}
            </Typography>
            <Box mb={2}>
              {value.topic.map((topicValue, topicKey) => (
                <Chip
                  key={topicKey}
                  icon={<CheckCircleIcon />}
                  label={topicValue}
                  size="small"
                  className={classes.chip}
                />
              ))}
            </Box>
            <Divider />
            <Box mt={2} mb={2}>
              <Typography variant="body1">{value.description}</Typography>
            </Box>
          </CardContent>
          <CardActions className={classes.actions}>
            <Button href={value.web} size="small" startIcon={<LanguageIcon />}>
              Website
            </Button>
            <Button size="small" startIcon={<AssignmentIcon />}>
              {value.license}
            </Button>
            <Button size="small" startIcon={<CodeIcon />}>
              {value.language}
            </Button>
            <Button href={value.sample} size="small" startIcon={<PhotoLibraryIcon />}>
              Sample
            </Button>
          </CardActions>
        </Grid>
        <Grid item xs={12} sm={4} className={classes.statsContainer}>
          <Box p={1}>
            <StatItem
              icon={<UpdateIcon className={classes.statIcon} />}
              text={value.date.new}
            />
            <StatItem
              icon={<GetAppIcon className={classes.statIcon} />}
              text={`${value.download} downloads`}
            />
            <StatItem
              icon={<StarIcon className={classes.statIcon} />}
              text={`${value.star} stars`}
            />
            <StatItem
              icon={<CallSplitIcon className={classes.statIcon} />}
              text={`${value.fork} forks`}
            />
            <StatItem
              icon={<ErrorIcon className={classes.statIcon} />}
              text={`${value.issue} issues`}
            />
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}
