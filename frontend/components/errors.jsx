import React from 'react';

const Errors = ({errors}) => (
  <ul className="errors">{errors.map((error, i) => <li key={i}>{error}</li>)}</ul>
)

export default Errors;