import React from 'react';
import Navbar from "@/components/Navbar";
import Image from "next/image";

const Header: React.FC = () => {
    return (
        <header className="flex justify-center items-center py-4">
            <div className="max-w-screen-2xl w-full flex justify-between items-center">
                <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex justify-center items-center mr-4">
                        <Image src="/assets/favicon.png" width="150" height="100" alt="Logo" className="w-8 h-8" />
                    </div>
                    <h1 className="text-xl font-bold">CompanyP</h1>
                </div>
                <div>
                    <i className="fa-solid fa-location-dot mr-2"/>
                    <i className="fa-solid fa-bell"/>
                </div>

            </div>
        </header>
    );
};

export default Header;
