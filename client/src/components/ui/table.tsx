import React from 'react';
import { HiDotsHorizontal } from 'react-icons/hi';
import { Menu, Dropdown, Modal } from 'antd';
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import {Link} from "react-router-dom";
import API_BASE_URL from "@/constant.ts";
import axios from "axios"
interface TableProps {
    headers: string[];
    data: Record<string, object>[];
    objectKey: string[];
}

const Table: React.FC<TableProps> = ({ headers, data, objectKey }) => {
    const handleUpdate = (record: number) => {
        console.log('Update clicked for:', record);
    };

    const handleDelete = (id: number) => {
        Modal.confirm({
            title: 'Confirm Delete',
            icon: <ExclamationCircleOutlined />,
            content: 'Are you sure you want to delete this record?',
            onOk() {
                axios.delete(`${API_BASE_URL}/api/v1/billBoard/${id}/delete`)
            },
            onCancel() {
                console.log('Delete canceled');
            },
        });
    };

    const menu = (record: object) => (
        <Menu>
            <Menu.Item key="update" onClick={() => handleUpdate(record.id)} icon={<EditOutlined />}>
                <Link to={`/billBoards/${record.id}/update`}>Update</Link>
            </Menu.Item>
            <Menu.Item key="delete" onClick={() => handleDelete(record.id)} icon={<DeleteOutlined />}>
                <span className="text-sm">Delete</span>
            </Menu.Item>
        </Menu>
    );

    if (!Array.isArray(data)) {
        console.error("Invalid 'data' prop in Table component. Expected an array.");
        return null;
    }

    return (
        <table className="border w-full">
            <thead>
            <tr className="border-b text-gray-500 text-left">
                {headers.map((header, index) => (
                    <th key={index} className="p-2 text-sm">
                        {header}
                    </th>
                ))}
            </tr>
            </thead>
            <tbody>
            {data.map((row, rowIndex) => (
                <tr className="border-b" key={rowIndex}>
                    {objectKey.map((value, key) => (
                        <td key={key} className="p-2 text-sm">
                            {row[value]}
                        </td>
                    ))}
                    <td className="p-2 text-sm">{row.date}</td>
                    <td className="cursor-pointer">
                        <Dropdown overlay={() => menu(row)} trigger={['click']}>
                            <HiDotsHorizontal />
                        </Dropdown>
                    </td>
                </tr>
            ))}


            </tbody>
        </table>
    );
};

export default Table;
