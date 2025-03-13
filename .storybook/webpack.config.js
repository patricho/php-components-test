module.exports = async ({ config }) => {
  // Add raw-loader for Twig files
  config.module.rules.push({
    test: /\.twig$/,
    use: [
      {
        loader: 'raw-loader',
        options: {},
      },
    ],
  });

  return config;
};
