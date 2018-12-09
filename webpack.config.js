const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports =  {
    entry: [
        './src/scripts/app.js',
        './src/styles/styles.scss'
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader', // Use babel to transpile our ES6 into ES5
                    options: {
                        presets: ['env'] // A Babel preset that compiles down to ES5 by automatically determining the necessary polyfills based on browserslist in package.json
                    }
                }
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader', // Fallback to style-loader which injects CSS as <style></style> blocks
                    use: [
                        { loader: 'css-loader' },
                        {
                            loader: 'postcss-loader', // Use postcss-loader to bring in autoprefixer
                            options: {
                                plugins: [
                                    require('autoprefixer') // Automatically prefixes CSS declarations with any vendor specific prefixes
                                ]
                            }
                        },
                        { loader: 'sass-loader' } // Compile our SASS into CSS
                    ]
                })
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['public']), // Wipe out the /public folder every time we build
        new HtmlWebpackPlugin({ template: './src/index.html' }), // Generate index.html that includes injected webpack bundles and CSS <link> tags
        new CopyWebpackPlugin([
            { from: './src/portfolio.config.json' }, // Copy our config file so that we can read it at runtime
            { from: './src/images', to: './images' } // Copy all of our images since we're loading them at runtime (can't be loaded as modules)
        ]),
        new ExtractTextPlugin('styles.css') // Take our CSS output and save it to a file
    ],
    devtool: 'source-map', // Generate source maps for debugging purposes
    devServer: {
        contentBase: '/public',
        stats: 'minimal',
        port: 3000
    }
};