module.exports = {
	"env": {
		"browser": true,
		"es6": true,
		"node": true,
		"mocha": true
	},
	"plugins": [
		"react",
		"mocha"
	],
	"extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
	"parserOptions": {
		"sourceType": "module",
		"ecmaFeatures":{
			"experimentalObjectRestSpread":true
		}
	},
	"rules": {
		"indent": [
			"error",
			"tab"
		],
		"linebreak-style": [
			"error",
			"unix"
		],
		"quotes": [
			"error",
			"single"
		],
		"semi": [
			"error",
			"never"
		]
	}
};
