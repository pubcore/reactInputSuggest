[![Build Status](https://travis-ci.org/pubcore/reactInputSuggest.svg?branch=master)](https://travis-ci.org/pubcore/reactInputSuggest)
# reactInputSuggest

## install

in future with npm, not yet

## usage

	<InputAutocomplete 
		gofer={{}} 
		suggestions={[]} 
		T={{}} 
	/>

## properties

| property name | type | description |
| --- | --- | --- |
| suggestions | `Array` | array of usable suggestions |
| value | `String` or `Number` | intial value of the input field |
| gofer | `Object` | event responding functions |
| gofer.change | `function` | triggered after every change on input element, params: `inputValue` and `event` |
| gofer.activate | `function` | triggered after dropdown is shown, params: `event` |
| gofer.selectSuggestion | `function` | triggered after an elenemt from dropdown is selected, params: `selectedValue` and `event` |
| gofer.onKeyPress | `function` | triggered after every KeyPress in the component, params: `currentInputValue` and `event` |
| gofer.showMore | `function` | triggered after click on additonal element in dropdown to load more suggestions, params: `size` |
| classNames | `Object` | classNames for html elements. |
| T | `Object` | key value text key list |

### defaults

#### classNames

	{
		'dropdown': 'dropdown',
		'dropdownOpen': 'dropdown-open',
		'dropdownMore': 'dropdown-more',
		'dropdownValue': 'dropdown-value',
		'dropdownValueSelected': 'dropdown-value-selected',
		'container': 'form-input-suggest',
	}
