import React from 'react';
import NextHead from 'next/head';

interface HeadProps {
    title?: string;
    description?: string;
}

const Head: React.FC<HeadProps> = ({ title = 'Default Title', description = 'Default Description' }) => {
    return (
        <NextHead>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </NextHead>
    );
};

export default Head;
