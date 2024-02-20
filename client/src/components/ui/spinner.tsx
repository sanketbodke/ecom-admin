import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const Spinner: React.FC = () => <Spin indicator={<LoadingOutlined style={{ fontSize: 20 }} className={"text-white ml-2"} spin />} />;

export default Spinner;