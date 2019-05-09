import React from 'react';

const TextField = props => {
  return (
    <label className={props.className}>{props.label}
      <input
        id={props.name}
        name={props.name}
        type='text'
        value={props.content}
        onChange={props.handlerFunction}
      />
    </label>
  );
}

export default TextField;
