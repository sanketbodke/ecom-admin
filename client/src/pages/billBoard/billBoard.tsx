import React from 'react';
import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router-dom";
const BillBoard: React.FC = () => {
    return (
        <>
            <div className="container flex justify-between items-center mt-4 pb-4 border-b">
                <div>
                    <h1 className="text-2xl font-bold">BillBoard(5)</h1>
                    <p className="text-sm text-gray-500">Manage billboards for your store</p>
                </div>
                <div>
                    <Link to="/billBoards/create">
                        <Button>Add New</Button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default BillBoard;