import React from 'react';
import { HiDotsHorizontal } from 'react-icons/hi';
import { Menu, Dropdown, Modal } from 'antd';
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
interface TableProps {
    headers: string[];
    data: Record<string, object>[];
}

const Table: React.FC<TableProps> = ({ headers, data }) => {
    const handleUpdate = (record) => {
        console.log('Update clicked for:', record);
    };

    const handleDelete = (record) => {
        Modal.confirm({
            title: 'Confirm Delete',
            icon: <ExclamationCircleOutlined />,
            content: 'Are you sure you want to delete this record?',
            onOk() {
                console.log('Delete confirmed for:', record);
            },
            onCancel() {
                console.log('Delete canceled');
            },
        });
    };

    const menu = (record) => (
        <Menu>
            <Menu.Item key="update" onClick={() => handleUpdate(record)} icon={<EditOutlined />}>
                <span className="text-sm">Update</span>
            </Menu.Item>
            <Menu.Item key="delete" onClick={() => handleDelete(record)} icon={<DeleteOutlined />}>
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
                    {Object.values(row).map((cell, cellIndex) => (
                        <td key={cellIndex} className="p-2 text-sm">
                            {cell}
                        </td>
                    ))}
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
