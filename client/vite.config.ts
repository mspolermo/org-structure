import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
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
            { find: '@', replacement: '/src'},
        ],
    },
    define: {
        __API_ORGUNIT__: JSON.stringify('http://localhost:5001/org-unit/'),
        __API_NAV__: JSON.stringify('http://localhost:5001/org-unit/getNav/'),
        __API_PERSON_DETAILS__: JSON.stringify('http://localhost:5001/persons/detales/'),
        __API_PERSON__: JSON.stringify('http://localhost:5001/persons/'),
        __API_PERSON_WITH_DETALES_UPDATE__: JSON.stringify('http://localhost:5001/persons/update-all/'),
        __API_PERSON_SEARCH__: JSON.stringify('http://localhost:5001/persons/search'),
        __API_LOGIN__: JSON.stringify('http://localhost:5001/auth/login'),
        __API_REGISTRATION__: JSON.stringify('http://localhost:5001/auth/registration'),
        __API_FAVORITES__: JSON.stringify('http://localhost:5001/favorites'),
        __API_ROLES__: JSON.stringify('http://localhost:5001/roles/'),
        __API_USERS__: JSON.stringify('http://localhost:5001/users/'),
        __API_NOTIFICATIONS__: JSON.stringify('http://localhost:5001/notifications'),
    },
})
