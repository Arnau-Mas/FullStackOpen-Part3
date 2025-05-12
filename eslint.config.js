const globals = require('globals');
const pluginJs = require('@stylistic/eslint-plugin-js');  // Importa el plugin directamente

module.exports = [
  {
    files: ["**/*.js"], // Aplica para todos los archivos .js
    languageOptions: {
      sourceType: "commonjs",  // Usamos CommonJS
      globals: globals.node,   // Usamos los globales de Node.js
      parserOptions: {
        ecmaVersion: "latest",  // Para usar la versión más reciente de ECMAScript
      },
    },
    plugins: {
      '@stylistic/js': pluginJs,  // Aquí asignamos el plugin como un objeto
    },
    rules: {
      '@stylistic/js/indent': ['error', 2],
      '@stylistic/js/linebreak-style': ['error', 'unix'],
      '@stylistic/js/quotes': ['error', 'single'],
      '@stylistic/js/semi': ['error', 'never'],
      'eqeqeq': 'error',
      'no-trailing-spaces': 'error',
    'object-curly-spacing': [
        'error', 'always'
    ],
    'arrow-spacing': [
        'error', { 'before': true, 'after': true }
    ],
    'no-console': 0
    },
  },
  {
    files: [".eslintrc.{js,cjs}"], // Aplica para archivos de configuración de ESLint
    languageOptions: {
      sourceType: "script",  // Usamos "script" ya que no son módulos
      globals: globals.node, // Aseguramos los globales de Node.js
    },
  },
];
