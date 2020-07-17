const tipograph = require('tipograph');

const pluginDefaults = {
    format: 'html',
    language: 'english',
};

module.exports = {
    initArguments: {},
    configFunction: function(eleventyConfig, options = {}) {
        const pluginConfig = Object.assign(pluginDefaults, options);
        const typo = tipograph(pluginConfig);

        eleventyConfig.addTransform("tipograph", async (content, outputPath) => {
            if (outputPath && outputPath.endsWith(".html")) {
                return typo(preprocess(content));
            } else {
                return content;
            }
        });
    }
}

function preprocess(content) {
    // Prepare the text for tipograph processing.
    return content.replace(/&quot;/g, '"');
}
