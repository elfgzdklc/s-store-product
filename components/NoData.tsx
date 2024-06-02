import Link from 'next/link';
import Image from "next/image";
import {Button} from "rsuite";

const NoDataPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center pt-24">
            <div className="flex flex-row items-center mb-4">
                <div className="ml-4">
                    <h3 className="font-bold mb-4">Data Not Found</h3>
                    <p className="text-lg mb-4">There is currently no data to show here.</p>
                </div>
                <Image className="img-fluid" src="/assets/no-data.png" alt="no-data" width="300" height="500" />
            </div>
        </div>
    );
};

export default NoDataPage;
