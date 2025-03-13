import Twig from 'twig';

// Register the Twig engine
Twig.cache(false);

/**
 * Render a Twig template with the given context
 * 
 * @param {string} template - The Twig template to render
 * @param {Object} context - The data to pass to the template
 * @returns {string} - The rendered HTML
 */
export const renderTwig = (template, context = {}) => {
  try {
    const twigTemplate = Twig.twig({ data: template });
    return twigTemplate.render(context);
  } catch (error) {
    console.error('Error rendering Twig template:', error);
    return `<div class="error">Error rendering template: ${error.message}</div>`;
  }
};

/**
 * Load a Twig template from a file
 * 
 * @param {string} path - The path to the Twig template
 * @returns {string} - The template content
 */
export const loadTemplate = (path) => {
  // In a real implementation, this would load the template from the filesystem
  // For Storybook, we'll use webpack's require to load the template content
  try {
    return require(`!!raw-loader!../${path}`).default;
  } catch (error) {
    console.error('Error loading template:', error);
    return '';
  }
};
