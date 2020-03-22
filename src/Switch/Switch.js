import React from 'react';
import "./Switch.css";

const Switch = () => {
  return (
    <div className="switch">
      <input type="radio" className="switch-input" name="sort" value="relevance" id="relevance" defaultChecked />
      <label htmlFor="relevance" className="switch-label switch-label-off">Relevance</label>
      <input type="radio" className="switch-input" name="sort" value="date" id="date" />
      <label htmlFor="date" className="switch-label switch-label-on">Date</label>
      <span className="switch-selection"></span>
    </div>
  )
}

export default Switch;