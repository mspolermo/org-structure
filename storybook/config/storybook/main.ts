import { Configuration, DefinePlugin } from 'webpack';
import path from 'path';
import { buildCssLoader } from '../build/loaders/buildCssLoader';

export default {
    stories: ['../../../client/src/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: [
        '@storybook/addon-links',
        //'@storybook/addon-essentials', // крашит сторибук
        '@storybook/addon-interactions'
    ],
    framework: '@storybook/react',
    core: {
        builder: 'webpack5',
        cache: {
            directory: '../cache/'
        }
    },
    webpackFinal: async (config: Configuration) => {
        if (config == undefined) return {}
        if (config.module == undefined) return {}
        if (config.module.rules == undefined) return {}
        if (config.resolve == undefined) return {}
        if (config.resolve.modules == undefined) return {}
        if (config.resolve.extensions == undefined) return {}

        const paths = {
            src: path.resolve(__dirname, '..', '..', '..', 'client', 'src'), // исправлено
        };
        config.resolve.modules.push(paths.src);
        config.resolve.extensions.push('.ts', '.tsx');
        config.resolve.alias = {
            ...config.resolve.alias,
            '@': paths.src,
        };

        // config.module.rules = config.module.rules.map((rule) => {
        //     if (/svg/.test(rule.test as string)) {
        //         return { ...rule, exclude: /\.svg$/i };
        //     }
        //     return rule;
        // });

        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });
        config.module.rules.push(buildCssLoader(true));

        // Return the altered config
        return config;
    },
};

