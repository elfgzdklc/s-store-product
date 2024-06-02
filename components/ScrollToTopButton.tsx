import React, {useState, useEffect} from 'react';
import {IconButton} from 'rsuite';

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);
    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };


    return (
        <div className="fixed bottom-4 right-1 md:right-6">
            {isVisible && (
                <IconButton size="lg" circle className="text-cyan-700" appearance="primary" onClick={scrollToTop}
                            icon={<i className="fa-solid fa-chevron-up"/>}>
                </IconButton>
            )}
        </div>
    );

};

export default ScrollToTopButton;
