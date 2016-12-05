import React from 'react';

const NewPlaylist = (props) => {
	// console.log(props);
	return (
		<div className="well">
		  <form className="form-horizontal" onSubmit={props.handleSubmit}>
		    <fieldset>
		      <legend>New Playlist</legend>
		      <div className="form-group">
		        <label className="col-xs-2 control-label">Name</label>
		        <div className="col-xs-10">
		          <input value={props.currentInput} className="form-control" type="text" onChange={props.handleChange}/>
		        </div>
		      </div>
		      <div className="form-group">
		        <div className="col-xs-10 col-xs-offset-2">
		          <button disabled={props.invalidInput} type="submit" className="btn btn-success">Create Playlist</button>
		        </div>
		      </div>
		    </fieldset>
		  </form>
		</div>
	)
}

export default NewPlaylist;
