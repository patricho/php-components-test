# Minso Twig Components

A simple library of reusable Twig components for PHP sites.

## Installation

```
composer require minso/twig-components
```

## Usage

### In PHP

```php
use Minso\TwigComponents\ComponentsManager;
use Twig\Environment;
use Twig\Loader\FilesystemLoader;

// Initialize Twig
$loader = new FilesystemLoader(__DIR__ . '/templates');
$twig = new Environment($loader);

// Register components
$componentsManager = new ComponentsManager();
$componentsManager->register($twig);

// Render a component directly
echo $componentsManager->render($twig, 'alert/alert', [
    'type' => 'info',
    'message' => 'This is an info message',
]);
```

### In Twig Templates

```twig
{# Include the alert component #}
{% include '@components/alert/alert.twig' with {
    'type': 'warning',
    'message': 'This is a warning message'
} %}
```

## Available Components

### Alert

The Alert component displays a message with an icon, indicating the type of alert.

#### Parameters

- `type` (string): The alert type. Can be 'info', 'warning', or 'error'. Default: 'info'.
- `message` (string): The alert message.

#### Example

```twig
{% include '@components/alert/alert.twig' with {
    'type': 'error',
    'message': 'This is an error message'
} %}
```

### Advanced Alert

The Advanced Alert component extends the basic alert with more options.

#### Parameters

- `type` (string): The alert type. Can be 'info', 'warning', 'error', or 'success'. Default: 'info'.
- `message` (string): The alert message.
- `title` (string, optional): Optional title for the alert.
- `dismissible` (boolean, optional): Whether the alert can be dismissed.
- `icon` (boolean, optional): Whether to show an icon. Default: true.

#### Example

```twig
{% include '@components/alert-advanced/alert-advanced.twig' with {
    'type': 'success',
    'title': 'Operation Complete',
    'message': 'Your changes have been saved successfully.',
    'dismissible': true
} %}
```

## Development

### Setup

```
npm install
composer install
```

### Running Storybook

```
npm run storybook
```

### Building Storybook

```
npm run build-storybook
```

### Generating HTML Templates

The project includes scripts to generate clean HTML templates from Twig templates, which can be used as a base for JavaScript web components.

#### Using PHP (Recommended)

This method uses the PHP Twig engine to render clean templates with all the proper Twig functionality:

```
composer generate-templates
```

Or using npm:

```
npm run generate-templates
```

#### Using JavaScript (Alternative)

We also provide JavaScript-based template generators:

```
npm run generate-templates-js
npm run generate-templates-js-v2
```

The generated templates will be placed alongside the original Twig files with a `.template.html` extension.

## Using HTML Templates for Web Components

The generated `.template.html` files can be used as a base for JavaScript web components. For example:

```javascript
class AlertComponent extends HTMLElement {
  constructor() {
    super();
    
    // Load the template
    const template = document.createElement('template');
    template.innerHTML = `
      <!-- Content from .template.html file -->
      <div class="alert" role="alert">
        <div class="alert__content">
          <span class="alert__icon"></span>
          <span class="alert__message"></span>
        </div>
      </div>
    `;
    
    // Create shadow DOM
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    
    // Get references to elements
    this.alertElement = this.shadowRoot.querySelector('.alert');
    this.iconElement = this.shadowRoot.querySelector('.alert__icon');
    this.messageElement = this.shadowRoot.querySelector('.alert__message');
  }
  
  // Observe attributes
  static get observedAttributes() {
    return ['type', 'message'];
  }
  
  // Handle attribute changes
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'type') {
      this.alertElement.className = `alert alert--${newValue || 'info'}`;
      this.updateIcon(newValue);
    } else if (name === 'message') {
      this.messageElement.textContent = newValue;
    }
  }
  
  // Update icon based on type
  updateIcon(type) {
    switch (type) {
      case 'info':
        this.iconElement.textContent = 'ℹ️';
        break;
      case 'warning':
        this.iconElement.textContent = '⚠️';
        break;
      case 'error':
        this.iconElement.textContent = '❌';
        break;
      case 'success':
        this.iconElement.textContent = '✅';
        break;
      default:
        this.iconElement.textContent = 'ℹ️';
    }
  }
}

// Register the web component
customElements.define('minso-alert', AlertComponent);
```

This approach allows you to create a consistent design system that works both in PHP applications using Twig and in JavaScript applications using web components.
