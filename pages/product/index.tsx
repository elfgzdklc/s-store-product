import React, {useEffect, useState} from 'react';
import Head from "@/components/Heads";
import api from "@/utils/api";
import {Badge, Divider, Drawer, IconButton} from "rsuite";
import Image, {ImageLoader} from "next/image";
import Sidebar from "@/components/Sidebar";
import NoData from "@/components/NoData";
import {useRouter} from "next/router";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import {DataLoader} from "@/components/DataLoader";

const ProductPage: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [selectCategories, setSelectCategories] = useState<string[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const router = useRouter();

    const imageLoader: ImageLoader = ({src, width, quality}) => {
        return `${src}?w=${width}&q=${quality || 75}`
    }

    useEffect(() => {
        getProducts()
        getCategories()
    }, []);

    useEffect(() => {
        getProductsByCategories(selectCategories)
    }, [selectCategories])

    const getProducts = async () => {
        try {
            setLoading(true)
            const response = await api.get('/products?limit=30');
            setProducts(response.data);
        } catch (error) {
            console.log(error);
        }
        setLoading(false)
    }
    const getCategories = async () => {
        try {
            const response = await api.get('/products/categories');
            setCategories(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    const handleCategorySelect = (data: any) => {
        setSelectCategories(data)
    }
    const getProductsByCategories = async (categories: string[]) => {
        if (categories.length > 0) {
            setLoading(true)
            const promises = categories.map(category =>
                api.get(`/products/category/${category}`)
            );
            try {
                const results = await Promise.all(promises);
                const combinedResults = results.map(result => result.data).reduce((acc, val) => acc.concat(val), []);
                const combinedResultsSort = combinedResults.sort((a: any, b: any) => a.id - b.id)
                setProducts(combinedResultsSort)
            } catch (error) {
                console.log('Error fetching products:', error);
            }
            setLoading(false)
        } else {
            getProducts()
        }

    };
    const handleClear = () => {
        selectCategories.length > 0 && setSelectCategories([])
        setOpen(false)
    }
    const handleCardClick = (id: number) => {
        router.push(`/product/${id}`);
    };
    return (
        <>
            {loading ? <DataLoader/> : ""}
            <div className="flex">
                <Head title="CompanyP" description="Welcome to the home page of CompanyP"/>
                <div className="h-full overflow-y-auto px-4">
                    {!loading &&
                        <>
                            <div className="flex justify-end p-3">
                                <Badge content={selectCategories.length > 0}>
                                    <IconButton icon={<i className="fa-solid fa-filter"/>} title="Filter"
                                                onClick={() => setOpen(true)} appearance="subtle"/>
                                </Badge>
                            </div>
                            <Divider/>
                        </>
                    }

                    {products ?
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {products.map(({id, title, image, price, category}, index) => (
                                <div key={id}
                                     className="max-w-xs rounded overflow-hidden shadow-lg mb-6 flex flex-col justify-between relative group transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl cursor-pointer"
                                     onClick={() => handleCardClick(id)}
                                >
                                    <div className="flex justify-center h-72 items-center">
                                        <Image loader={imageLoader} loading="eager" width="150" height="100" objectFit="cover" src={image} alt="Product"/>
                                    </div>
                                    <div
                                        className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 text-white text-center py-4 px-3 opacity-0 transition-opacity duration-200 w-full group-hover:opacity-60">
                                        <p className="font-semibold capitalize">{category}</p>
                                    </div>
                                    <div className="px-6 py-4">
                                        <div
                                            className="font-bold mb-2 text-lg text-gray-900"
                                            style={{
                                                display: '-webkit-box',
                                                WebkitBoxOrient: 'vertical',
                                                WebkitLineClamp: 1,
                                                overflow: 'hidden',
                                            }}
                                        >
                                            {title}
                                        </div>
                                        <p className="text-gray-700 text-base">${price}</p>
                                    </div>
                                </div>
                            ))
                            }
                        </div> :
                        <NoData/>
                    }
                </div>
                <Drawer size={"xs"} open={open} onClose={() => setOpen(false)}>
                    <Drawer.Header>
                        <Drawer.Title>Filtrele</Drawer.Title>
                        <Drawer.Actions className="mr-4">
                            <Badge content={selectCategories.length > 0 && selectCategories.length}>
                                <IconButton icon={<i className="fa-solid fa-rotate-left"/>} title="Clear" onClick={handleClear}/>
                            </Badge>
                        </Drawer.Actions>
                    </Drawer.Header>
                    <Drawer.Body>
                        <Sidebar categories={categories} onCategoryChange={handleCategorySelect} selectedDefaultValue={selectCategories}/>
                    </Drawer.Body>
                </Drawer>
                <ScrollToTopButton/>
            </div>
        </>

    );
};

export default ProductPage;