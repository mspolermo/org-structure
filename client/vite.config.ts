import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    const API_BASE_URL = env.API_BASE_URL || 'http://localhost:5001';

    return {
        plugins: [
            svgr({
                svgrOptions: {
                    plugins: [
                        "@svgr/plugin-svgo",
                        "@svgr/plugin-jsx"
                    ],
                    svgoConfig: {
                        floatPrecision: 2,
                        plugins: [
                            {
                                name: 'convertColors',
                                params: {
                                    currentColor: true
                                }
                            }
                        ]
                    }
                },
                include: /\.svg$/,
            }),
            react({
                babel: {
                    parserOpts: {
                        plugins: ['decorators-legacy', 'classProperties']
                    }
                }
            })
        ],
        resolve: {
            alias: [
                { find: '@', replacement: '/src' },
            ],
        },
        define: {
            __API_ORGUNIT__: JSON.stringify(`${API_BASE_URL}/org-unit/`),
            __API_NAV__: JSON.stringify(`${API_BASE_URL}/org-unit/getNav/`),
            __API_PERSON_DETAILS__: JSON.stringify(`${API_BASE_URL}/persons/detales/`),
            __API_PERSON__: JSON.stringify(`${API_BASE_URL}/persons/`),
            __API_PERSON_WITH_DETALES_UPDATE__: JSON.stringify(`${API_BASE_URL}/persons/update-all/`),
            __API_PERSON_SEARCH__: JSON.stringify(`${API_BASE_URL}/persons/search`),
            __API_LOGIN__: JSON.stringify(`${API_BASE_URL}/auth/login`),
            __API_REGISTRATION__: JSON.stringify(`${API_BASE_URL}/auth/registration`),
            __API_FAVORITES__: JSON.stringify(`${API_BASE_URL}/favorites`),
            __API_ROLES__: JSON.stringify(`${API_BASE_URL}/roles/`),
            __API_USERS__: JSON.stringify(`${API_BASE_URL}/users/`),
            __API_NOTIFICATIONS__: JSON.stringify(`${API_BASE_URL}/notifications`),
        },
    };
});
