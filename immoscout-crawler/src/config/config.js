const yaml = require('js-yaml');
const fs = require('fs');
const path = require("path");

const getConfig = () => {
  try {
    const defaultFullPath = path.resolve(__dirname, '../../defaultConfigFile/config.yaml');
    const fullPath = path.resolve(__dirname, '../../configFile/config.yaml');
    const filePath = fs.existsSync(fullPath) ? fullPath : defaultFullPath;
    console.log('Reading config from ', filePath);
    const config =  yaml.safeLoad(fs.readFileSync(filePath, 'utf8'));
    console.log('Schedule: ', config.cronSchedule);
    return config;
  } catch (e) {
    console.log(e);
    return { storage: {} }
  }
};

module.exports = getConfig();