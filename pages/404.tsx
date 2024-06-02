import Link from 'next/link';
import Image from "next/image";
import {Button} from "rsuite";

const NotFoundPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center ">
                <div className="flex flex-col md:flex-row items-center mb-4">
                    <Image src="/assets/404.png" alt="404" width="700" height="500"/>
                    <div className="mt-4 md:ml-8 md:mt-0 text-center md:text-left">
                        <h3 className="font-bold mb-4">Page Not Found</h3>
                        <p className="text-lg mb-4">The page you are looking for does not exist.</p>
                        <Link href="/" passHref>
                            <Button appearance="ghost" color="cyan" className="w-full mt-4">
                                Home
                            </Button>
                        </Link>
                    </div>
                </div>
        </div>
    );
};

export default NotFoundPage;
