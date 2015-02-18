import React from 'react';
import dispatcher from '../dispatcher';

var StateFilter = React.createClass({
    render() {
        return (
            <div className="StateFilter">
            	{
            		['all', 'active', 'done'].map(state => {
                        let lclass = 'StateFilter--label' +
                            (this.props.filter === state ? ' __active' : '');

               			return (
                            <label className={lclass} key={state}>
    		            		<input
                                    className="StateFilter--radio"
    		            			type="radio"
    		            			name="stateFilterRadio"
    		            			value={state}
    		            			checked={this.props.filter === state}
    		            			onChange={this.onRadioChange}
    		            		/>

    		            		<span className="StateFilter--labelText">
                                    {this._capitalize(state)}
                                </span>
    		            	</label>
                        );
                    })
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
