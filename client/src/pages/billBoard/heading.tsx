import React from 'react';

const Heading: React.FC = (props) => {
    return (
        <>
            <div>
                <h1 className="text-2xl font-bold">{props.title}</h1>
                <p className="text-sm text-gray-500">{props.subtitle}</p>
            </div>
        </>
    );
};

export default Heading;