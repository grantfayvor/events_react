module.exports = function (api) {
    // api.cache(true);
    api.cache(() => process.env.NODE_ENV === "production");
    return {
        "presets": [
            "@babel/preset-env",
            "@babel/preset-react"
        ],
        "plugins": ["react-hot-loader/babel", "@babel/plugin-syntax-dynamic-import", "@babel/plugin-proposal-class-properties", ["react-css-modules", {
            "webpackHotModuleReloading": true,
            "handleMissingStyleName": "warn"
        }]]
    }
}