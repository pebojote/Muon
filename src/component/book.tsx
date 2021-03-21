import React from 'react';
import { Link } from 'react-router-dom';

const book = () => {
  return (
    <div>
      <div className="Hello">
        <Link to="/">
          <button type="button">Back</button>
        </Link>
      </div>
    </div>
  );
};

export default book;
