/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import uiText from 'pubcore-ui-text'
import onClickOutside from 'react-onclickoutside'
import PropTypes from './InputSuggest.types'
import Defaults from './InputSuggest.defaults'

class InputSuggest extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			value: this.props.value || '',
			dropdown: false,
			selected: '',
			suggestions: this.props.suggestions
		}
		this.handleClickOutside = this.handleClickOutside.bind(this)
		this.onInput = this.onInput.bind(this)
		this.onFocus = this.onFocus.bind(this)
		this.selectSuggestion = this.selectSuggestion.bind(this)
		this.onKeyPress = this.onKeyPress.bind(this)
	}
	componentWillReceiveProps(props) {
		var newState = {suggestions: props.suggestions}
		if(typeof(props.value)=='string') {
			newState['value'] = props.value
		}
		this.setState(newState)
	}
	handleClickOutside(e) {
		this.setState({dropdown: false})
		this.props.gofer.close && this.props.gofer.close(e.target.value, e)
	}
	setValue(newValue, dropdown) {
		var suggestions = this.props.suggestions.filter(val => val.toLowerCase().indexOf(newValue.toLowerCase())>=0)
		this.setState({value: newValue, dropdown, suggestions, selected: ''})
		this.props.gofer.change && this.props.gofer.change(newValue)
	}
	onInput(e) {
		this.setValue(e.target.value, true)
	}
	onFocus(e) {
		this.setState({dropdown: true, selected: ''})
		this.props.gofer.activate && this.props.gofer.activate(e)
	}
	useSuggestion(newValue) {
		this.setState({selected: newValue})
	}
	selectSuggestion(newValue, e) {
		this.setValue(newValue)
		this.props.gofer.selectSuggestion && this.props.gofer.selectSuggestion(newValue, e)
	}
	selectNextSuggestion() {
		this.state.dropdown && this.useSuggestion(this.state.suggestions[(this.state.suggestions.indexOf(this.state.selected)+1)] || '')
		this.setState({dropdown: true})
	}
	selectPreviousSuggestion() {
		var key = this.state.suggestions.indexOf(this.state.selected)-1
		if(key < 0) {
			key = this.state.suggestions.length -1
		}
		this.state.dropdown && this.useSuggestion(this.state.suggestions[key] || '')
	}
	onKeyPress(e) {
		switch(e.key) {
		case 'Enter':
			this.state.dropdown && e.preventDefault()
			this.state.selected && this.selectSuggestion(this.state.selected)
			break
		case 'ArrowDown':
			this.selectNextSuggestion(e)
			break
		case 'ArrowUp':
			this.selectPreviousSuggestion(e)
			break
		}
		this.props.gofer.onKeyPress && this.props.gofer.onKeyPress(e, this.state.selected)
	}
	render() {
		const {T, gofer, className, classNames, inputProps, minsize} = this.props,
			{suggestions, selected} = this.state

		return <div className={(classNames.container)+(className||'')} onKeyDown={this.onKeyPress}>
			<input
				{...inputProps}
				type="text"
				value={this.state.value}
				onChange={this.onInput}
				onFocus={this.onFocus}
			/>
			{this.props.loading && this.props.loading()}
			{Array.isArray(suggestions) && suggestions.length && !(suggestions.length === 1 && suggestions[0] === this.state.value)  ?
				<div className={classNames.dropdown + (this.state.dropdown ? ' ' + classNames.dropdownOpen : '')} >
					{suggestions.map((val, i) =>
						<div
							key={i}
							className={classNames.dropdownValue + (selected === val ? ' ' + classNames.dropdownValueSelected : '')}
							onClick={() => this.selectSuggestion(val)}
							onMouseOver={e => this.useSuggestion(val,e)}
						>
							{val}
						</div>
					)}
					{gofer.showMore && <div
						className={classNames.dropdownMore}
						onClick={() => gofer.showMore(minsize)}
					>
						{uiText(T, 'inputSuggestShowMore', '... show {count} more', {count:minsize})}
					</div>
					}

				</div>
				: null
			}
		</div>
	}
}

InputSuggest.propTypes = PropTypes
InputSuggest.defaultProps = Defaults

export default onClickOutside(InputSuggest)
export const PureInputSuggest = InputSuggest
