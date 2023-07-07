// eslint-env: node
module.exports = {
    root: true,
    env: {
        node: true,
    },
    parserOptions: {
        ecmaVersion: 'esnext',
        project: './tsconfig.json',
    },
    extends: [
        '@namorzyny',
        '@namorzyny/eslint-config/typescript',
    ],
    rules: {
        '@typescript-eslint/no-this-alias': 'off',
        '@typescript-eslint/prefer-readonly-parameter-types': 'off',
    },
};
