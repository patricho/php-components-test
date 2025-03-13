import { renderTwig } from '../../../utils/twig-renderer';
import alertTemplate from '!!raw-loader!../alert.twig';

export default {
  title: 'Components/Alert',
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['info', 'warning', 'error'],
      description: 'The type of alert',
      defaultValue: 'info',
    },
    message: {
      control: 'text',
      description: 'The alert message',
      defaultValue: 'This is an alert message',
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
};

export const Warning = Template.bind({});
Warning.args = {
  type: 'warning',
  message: 'This is a warning message',
};

export const Error = Template.bind({});
Error.args = {
  type: 'error',
  message: 'This is an error message',
};
