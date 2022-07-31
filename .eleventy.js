let markdownIt = require("markdown-it");

module.exports = function (eleventyConfig) {
    const md = new markdownIt({
        html: true,
    });
    eleventyConfig.addPassthroughCopy({
        "node_modules/@glidejs/glide/dist/css/glide.core.min.css":
            "lib/glide.core.min.css",
        "node_modules/@glidejs/glide/dist/glide.min.js": "lib/glide.min.js",
        // "node_modules/lite-youtube-embed/src/lite-yt-embed.css":
        //     "lib/lite-yt-embed.css",
        //     "node_modules/lite-youtube-embed/src/lite-yt-embed.js":
        //         "lib/lite-yt-embed.js",
    });

    eleventyConfig.addPairedShortcode("markdown", (content) => {
        return md.render(content);
    });
    eleventyConfig.addGlobalData("permalink", () => {
        // We don't need any other pages beside index.html
        return () => false;
    });
};
