import React, { useState } from 'react';
import { Button, Modal, message } from 'antd';
import axios from "axios";
import API_BASE_URL from "../../constant.ts";

interface ModalProps {
    visible: boolean;
    cancel: () => void;
    productDetails: object;
}

const CustomModal: React.FC<ModalProps> = ({
        visible,
        cancel,
        productDetails
    }) => {
    const [confirmLoading, setConfirmLoading] = useState(false);

    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            cancel();
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        cancel();
    };

    const handleAddToCart = async (productId: number) => {
        try {
            const cartItem = {
                productId: productId,
                userId: `65a9318f91a13940fb7f208a` // to do
            };
            await axios.post(
                `${API_BASE_URL}/api/v1/products/add-to-cart`,
                cartItem
            )
            message.success('Product added to cart');
        } catch (error) {
            console.log(error)
            message.error('Failed to add');
        }
    }

    return (
        <>
            <Modal
                title={productDetails.name}
                open={visible}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                footer={null}
            >
                <div className={'flex gap-4'}>
                    <img
                        src={productDetails.productImage}
                        className={'w-[220px] h-[220px] object-cover'}
                    />
                    <div className={"flex flex-col gap-1"}>
                        <p><span className={"font-bold"}>Price:</span> {productDetails?.price}</p>
                        <p><span className={"font-bold"}>Size:</span> {productDetails?.size}</p>
                        <p><span className={"font-bold"}>Color:</span> {productDetails?.color}</p>
                        <Button onClick={() => handleAddToCart(productDetails?._id)}>Add to cart</Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default CustomModal;
