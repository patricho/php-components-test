<?php

namespace Minso\TwigComponents;

use Twig\Environment;
use Twig\Loader\FilesystemLoader;

/**
 * ComponentsManager manages the registration of Twig components.
 * It provides methods to register components with a Twig environment.
 */
class ComponentsManager
{
    /**
     * @var string The base path to the components
     */
    private string $componentsPath;

    /**
     * Constructor.
     * 
     * @param string $componentsPath The base path to the components
     */
    public function __construct(string $componentsPath = null)
    {
        $this->componentsPath = $componentsPath ?? __DIR__ . '/components';
    }

    /**
     * Register components with the given Twig environment.
     * 
     * @param Environment $twig The Twig environment to register components with
     */
    public function register(Environment $twig): void
    {
        // Get the current loader
        $loader = $twig->getLoader();
        
        if (!$loader instanceof FilesystemLoader) {
            $loader = new FilesystemLoader();
            $twig->setLoader($loader);
        }
        
        // Add our components path
        $loader->addPath($this->componentsPath, 'components');
    }

    /**
     * Render a component with the given parameters.
     * 
     * @param Environment $twig The Twig environment
     * @param string $component The component name (e.g., 'alert/alert')
     * @param array $parameters The parameters to pass to the component
     * @return string The rendered component
     */
    public function render(Environment $twig, string $component, array $parameters = []): string
    {
        return $twig->render("@components/$component.twig", $parameters);
    }
}
