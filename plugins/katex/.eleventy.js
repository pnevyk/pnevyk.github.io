const katex = require('katex');

const pluginDefaults = {
    macros: {},
};

module.exports = {
    initArguments: {},
    configFunction: function(eleventyConfig, options = {}) {
        const pluginConfig = Object.assign(pluginDefaults, options);

        // addShortcode cannot be used because it fails when embracing quotes are used.
        eleventyConfig.addLiquidTag('katex-inline', (liquidEngine) => {
            return {
                parse(tagToken, remainingTokens) {
                    this.formula = tagToken.args;
                },
                render(scope, hash) {
                    var formula = liquidEngine.evalValue(this.formula, scope).replace(/^"|"$/, '');
                    return Promise.resolve(katex.renderToString(formula, {
                        displayMode: false,
                        macros: pluginConfig.macros,
                    }));
                }
            }
        });

        eleventyConfig.addPairedShortcode('katex-block', (content) => {
            return katex.renderToString(content, {
                displayMode: true,
                macros: pluginConfig.macros,
            });
        });
    }
}
