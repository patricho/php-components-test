<?php
// This is an example of how to use the components in a PHP project

require_once 'vendor/autoload.php';

use Minso\TwigComponents\ComponentsManager;
use Twig\Environment;
use Twig\Loader\FilesystemLoader;

// Initialize Twig
$loader = new FilesystemLoader(__DIR__ . '/templates');
$twig = new Environment($loader, [
    'cache' => false,
    'debug' => true,
]);

// Register components
$componentsManager = new ComponentsManager(__DIR__ . '/src/components');
$componentsManager->register($twig);

// Usage in a template (templates/example.twig):
// {% include '@components/alert/alert.twig' with {'type': 'info', 'message': 'This is an info message'} %}

// Or direct rendering in PHP:
echo $componentsManager->render($twig, 'alert/alert', [
    'type' => 'warning',
    'message' => 'This is a warning message',
]);
