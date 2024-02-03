import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import Table from '@/components/ui/table.tsx';
import axios from 'axios';
import API_BASE_URL from "@/constant.ts";
import Api from "@/components/Api.tsx"
import Heading from "@/components/heading.tsx";

const formatDate = (dateString: string): string => {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
};

const BillBoard: React.FC = () => {
    const tableHeaders = ['Label', 'Date'];
    const [tableData, setTableData] = useState<any[]>([]);

    useEffect(() => {
        const getBillBoards = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/v1/billBoard`);
                const fetchedTableData = response.data.data.map(item => ({
                    id: item._id,
                    label: item.label,
                    date: formatDate(item.createdAt),
                }));

                setTableData(fetchedTableData);
            } catch (error) {
                console.log(error);
            }
        };

        getBillBoards();
    }, []);

    return (
        <>
            <div className="container">
                <div className="flex justify-between items-center mt-4 pb-4 border-b">
                    <Heading
                        title="BillBoards"
                        subtitle="Manage Your Bill Boards"
                    />
                    <div>
                        <Link to="/billBoards/create">
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
                    category={"BillBoard"}
                    get={`${API_BASE_URL}/api/v1/billBoards`}
                    post={`${API_BASE_URL}/api/v1/billBoards/create`}
                    put={`${API_BASE_URL}/api/v1/billBoards/{id}/update`}
                    remove={`${API_BASE_URL}/api/v1/billBoards/{id}/delete`}
                />
            </div>
        </>
    );
};

export default BillBoard;
