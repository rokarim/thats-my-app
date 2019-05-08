import React from 'react';

const Select = props => {
  let optionElements = props.options.map(option =>{
    return (
      <option key={option.id} value={option}>{option}</option>
    );
  })

  return (
    <label>{props.label}
      <select id={props.name} name={props.name} value={props.selectedOption} onChange={props.handlerFunction}>
        <option value=""></option>
        {optionElements}
      </select>
    </label>
  );
}

export default Select;
