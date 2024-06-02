import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Navbar from "@/components/Navbar";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({children}) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header/>
            <Navbar />
            <main className="flex-grow flex justify-center mx-4 lg:mx-auto">
                {children}
            </main>
            <Footer/>
        </div>
    );
};

export default Layout;
