module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    '@eslint/js/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks'],
  rules: {
    // Prevent console statements in production
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    
    // React specific rules
    'react/react-in-jsx-scope': 'off', // Not needed with React 17+
    'react/prop-types': 'warn',
    'react/no-unused-prop-types': 'warn',
    'react/no-array-index-key': 'warn',
    
    // React Hooks rules
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    
    // General code quality
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'no-debugger': 'error',
    'no-alert': 'warn',
    'prefer-const': 'warn',
    'no-var': 'error',
    
    // Import organization
    'sort-imports': ['warn', { ignoreDeclarationSort: true }],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}; 