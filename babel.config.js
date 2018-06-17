const presets = ['@babel/env', '@babel/flow'];
const plugins = ['@babel/plugin-proposal-object-rest-spread'];
const config = {
  presets,
  plugins,
};
module.exports = (api) => {
  api.cache(true);
  return config;
};
