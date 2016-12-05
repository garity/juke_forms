import React from 'react';

const FilterInput = (props) => {
	const handleChange = props.handleChange;
	  return (
	    <form className="form-group" style={{marginTop: '20px'}}  >
	      <input
	        className="form-control"
	        onChange={handleChange}
	        placeholder="Enter artist name"   
	      />
	    </form>
	  );
}

export default FilterInput;