import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import BookCard from './templates/card';
import androidImage from './assets/images/book cover/android.png';
import cplusImage from './assets/images/book cover/cplus.png';
import iosImage from './assets/images/book cover/ios.png';
import javaImage from './assets/images/book cover/java.png';
import javascriptImage from './assets/images/book cover/javascript.png';
import linuxImage from './assets/images/book cover/linux.png';
import pythonImage from './assets/images/book cover/python.png';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  })
);

const books = [
  {
    image: androidImage,
    name: 'Android',
    description:
      'Android is a mobile operating system based on a modified version of the Linux kernel and other open source software, designed primarily for touchscreen mobile devices such as smartphones and tablets.',
    background: '#a4c639',
    color: '#ffffff',
  },
  {
    image: cplusImage,
    name: 'C++',
    description:
      'C++ is a general-purpose programming language created by Bjarne Stroustrup as an extension of the C programming language, or "C with Classes". ',
    background: '#3f2b96',
    color: '#ffffff',
  },
  {
    image: iosImage,
    name: 'iOS',
    description:
      'iOS is a mobile operating system created and developed by Apple Inc. exclusively for its hardware.',
    background: '#D3CCE3',
    color: '#ffffff',
  },
  {
    image: javaImage,
    name: 'Java',
    description:
      'Java is a class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible.',
    background: '#c94b4b',
    color: '#ffffff',
  },
  {
    image: javascriptImage,
    name: 'JavaScript',
    description:
      'JavaScript, often abbreviated as JS, is a programming language that conforms to the ECMAScript specification.',
    background: '#FDC830',
    color: '#ffffff',
  },
  {
    image: linuxImage,
    name: 'Linux',
    description:
      'Linux is a family of open-source Unix-like operating systems based on the Linux kernel, an operating system kernel first released on September 17, 1991, by Linus Torvalds. Linux is typically packaged in a Linux distribution.',
    background: '#f5af19',
    color: '#ffffff',
  },
  {
    image: pythonImage,
    name: 'Python',
    description:
      'Python is an interpreted, high-level and general-purpose programming language.',
    background: '#00467F',
    color: '#ffffff',
  },
];

export default function home() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {books.map((value, key) => (
          <Grid item xs={4} key={key}>
            <BookCard Book={value} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
