import React, {Component} from 'react';
import FilterInput from '../components/FilterInput';
import Artists from '../components/Artists';

export default class Filter extends Component {
	constructor(props){
		super(props);
		this.state = {
			currInput:''
		}
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.setState({currInput: event.target.value})
	}

	filterArtists() {
		const artists = this.props.artists;
		const input = this.state.currInput;

		const filteredArtists = artists.filter(artist => {
			
		})
		return filteredArtists;
	}

	render(){
		const input = this.state.currInput;
		const filteredArtists = this.props.artists.filter(artist => {
			// artist.name.match(input);
			for (var i = 0; i < input.length; i++) {
				if(input[i] !== artist.name[i]){
					return false;
				}
			}
			return true;
		})

		return (
			<div>
				<FilterInput handleChange={this.handleChange}/>
				<Artists artists={filteredArtists} />
			</div>
		)
	}
}