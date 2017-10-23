import {PropTypes as PT} from 'prop-types'

export default {
	key:PT.oneOfType([PT.string, PT.number]),
	value:PT.oneOfType([PT.string, PT.number, PT.array]),
	suggestions:PT.arrayOf(PT.oneOfType([PT.string, PT.object, PT.number])),
	gofer:PT.object.isRequired,
	classNames:PT.object.isRequired,
	minsize: PT.number.isRequired,
	loading: PT.func,
	T:PT.oneOfType([PT.object,PT.array]).isRequired
}
