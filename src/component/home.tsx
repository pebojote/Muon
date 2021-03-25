import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import LanguageIcon from '@material-ui/icons/Language';
import AssignmentIcon from '@material-ui/icons/Assignment';
import CodeIcon from '@material-ui/icons/Code';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import GetAppIcon from '@material-ui/icons/GetApp';
import StarIcon from '@material-ui/icons/Star';
import CallSplitIcon from '@material-ui/icons/CallSplit';
import ErrorIcon from '@material-ui/icons/Error';
import UpdateIcon from '@material-ui/icons/Update';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import SortIcon from '@material-ui/icons/Sort';
import {
  createStyles,
  makeStyles,
  useTheme,
  Theme,
  fade,
} from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import exploreData from './data/api.data';
import Offline from './templates/offline';
import FilterDialog from './templates/dialog.filter';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      margin: 5,
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.black, 0.15),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
    },
  })
);

export default function Home() {
  const classes = useStyles();
  const theme = useTheme();
  const [data, setData] = useState('');
  const [LibraryLength, setLibraryLength] = useState(
    <CircularProgress size={10} />
  );
  const [isOffline, setNetworkStatus] = useState(false);

  let [filter, setFilter] = useState([]);

  const filteredData = (filtered) => {
    setFilter(filtered);
  };

  useEffect(async () => {
    try {
      let mounted = true;
      if (mounted) {
        const data = await exploreData(filter);
        if (data === 'offline') {
          setNetworkStatus(true);
        } else {
          setData(data);
          setLibraryLength(data.length);
        }
      }
      return () => {
        mounted = false;
      };
    } catch (error) {
      console.log('Error: ', error.message);
    }
  }, [filter]);

  return (
    <>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          fullWidth
          placeholder="Search Libraries"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
        />
      </div>
      <div style={{ width: '100%' }}>
        <Box
          display="flex"
          alignItems="center"
          p={1}
          bgcolor="background.paper"
        >
          <Box p={1} flexGrow={1} bgcolor="grey.300">
            {LibraryLength} libraries
          </Box>
          <Box p={1}>
            <FilterDialog filteredData={filteredData} />
          </Box>
          <Box p={1}>
            <Button href="#" style={{ textTransform: 'none' }}>
              <SortIcon /> Sort by
            </Button>
          </Box>
        </Box>
      </div>
      <Grid container spacing={1} style={{ marginTop: 10, padding: 10 }}>
        {data ? (
          data.map((value, key) => (
            <Grid
              key={key}
              container
              spacing={2}
              style={{
                marginTop: 10,
                backgroundColor: '#ffffff',
                borderRadius: '5px',
              }}
            >
              <Grid item xs={8}>
                <Paper style={{ padding: 5 }}>
                  <Typography variant="h5">{value.name}</Typography>
                  <Divider style={{ marginTop: 2, marginBottom: 2 }} />
                  {value.topic.map((value, key) => (
                    <Chip key={key} icon={<CheckCircleIcon />} label={value} />
                  ))}
                  <Divider style={{ marginTop: 3, marginBottom: 4 }} />
                  <Typography>{value.description}</Typography>
                  <Divider style={{ marginTop: 4, marginBottom: 3 }} />
                  <Button href={value.web} style={{ textTransform: 'none' }}>
                    <LanguageIcon /> Website
                  </Button>
                  <Button
                    href="#text-buttons"
                    style={{ textTransform: 'none' }}
                  >
                    <AssignmentIcon /> {value.license} License
                  </Button>
                  <Button
                    href="#text-buttons"
                    style={{ textTransform: 'none' }}
                  >
                    <CodeIcon /> {value.language}
                  </Button>
                  <Button href={value.sample} style={{ textTransform: 'none' }}>
                    <PhotoLibraryIcon /> Sample
                  </Button>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper>
                  <Button
                    href="#text-buttons"
                    style={{ textTransform: 'none' }}
                  >
                    <UpdateIcon /> {value.date.new}
                  </Button>
                  <br />
                  <Button
                    href="#text-buttons"
                    style={{ textTransform: 'none' }}
                  >
                    <GetAppIcon /> {value.download} downloads
                  </Button>
                  <br />
                  <Button
                    href="#text-buttons"
                    style={{ textTransform: 'none' }}
                  >
                    <StarIcon /> {value.star} stars
                  </Button>
                  <br />
                  <Button
                    href="#text-buttons"
                    style={{ textTransform: 'none' }}
                  >
                    <CallSplitIcon /> {value.fork} forks
                  </Button>
                  <br />
                  <Button
                    href="#text-buttons"
                    style={{ textTransform: 'none' }}
                  >
                    <ErrorIcon /> {value.issue} issues
                  </Button>
                </Paper>
              </Grid>
            </Grid>
          ))
        ) : isOffline ? (
          <Grid container spacing={1} style={{ marginTop: 10, padding: 10 }}>
            <Grid item xs={12}>
              <Offline />
            </Grid>
          </Grid>
        ) : (
          <Grid container spacing={1} style={{ marginTop: 10, padding: 10 }}>
            <Grid item xs={12}>
              <LinearProgress />
            </Grid>
          </Grid>
        )}
      </Grid>
    </>
  );
}
