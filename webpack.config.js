const { resolve, sep, basename } = require("path");
const { readdirSync } = require("fs");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { name, displayName } = require("./package.json");

function getFiles(dir) {
    let dirents = readdirSync(dir, { withFileTypes: true });
    let files = dirents.map((dirent) => {
        let res = resolve(dir, dirent.name);
        return dirent.isDirectory() ? getFiles(res) : res;
    });
    return files.flat();
}

const baseConfig = {
    target: "web",
    devtool : "source-map",
    optimization: {

        // `export default` doesn't work in Webpack 5+, lol
        chunkIds: "size",
        moduleIds: "size",

        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    output: {
                        beautify: false
                    },
                },
            }),
        ],
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: false,
            cleanOnceBeforeBuildPatterns: [resolve(__dirname, './dist')],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: [/node_modules/, /test/],
                use: [
                    {
                        loader: "ts-loader",
                    }
                ],
            }
        ],
    },
    resolve: {
        extensions: [".js", ".ts", ".tsx"],
    }
};

const mainConfig = {
    ...baseConfig,
    entry: `./src/${name}.ts`,
    output: {
        filename: `${name}.js`,
        path: resolve(__dirname, "dist"),
        library: displayName,
        libraryTarget: "umd",
        globalObject: "this",
        umdNamedDefine: true
    }
};

const extensionsConfigs = getFiles(resolve(__dirname, "src"))
    .filter(x => x.includes("extensions"))
    .map(entry => ({
        ...baseConfig,
        entry,
        output: {
            filename: `${basename(entry.substr(0, entry.lastIndexOf(".")))}.js`,
            path: entry.split(sep).slice(0, -1).map(x => x == "src" ? "dist" : x).join(sep),
            globalObject: "this",
        }
    }));

const configs = [
    mainConfig,
    ...extensionsConfigs
];

module.exports = (_, { mode }) => {
    if (mode === "development") {
        configs.forEach(config => config.optimization.minimize = false);
    }

    return configs;
};