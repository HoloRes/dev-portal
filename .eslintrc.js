module.exports = {
  extends: [
    'next', 'next/core-web-vitals', 'airbnb-typescript/base'
  ],
  parserOptions: {
    project: './tsconfig.json'
  },
	rules: {
		'no-tabs': 'off',
		indent: 'off',
		'sort-keys': 'off',
		'prettier/prettier': ['off', {
			useTabs: false
		}],
		'@typescript-eslint/indent': ['error', 'tab'],
		'react/jsx-indent': ['error', 'tab'],
		'react/jsx-indent-props': ['error', 'tab'],
		'react/react-in-jsx-scope': 'off',
		'no-underscore-dangle': 'off', // Mongoose uses _id
		'no-plusplus': ['error', {
			'allowForLoopAfterthoughts': true,
		}],
		'jsx-a11y/label-has-associated-control': 'off',
		'jsx-a11y/anchor-is-valid': [ 'error', {
			'components': [ 'Link' ],
			'specialLink': [ 'hrefLeft', 'hrefRight' ],
			'aspects': [ 'invalidHref', 'preferButton' ]
		}]
	}
}
