import { renderTwig } from '../../../utils/twig-renderer';
import alertTemplate from '!!raw-loader!../alert-advanced.twig';

export default {
  title: 'Components/AdvancedAlert',
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['info', 'warning', 'error', 'success'],
      description: 'The type of alert',
      defaultValue: 'info',
    },
    message: {
      control: 'text',
      description: 'The alert message',
      defaultValue: 'This is an alert message',
    },
    title: {
      control: 'text',
      description: 'Optional title for the alert',
    },
    dismissible: {
      control: 'boolean',
      description: 'Whether the alert can be dismissed',
      defaultValue: false,
    },
    icon: {
      control: 'boolean',
      description: 'Whether to show an icon',
      defaultValue: true,
    },
  },
};

/**
 * Render the alert component with the given args
 * 
 * @param {Object} args - The arguments to pass to the template
 * @returns {string} - The rendered HTML
 */
const Template = (args) => {
  return renderTwig(alertTemplate, args);
};

export const Info = Template.bind({});
Info.args = {
  type: 'info',
  message: 'This is an information message',
  icon: true,
};

export const Warning = Template.bind({});
Warning.args = {
  type: 'warning',
  message: 'This is a warning message',
  icon: true,
};

export const Error = Template.bind({});
Error.args = {
  type: 'error',
  message: 'This is an error message',
  icon: true,
};

export const Success = Template.bind({});
Success.args = {
  type: 'success',
  message: 'This is a success message',
  icon: true,
};

export const WithTitle = Template.bind({});
WithTitle.args = {
  type: 'info',
  title: 'Important Information',
  message: 'This is an alert with a title',
  icon: true,
};

export const Dismissible = Template.bind({});
Dismissible.args = {
  type: 'success',
  message: 'This alert can be dismissed',
  dismissible: true,
  icon: true,
};

export const NoIcon = Template.bind({});
NoIcon.args = {
  type: 'warning',
  message: 'This alert does not have an icon',
  icon: false,
};

export const FullFeatured = Template.bind({});
FullFeatured.args = {
  type: 'success',
  title: 'Operation Complete',
  message: 'Your changes have been saved successfully.',
  dismissible: true,
  icon: true,
};
