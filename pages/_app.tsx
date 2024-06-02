import React from 'react';
import { AppProps } from 'next/app';
import Layout from '../components/Layout';
import '@fortawesome/fontawesome-free/css/all.min.css'
import '../styles/global.css';
import 'rsuite/dist/rsuite.min.css';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
};

export default MyApp;