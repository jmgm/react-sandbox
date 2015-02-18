import React from 'react';
import dispatcher from '../dispatcher';

var StateFilter = React.createClass({
    render() {
        return (
            <div className="StateFilter">
            	{
            		['all', 'active', 'done'].map(state =>
            			<label key={state}>
		            		<input
		            			type="radio"
		            			name="stateFilterRadio"
		            			value={state}
		            			checked={this.props.filter === state}
		            			onChange={this.onRadioChange}
		            		/>

		            		{this._capitalize(state)}
		            	</label>
            		)
            	}
            </div>
        );
    },

    onRadioChange(e) {
    	dispatcher.dispatch('setStateFilter', e.target.value);
    },

    _capitalize(str) {
    	return str.charAt(0).toUpperCase() + str.slice(1);
    }
});

export default StateFilter;
