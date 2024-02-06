import React, {useState, useEffect} from "react";
import Heading from "@/components/heading.tsx";
import {Link} from "react-router-dom"
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import Table from "@/components/ui/table.tsx";
import Api from "@/components/Api.tsx";
import axios from "axios";
import API_BASE_URL from "@/constant.ts";
import formatDate from "@/utils/dateFormatter.tsx";
const Product: React.FC = () => {
    const tableHeaders = ['Name', 'Featured', 'Price', 'Category', 'Size', 'Color', 'Date']
    const objectKey = ['name', 'featured', 'price', 'category', 'size', 'color']
    const [tableData, setTableData] = useState<any[]>([])

    useEffect(() => {
        const getProducts = async ()=> {
            try{
                const products = await axios.get(`${API_BASE_URL}/api/v1/products`)
                const fetchedTableData = products.data.data.map(item => ({
                    id: item._id,
                    name: item.name,
                    featured: item.featured ? 'true' : 'false',
                    price: item.price,
                    category: item.category,
                    size: item.size,
                    color: item.color,
                    date: formatDate(item.createdAt)
                }))
                setTableData(fetchedTableData)
            }catch (error){
                console.log(error)
            }
        }
        getProducts()
    }, []);
    return (
        <div className="container">
            <div className="flex justify-between items-center mt-4 pb-4 border-b">
                <Heading
                    title="Products"
                    subtitle="Manage Products for your Store"
                />
                <div>
                    <Link to="/product/create">
                        <Button>Add New</Button>
                    </Link>
                </div>
            </div>
            <div className="my-4 w-96">
                <Input placeholder="Search" />
            </div>
            <Table
                type="products"
                headers={tableHeaders}
                data={tableData}
                objectKey={objectKey}
            />
            <Api
                category={"Products"}
                get={`${API_BASE_URL}/api/v1/products`}
                post={`${API_BASE_URL}/api/v1/product/create`}
                put={`${API_BASE_URL}/api/v1/product/{id}/update`}
                remove={`${API_BASE_URL}/api/v1/product/{id}/delete`}
            />
        </div>
    );
};

export default Product;