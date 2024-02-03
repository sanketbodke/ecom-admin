import React, {useState, useEffect} from "react";
import Heading from "@/components/heading.tsx";
import {Link} from "react-router-dom"
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import Table from "@/components/ui/table.tsx";
import Api from "@/components/Api.tsx";
import axios from "axios";
import API_BASE_URL from "@/constant.ts";
const Product: React.FC = () => {
    const tableHeaders = ['Name', 'Featured', 'Price', 'Category', 'Size', 'Color', 'Date']
    const [tableData, setTableData] = useState<any[]>([])

    useEffect(() => {
        const getProducts = async ()=> {
            try{
                const products = await axios.get(`${API_BASE_URL}/api/v1/products`)
                setTableData(products.data.data)
                console.log(products.data.data)
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
                headers={tableHeaders}
                data={tableData}
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