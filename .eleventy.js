const fs = require('fs');

module.exports = function (eleventyConfig) {
    eleventyConfig.addPlugin(require('@11ty/eleventy-plugin-syntaxhighlight'));
    eleventyConfig.addPlugin(require('eleventy-plugin-excerpt'));
    eleventyConfig.addPlugin(require('eleventy-plugin-youtube-embed'));
    eleventyConfig.addPlugin(require('eleventy-plugin-date'));
    eleventyConfig.addPlugin(require('eleventy-plugin-reading-time'));
    eleventyConfig.addPlugin(require('eleventy-plugin-markdown-shortcode'));

    eleventyConfig.addPlugin(require('eleventy-plugin-tipograph'));
    eleventyConfig.addPlugin(require('eleventy-plugin-katex'));
    eleventyConfig.addPlugin(require('eleventy-plugin-figures'));

    eleventyConfig.addPassthroughCopy('static');

    // For development (`--serve`) purposes.
    eleventyConfig.setBrowserSyncConfig({
        callbacks: {
            ready: function(err, bs) {
                bs.addMiddleware('*', (req, res) => {
                    const content404 = fs.readFileSync('_site/404.html');
                    // Provides the 404 content without redirect.
                    res.write(content404);
                    // Add 404 http status code in request header.
                    // res.writeHead(404, { "Content-Type": "text/html" });
                    res.writeHead(404);
                    res.end();
                });
            }
        }
    });
};
