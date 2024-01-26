import React from 'react';
import { HiDotsHorizontal } from "react-icons/hi";
interface TableProps {
    headers: string[];
    data: Record<string, object>[];
}

const Table: React.FC<TableProps> = ({ headers, data }) => {
    if (!Array.isArray(data)) {
        console.error("Invalid 'data' prop in Table component. Expected an array.");
        return null;
    }

    return (
        <table className="border w-full">
            <thead>
            <tr className="border-b text-gray-500 text-left">
                {headers.map((header, index) => (
                    <th
                        key={index}
                        className="p-2 text-sm"
                    >{header}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {data.map((row, rowIndex) => (
                <tr
                    className="border-b"
                    key={rowIndex}>
                    {Object.values(row).map((cell, cellIndex) => (
                        <td
                            key={cellIndex}
                            className="p-2 text-sm">
                            {cell}
                        </td>
                    ))}
                    <td className="cursor-pointer"><HiDotsHorizontal /></td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default Table;
