/* eslint-disable react-refresh/only-export-components */
/**
 * Корневой компонент приложения
*/

import { Suspense } from 'react';

import { MainLayout } from '@/shared/layouts/MainLayout';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { DevPanel } from '@/widgets/DevPanel';
import { PageLoader } from '@/widgets/PageLoader';
import { Sidebar } from '@/widgets/Sidebar';
import { Topbar } from '@/widgets/Topbar';

import { useAppToolbar } from './lib/useAppToolbar';
import { AppRouter } from './providers/router';
import { withTheme } from './providers/ThemeProvider/ui/withTheme';
import './styles/index.scss';

function App () {
    const { theme } = useTheme();
    const toolbar = useAppToolbar();
    
    return (
        <div id='app' className={classNames('app', {}, [theme])}>
            <Suspense fallback={<PageLoader className='suspense'/>}>
                <MainLayout
                    topbar={<Topbar />}
                    content={<AppRouter />}
                    sidebar={<Sidebar/>}
                    toolbar={toolbar}
                    devpanel={<DevPanel />}
                />
            </Suspense>
        </div>
    )
}

export default withTheme(App);
