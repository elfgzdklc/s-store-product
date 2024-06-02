import React, {useEffect, useState} from "react";
import api from "@/utils/api";
import {GetServerSidePropsContext} from "next";
import Image, {ImageLoader} from "next/image";
import Head from "@/components/Heads";
import {DataLoader} from "@/components/DataLoader";

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}

interface ProductDetailProps {
    id: string;
}

const ProductDetail: React.FC<ProductDetailProps> = ({id}) => {
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    const imageLoader: ImageLoader = ({src, width, quality}) => {
        return `${src}?w=${width}&q=${quality || 75}`
    }
    useEffect(() => {
        getProductDetail()
    }, [])
    const getProductDetail = async () => {
        try {
            setLoading(true)
            const response = await api.get(`/products/${id}`);
            setProduct(response.data);
        } catch (error) {
            console.error(error);
        }
        setLoading(false)
    }
    const StarIcon: React.FC<{ filled: boolean }> = ({filled}) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 ${filled ? 'text-yellow-500' : 'text-gray-400'}`}
            viewBox="0 0 20 20"
            fill="currentColor"
        >
            <path
                fillRule="evenodd"
                d="M10 2l2.54 5.18 5.66.82-4.09 3.97.97 5.66L10 15.4l-5.09 2.64.97-5.66-4.09-3.97 5.66-.82L10 2z"
                clipRule="evenodd"
            />
        </svg>
    );
    const renderStars = () => {
        const stars = [];
        const maxStars = 5;
        const filledStars = product ? Math.round(product.rating.rate) : 0;
        for (let i = 0; i < maxStars; i++) {
            stars.push(
                <StarIcon key={i} filled={i < filledStars}/>
            );
        }
        return stars;
    };

    return (
        <>
            {loading ? <DataLoader/> : ""}
            <Head title={product?.title} description="Product detail page"/>
            <div className="flex flex-col md:flex-row justify-center items-center">
                {product &&
                    <>
                        <div className="w-2/3 md:max-w-xs flex flex-col justify-center items-center p-4 mr-10">
                            <Image loader={imageLoader} src={product.image} width="150" height="100" alt={product.title} className="w-full"/>
                        </div>
                        <div className="max-w-xl flex flex-col justify-center items-center p-4">
                            <div className="flex items-center mb-2 md:mb-4">
                                <div className="flex mr-2">
                                    {renderStars()}
                                </div>
                                <span className="text-lg font-bold">{product.rating.rate}</span>
                            </div>
                            <h1 className="text-lg md:text-2xl font-bold">{product.title}</h1>
                            <p className="text-base md:text-lg mt-2">{product.description}</p>
                        </div>
                    </>
                }
            </div>
        </>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    return {
        props: {
            id: context.query.id && context.query.id.toString(),
        },
    };
}

export default ProductDetail

