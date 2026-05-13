const { withAppBuildGradle } = require("expo/config-plugins");

module.exports = function withArm64Only(config) {
  return withAppBuildGradle(config, (config) => {
    let gradle = config.modResults.contents;

    const splitConfig = `
    splits {
        abi {
            enable = true
            reset()
            include("arm64-v8a")
            universalApk = false
        }
    }
`;

    // Add splits inside android {}
    if (!gradle.includes("splits {")) {
      gradle = gradle.replace(/android\s*\{/, `android {${splitConfig}`);
    }

    config.modResults.contents = gradle;

    return config;
  });
};
