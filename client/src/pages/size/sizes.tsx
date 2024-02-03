import React, {useEffect, useState} from "react";
import Heading from "@/components/heading.tsx";
import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import axios from "axios";
import API_BASE_URL from "@/constant.ts";
import Table from "@/components/ui/table.tsx";
import Api from "@/components/Api.tsx";

const Sizes: React.FC = () => {
    const tableHeaders = ['Name', 'Value', 'Date'];
    const [tableData, setTableData] = useState<any[]>([]);

    useEffect(() => {
        const getSizes = async () => {
            try{
                const sizes = await axios.get(`${API_BASE_URL}/api/v1/sizes`)
                setTableData(sizes.data.data)
                console.log(sizes.data.data)
            }catch (error){
                console.log(error)
            }
        }
        getSizes()
    }, []);
    return (
        <div className="container">
            <div className="flex justify-between items-center mt-4 pb-4 border-b">
                <Heading
                    title="Sizes"
                    subtitle="Manage Sizes for your store"
                />
                <div>
                    <Link to="/sizes/create">
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
                category={"Sizes"}
                get={`${API_BASE_URL}/api/v1/sizes`}
                post={`${API_BASE_URL}/api/v1/sizes/create`}
                put={`${API_BASE_URL}/api/v1/sizes/{id}/update`}
                remove={`${API_BASE_URL}/api/v1/sizes/{id}/delete`}
            />
        </div>
    )
}

export default Sizes;