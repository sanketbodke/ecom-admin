import React, {useEffect, useState} from "react";
import Heading from "@/components/heading.tsx";
import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import axios from "axios";
import API_BASE_URL from "@/constant.ts";
import Table from "@/components/ui/table.tsx";
import Api from "@/components/Api.tsx";

const Colors: React.FC = () => {
    const tableHeaders = ['Name', 'Value', 'Date'];
    const [tableData, setTableData] = useState<any[]>([]);

    useEffect(() => {
        const getSizes = async () => {
            try{
                const colors = await axios.get(`${API_BASE_URL}/api/v1/colors`)
                setTableData(colors.data.data)
                console.log(colors.data.data)
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
                    title="Colors"
                    subtitle="Manage Colors for your store"
                />
                <div>
                    <Link to="/color/create">
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
                category={"Sizes"}
                get={`${API_BASE_URL}/api/v1/color`}
                post={`${API_BASE_URL}/api/v1/color/create`}
                put={`${API_BASE_URL}/api/v1/color/{id}/update`}
                remove={`${API_BASE_URL}/api/v1/color/{id}/delete`}
            />
        </div>
    )
}

export default Colors;