const markdownIt = require('markdown-it');

const pluginDefaults = {
    markdown: true,
};

module.exports = {
    initArguments: {},
    configFunction: function(eleventyConfig, options = {}) {
        const pluginConfig = Object.assign(pluginDefaults, options);
        const md = markdownIt({
            html: true,
        });

        const tagName = 'figure';

        eleventyConfig.addLiquidTag(tagName, (liquidEngine) => {
            return {
                parse(tagToken, remainingTokens) {
                    this.src = tagToken.args;
                    this.templates = [];

                    const stream = liquidEngine.parser
                        .parseStream(remainingTokens)
                        .on('template', tpl => this.templates.push(tpl))
                        .on('tag:end' + tagName, token => stream.stop())
                        .on('end', x => {
                            throw new Error(`tag ${tagToken.raw} not closed`);
                        });

                    stream.start();
                },
                render(scope, hash) {
                    return liquidEngine.renderer
                        .renderTemplates(this.templates, scope)
                        .then(html => pluginConfig.markdown === true ? md.render(html) : html)
                        .then(html => process(html, this.src));
                }
            }
        });
    }
}

function process(content, src) {
    let output = '';
    output += '<figure>';
    output += '<img src="' + src + '" alt="' + escapeHtml(content) + '">';
    output += '<figcaption> ';
    output += content;
    output += ' </figcaption>';
    output += '</figure>';
    return output;
}

function escapeHtml(value) {
    return value.replace(/<[a-z/][^>]+>/gi, '');
}
