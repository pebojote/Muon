import React from 'react';
import ExploreIcon from '@material-ui/icons/Explore';
import StarIcon from '@material-ui/icons/Star';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';


export default function IconLabelTabs() {
  const [valueButtonOne, setValueButtonOne] = React.useState('contained');
  const [valueButtonTwo, setValueButtonTwo] = React.useState('text');
  const [valueButtonThree, setValueButtonThree] = React.useState('text');

  const handleChangeOne = (event: React.ChangeEvent<{}>) => {
    setValueButtonOne('contained');
    setValueButtonTwo('text');
    setValueButtonThree('text');
  };

  const handleChangeTwo = (event: React.ChangeEvent<{}>) => {
    setValueButtonOne('text');
    setValueButtonTwo('contained');
    setValueButtonThree('text');
  };

  const handleChangeThree = (event: React.ChangeEvent<{}>) => {
    setValueButtonOne('text');
    setValueButtonTwo('text');
    setValueButtonThree('contained');
  };

  return (
    <>
      <Box component="span" m={1}>
        <Button onClick={handleChangeOne} variant={valueButtonOne}>
          <ExploreIcon /> Explore
        </Button>
      </Box>
      <Box component="span" m={1}>
        <Button onClick={handleChangeTwo} variant={valueButtonTwo}>
          <StarIcon /> Popular
        </Button>
      </Box>
      <Box component="span" m={1}>
        <Button onClick={handleChangeThree} variant={valueButtonThree}>
          <TrendingUpIcon /> Trending
        </Button>
      </Box>
    </>
  );
}
