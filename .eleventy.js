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
};
