import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import SortIcon from '@material-ui/icons/Sort';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {
  createStyles,
  makeStyles,
  Theme,
  fade,
} from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import exploreData from './data/api.data';
import Offline from './templates/offline';
import FilterDialog from './templates/dialog.filter';
import PackageCard from './templates/PackageCard';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
    },
    headerBar: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(1, 2),
      marginBottom: theme.spacing(2),
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.black, 0.05),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.black, 0.1),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      flexGrow: 1,
      [theme.breakpoints.up('sm')]: {
        flexGrow: 0,
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
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '30ch',
      },
    },
    libraryCount: {
      margin: theme.spacing(0, 2),
    },
    flexGrow: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      width: '100%',
    },
  })
);

export default function Home() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [LibraryLength, setLibraryLength] = useState(
    <CircularProgress size={10} />
  );
  const [isOffline, setNetworkStatus] = useState(false);

  const [filter, setFilter] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [unsortedData, setUnsortedData] = useState([]);
  const [sortKey, setSortKey] = useState('date.new');

  const handleSortClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSortClose = (key: string | null) => {
    setAnchorEl(null);
    if (key) {
      setSortKey(key);
    }
  };

  const filteredData = (filtered) => {
    setFilter(filtered);
  };

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      try {
        const result = await exploreData(filter);
        if (mounted) {
          if (result === 'offline') {
            setNetworkStatus(true);
          } else {
            setUnsortedData(result);
            setLibraryLength(result.length);
          }
        }
      } catch (error) {
        console.log('Error: ', error.message);
      }
    };
    fetchData();
    return () => {
      mounted = false;
    };
  }, [filter]);

  useEffect(() => {
    let sorted = [...unsortedData];
    if (sortKey) {
      sorted.sort((a, b) => {
        if (sortKey === 'date.new') {
          return new Date(b.date.old) - new Date(a.date.old);
        }
        const aValue = parseInt(String(a[sortKey]).replace(/,/g, ''), 10);
        const bValue = parseInt(String(b[sortKey]).replace(/,/g, ''), 10);
        return bValue - aValue;
      });
    }
    setData(sorted);
  }, [unsortedData, sortKey]);

  return (
    <div className={classes.root}>
      <Paper className={classes.headerBar} elevation={1}>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search Libraries"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
        <div className={classes.flexGrow} />
        <Typography className={classes.libraryCount} variant="body2" color="textSecondary">
          {LibraryLength} libraries
        </Typography>
        <FilterDialog filteredData={filteredData} />
        <Button
          aria-controls="sort-menu"
          aria-haspopup="true"
          onClick={handleSortClick}
          style={{ textTransform: 'none' }}
        >
          <SortIcon /> Sort by
        </Button>
        <Menu
          id="sort-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={() => handleSortClose(null)}
        >
          <MenuItem onClick={() => handleSortClose('date.new')}>Last updated</MenuItem>
          <MenuItem onClick={() => handleSortClose('star')}>Stars</MenuItem>
          <MenuItem onClick={() => handleSortClose('fork')}>Forks</MenuItem>
          <MenuItem onClick={() => handleSortClose('issue')}>Issues</MenuItem>
        </Menu>
      </Paper>

      <Grid container spacing={3}>
        {data.length > 0 ? (
          data.map((value, key) => (
            <Grid item xs={12} key={key}>
              <PackageCard value={value} />
            </Grid>
          ))
        ) : isOffline ? (
          <Grid item xs={12}>
            <Offline />
          </Grid>
        ) : (
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center" p={4}>
              <CircularProgress />
            </Box>
          </Grid>
        )}
      </Grid>
    </div>
  );
}
