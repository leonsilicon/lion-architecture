const createAlias = require('@leonzalion/configs/eslint/alias.cjs');
const path = require('path');

module.exports = {
	extends: ['@leonzalion/configs/eslint.cjs'],
	parserOptions: { project: [path.resolve(__dirname, 'tsconfig.eslint.json')] },
	settings: createAlias({ '~': './src', '~test': './test' }),
};
