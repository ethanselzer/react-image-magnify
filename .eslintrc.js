module.exports = {
    env: {
        browser: true,
        'jest/globals': true,
    },
    extends: [
        'airbnb',
        'airbnb/hooks',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
    ],
    overrides: [
        {
            files: ['*.spec.ts'],
            rules: {
                'no-unused-expressions': 'off',
            },
        }, {
            files: ['*.js'],
            rules: {
                '@typescript-eslint/no-var-requires': 'off',
            },
        }, {
            // enable the rule specifically for TypeScript files
            files: ['*.ts', '*.tsx'],
            rules: {
                '@typescript-eslint/explicit-function-return-type': ['error'],
            },
        }, {
            files: ['*.d.ts'],
            rules: {
                '@typescript-eslint/no-unused-vars': 'off',
            },
        }, {
            files: ['src/stories/*.tsx'],
            rules: {
                'import/no-default-export': 'off',
                'import/no-extraneous-dependencies': 'off',
            },
        },
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        tsconfigRootDir: __dirname,
        ecmaVersion: 10,
        ecmaFeatures: {
            jsx: true,
        },
        project: './tsconfig.dev.json',
        sourceType: 'module',
    },
    plugins: [
        '@typescript-eslint',
        'import',
        'jest',
        'react',
    ],
    rules: {
        'class-methods-use-this': 'off',
        'import/extensions': ['error', {
            json: 'always',
            js: 'never',
            ts: 'never',
        }],
        'import/no-default-export': 'error',
        'import/no-extraneous-dependencies': ['error', {
            devDependencies: [
                'jest/**',
                'src/**/__tests__/**',
                'src/**/__test__/**',
                'webpack.config.js',
            ],
        }],
        'import/prefer-default-export': 'off',
        indent: 'off',
        // Override airbnb's max line length rule to:
        // - increase the line length limit to 120
        // - Set tab width to 4 spaces
        // - also ignore import statements and class inheritance
        'max-len': ['error', 120, 4, {
            ignorePattern: '^import [^,]+ from |^export | implements',
            ignoreUrls: true,
            ignoreComments: false,
            ignoreRegExpLiterals: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true,
        }],
        'newline-after-var': ['error', 'always'],
        // A Promise within a promise? How meta, but actually useful
        // We disable this and assume developers wield this power responsibly
        'no-async-promise-executor': 'off',
        'no-debugger': 'warn',
        'no-bitwise': 'off',
        // Boolean logic is boolean logic. Developers hsould understand order of operations.
        'no-mixed-operators': 'off',
        'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
        // This is an old rule that is slowly not applicable anymore (i.e. for-of is ok now)
        'no-restricted-syntax': 'off',
        'no-shadow': 'off',
        'no-underscore-dangle': ['error', { allow: ['_embedded'] }],
        'no-use-before-define': 'off',
        'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        // This is silly to enable
        'react/jsx-props-no-spreading': 'off',
        'react/jsx-sort-props': ['error', {
            callbacksLast: true,
            ignoreCase: true,
            noSortAlphabetically: true,
            shorthandFirst: true,
        }],
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/require-default-props': 'off',
        'react/state-in-constructor': 'off',
        quotes: ['error', 'single', { allowTemplateLiterals: true }],
        // Sometimes we just need to
        '@typescript-eslint/ban-ts-ignore': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        // Default to off so we don't type check js
        '@typescript-eslint/explicit-function-return-type': 'off',
        // Don't enforce the rule that interfaces should not be prefix with `I`
        '@typescript-eslint/interface-name-prefix': 'off',
        // Override airbnb's typescript indent rule to:
        // - increase spacing from 2 to 4
        // - disable call expression indentation
        // Keep everything else
        '@typescript-eslint/indent': ['error', 4, {
            SwitchCase: 1,
            VariableDeclarator: 1,
            outerIIFEBody: 1,
            // MemberExpression: null,
            FunctionDeclaration: {
                parameters: 1,
                body: 1,
            },
            FunctionExpression: {
                parameters: 1,
                body: 1,
            },
            CallExpression: {
                arguments: 1,
            },
            ArrayExpression: 1,
            ObjectExpression: 1,
            ImportDeclaration: 1,
            flatTernaryExpressions: false,
            // list derived from https://github.com/benjamn/ast-types/blob/HEAD/def/jsx.js
            ignoredNodes: [
                'JSXElement',
                'JSXElement > *',
                'JSXAttribute',
                'JSXIdentifier',
                'JSXNamespacedName',
                'JSXMemberExpression',
                'JSXSpreadAttribute',
                'JSXExpressionContainer',
                'JSXOpeningElement',
                'JSXClosingElement',
                'JSXText',
                'JSXEmptyExpression',
                'JSXSpreadChild',
            ],
            ignoreComments: false,
        }],
        '@typescript-eslint/no-shadow': ['error'],
        '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],
        '@typescript-eslint/no-use-before-define': ['error'],
        '@typescript-eslint/type-annotation-spacing': ['error', {
            before: false,
            after: true,
            overrides: {
                arrow: {
                    before: true,
                    after: true,
                },
            },
        }],
    },
    settings: {
        react: {
            pragma: 'React',
            version: 'detect',
        },
        'import/parsers': {
            '@typescript-eslint/parser': [
                '.ts',
                '.tsx',
            ],
        },
        'import/extensions': [
            '.js',
            '.jsx',
            '.mjs',
            '.ts',
            '.txs',
        ],
        'import/resolver': {
            typescript: {
                alwaysTryTypes: true,
            },
        },
    },
};
