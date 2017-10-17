import React from 'react'
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
		this.setState({suggestions: props.suggestions})
	}
	handleClickOutside(e) {
		this.setState({dropdown: false})
		this.props.gofer.close && this.props.gofer.close(e.target.value, e)
	}
	setValue(newValue, dropdown) {
		var suggestions = this.props.suggestions.filter(val => val.toLowerCase().indexOf(newValue.toLowerCase())>=0)
		this.setState({value: newValue, dropdown, suggestions})
		this.props.gofer.change && this.props.gofer.change(newValue)
	}
	onInput(e) {
		this.setValue(e.target.value, true)
	}
	onFocus(e) {
		this.setState({dropdown: true})
		this.props.gofer.activate && this.props.gofer.activate(e)
	}
	selectSuggestion(newValue, e) {
		this.setState({selected: newValue})
		this.props.gofer.selectSuggestion && this.props.gofer.selectSuggestion(newValue, e)
	}
	selectNextSuggestion(e) {
		this.state.dropdown && this.selectSuggestion(this.state.suggestions[(this.state.suggestions.indexOf(this.state.selected)+1)] || '' ,e)
		this.setState({dropdown: true})
	}
	selectPreviousSuggestion(e) {
		var key = this.state.suggestions.indexOf(this.state.selected)-1
		if(key < 0) {
			key = this.state.suggestions.length -1
		}
		this.state.dropdown && this.selectSuggestion(this.state.suggestions[key] || '' ,e)
	}
	onKeyPress(e) {
		this.props.gofer.onKeyPress && this.props.gofer.onKeyPress(this.state.value, e)
		switch(e.key) {
		case 'Enter':
			this.state.dropdown && e.preventDefault()
			return this.setValue(this.state.selected, false)
		case 'ArrowDown': return this.selectNextSuggestion(e)
		case 'ArrowUp': return this.selectPreviousSuggestion(e)
		}
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
				onBlur={this.hideDropdown}
			/>
			{this.props.loading && this.props.loading()}
			{Array.isArray(suggestions) && suggestions.length && !(suggestions.length === 1 && suggestions[0] === this.state.value)  ?
				<div className={classNames.dropdown + (this.state.dropdown ? ' ' + classNames.dropdownOpen : '')} >
					{suggestions.map((val, i) =>
						<div
							key={i}
							className={classNames.dropdownValue + (selected === val ? ' ' + classNames.dropdownValueSelected : '')}
							onClick={() => this.setValue(val)}
							onMouseOver={e => this.selectSuggestion(val,e)}
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
