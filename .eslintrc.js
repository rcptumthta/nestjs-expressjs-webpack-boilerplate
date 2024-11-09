const base = {
  plugins: ["prettier", "promise", "sonarjs", "unicorn", "unused-imports"],
  extends: [
    "plugin:prettier/recommended",
    "plugin:promise/recommended",
    "plugin:sonarjs/recommended-legacy",
    "plugin:unicorn/recommended"
  ],
  rules: {
    "sonarjs/no-duplicate-string": "off",
    "sonarjs/prefer-nullish-coalescing": "off",
    "unicorn/no-null": "off",
    "unicorn/prefer-module": "off",
    "unicorn/prefer-string-raw": "off",
    "unicorn/prevent-abbreviations": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "error",
      {
        args: "after-used",
        argsIgnorePattern: "^_",
        vars: "all",
        varsIgnorePattern: "^_"
      }
    ]
  }
};

const baseJS = {
  plugins: [...base.plugins],
  extends: ["eslint:recommended", ...base.extends],
  rules: {
    "no-unused-vars": "off",
    ...base.rules
  }
};

const baseTS = {
  plugins: [...baseJS.plugins, "@typescript-eslint/eslint-plugin"],
  extends: [...baseJS.extends, "plugin:@typescript-eslint/recommended"],
  rules: {
    ...baseJS.rules,
    "@typescript-eslint/no-unused-vars": "off"
  }
};

module.exports = {
  root: true,
  env: {
    es6: true,
    node: true
  },
  overrides: [
    {
      files: ["*.js"],
      parserOptions: {
        ecmaVersion: 2022
      },
      plugins: baseJS.plugins,
      extends: baseJS.extends,
      rules: baseJS.rules
    },
    {
      files: ["*.ts"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: "tsconfig.json",
        tsconfigRootDir: __dirname,
        ecmaVersion: 2022,
        sourceType: "module"
      },
      plugins: baseTS.plugins,
      extends: baseTS.extends,
      rules: baseTS.rules
    },
    {
      files: ["*.json", "*.json5", "*.jsonc", "*.jsonl"],
      parser: "jsonc-eslint-parser",
      parserOptions: {
        jsonSyntax: "JSONC"
      },
      extends: ["plugin:jsonc/recommended-with-jsonc"],
      rules: {
        "jsonc/array-bracket-newline": "error",
        "jsonc/array-bracket-spacing": "error",
        "jsonc/array-element-newline": "error",
        "jsonc/comma-dangle": "error",
        "jsonc/comma-style": "error",
        "jsonc/indent": ["error", 2],
        "jsonc/key-spacing": "error",
        "jsonc/no-comments": "error",
        "jsonc/no-irregular-whitespace": "error",
        "jsonc/no-octal-escape": "error",
        "jsonc/object-curly-newline": "error",
        "jsonc/object-curly-spacing": "error",
        "jsonc/object-property-newline": "error"
      }
    }
  ]
};
