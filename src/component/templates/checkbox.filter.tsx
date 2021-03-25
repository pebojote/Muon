import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function CheckboxFilter({ getFiltered }) {
  let filtered: string[] = [];
  const selected = (event: object) => {
    if (event.target.checked) {
      filtered.push(event.target.value);
      console.log("Added: ", filtered);
      getFiltered(filtered);
    } else {
      filtered = filtered.filter((value)=> value !== event.target.value);
      console.log("Removed: ", filtered);
      getFiltered(filtered);
    }
  }
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Platform</FormLabel>
      <FormGroup aria-label="position" row>
        <FormControlLabel
          onChange={selected}
          value="android"
          control={<Checkbox />}
          label="Android"
          labelPlacement="end"
        />
        <FormControlLabel
          onChange={selected}
          value="ios"
          control={<Checkbox />}
          label="iOS"
          labelPlacement="end"
        />
        <FormControlLabel
          onChange={selected}
          value="windows"
          control={<Checkbox />}
          label="Windows"
          labelPlacement="end"
        />
        <FormControlLabel
          onChange={selected}
          value="macos"
          control={<Checkbox />}
          label="macOS"
          labelPlacement="end"
        />
        <FormControlLabel
          onChange={selected}
          value="web"
          control={<Checkbox />}
          label="Web"
          labelPlacement="end"
        />
      </FormGroup>
      <FormLabel component="legend">Language</FormLabel>
      <FormGroup aria-label="position" row>
        <FormControlLabel
          onChange={selected}
          value="c++"
          control={<Checkbox />}
          label="C++"
          labelPlacement="end"
        />
        <FormControlLabel
          onChange={selected}
          value="java"
          control={<Checkbox />}
          label="Java"
          labelPlacement="end"
        />
        <FormControlLabel
          onChange={selected}
          value="javascript"
          control={<Checkbox />}
          label="JavaScript"
          labelPlacement="end"
        />
        <FormControlLabel
          onChange={selected}
          value="php"
          control={<Checkbox />}
          label="PHP"
          labelPlacement="end"
        />
        <FormControlLabel
          onChange={selected}
          value="python"
          control={<Checkbox />}
          label="Python"
          labelPlacement="end"
        />
      </FormGroup>
    </FormControl>
  );
}
