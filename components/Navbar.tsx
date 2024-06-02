import React, {useState} from 'react';
import {Nav, Navbar, NavProps} from "rsuite";
import {useRouter} from "next/router";

interface NavbarProps extends NavProps {
    active: string;
    onSelect: (eventKey: string) => void;
}

const Header: React.FC = () => {
    const [active, setActive] = useState<string>('home');
    const Navbar: React.FC<NavbarProps> = ({active, onSelect, ...props}) => {
        return (
            <Nav {...props} activeKey={active} onSelect={onSelect} style={{}}>
                <Nav.Item eventKey="home">Home</Nav.Item>
            </Nav>
        );
    };
    const router = useRouter();

    const handleSelect = (eventKey: string) => {
        setActive(eventKey);
        if (eventKey === 'home') {
            router.push('/');
        }
    };

    return (
        <div className="flex justify-center items-center py-4 underline">
            <div className="max-w-screen-2xl w-full  underline">
                <Navbar appearance="subtle" active={active} onSelect={handleSelect}/>
            </div>
        </div>
    );
};

export default Header;
