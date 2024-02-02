import React, {useEffect, useState} from 'react';
import Heading from "@/components/heading.tsx";
import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import axios from "axios";
import API_BASE_URL from "@/constant.ts";
import Table from "@/components/ui/table.tsx";
import Api from "@/components/Api.tsx";

const Categories: React.FC = () => {
    const tableHeaders = ['Name', 'Billboard', 'Date'];
    const [tableData, setTableData] = useState<any[]>([]);

    useEffect(() => {
        const getCategories = async () => {
            try{
                const categories = await axios.get(`${API_BASE_URL}/api/v1/categories`)
                setTableData(categories.data.data)
            }catch (error){
                console.log(error)
            }
        };
        getCategories();
    }, []);
    return (
        <div className="container">
            <div className="flex justify-between items-center mt-4 pb-4 border-b">
                <Heading
                    title="Categories"
                    subtitle="Manage Categories for your store"
                />
                <div>
                    <Link to="/categories/create">
                        <Button>Add New</Button>
                    </Link>
                </div>
            </div>
            <div className="my-4 w-96">
                <Input placeholder="Search"/>
            </div>
            <Table
                headers={tableHeaders}
                data={tableData}
            />
            <Api
                category={"Categories"}
                get={`${API_BASE_URL}/api/v1/categories`}
                post={`${API_BASE_URL}/api/v1/categories/create`}
                put={`${API_BASE_URL}/api/v1/categories/{id}/update`}
                remove={`${API_BASE_URL}/api/v1/categories/{id}/delete`}
            />
        </div>
    );
};

export default Categories;