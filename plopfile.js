module.exports = (plop) => {
  plop.setGenerator('component', {
    description: 'Create a component',
    // User input prompts provided as arguments to the template
    prompts: [
      {
        // Raw text input
        type: 'input',
        // Variable name for this input
        name: 'name',
        // Prompt to display on command line
        message: 'What is your component name?',
      },
      {
        type: 'input',
        name: 'subpath',
        message:
          'Enter subpath within src folder (e.g. components/ will be treated as src/components/)',
      },
    ],
    actions: [
      {
        // Generate component file
        // Add a new file
        type: 'add',
        // Path for the new file
        path: 'src/{{subpath}}{{pascalCase name}}/{{pascalCase name}}.tsx',
        // Handlebars template used to generate content of new file
        templateFile: 'plop-templates/Component.tsx.hbs',
      },
      {
        // Generate component-level index
        type: 'add',
        path: 'src/{{subpath}}{{pascalCase name}}/index.ts',
        templateFile: 'plop-templates/index.ts.hbs',
      },
      {
        // Generate SCSS module
        type: 'add',
        path: 'src/{{subpath}}{{pascalCase name}}/{{pascalCase name}}.module.scss',
      },
      {
        // Add root-level index if it does not already exist
        type: 'add',
        path: 'src/{{subpath}}index.ts',
        templateFile: 'plop-templates/index.ts.hbs',
        // If index.js already exists in this location, skip this action
        skipIfExists: true,
      },
      {
        // Add root-level index if it does not already exist
        // Action type 'append' injects a template into an existing file
        type: 'append',
        path: 'src/{{subpath}}index.ts',
        template: `export * from './{{pascalCase name}}';`,
      },
    ],
  });
};
