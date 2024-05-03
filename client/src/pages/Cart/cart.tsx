import React from 'react';
import {Button} from "../../components/ui/button.tsx";
import Spinner from "../../components/ui/spinner.tsx";
import cartLogic from "./cartLogic.tsx";

const Cart: React.FC = () => {
    const {
        cartProducts,
        subtotal,
        loading,
        handlePayment,
        handleQuantityChange
    } = cartLogic()
    return (
        <div className={"flex justify-between p-4 text-sm"}>
            <div className={"flex flex-col gap-6 basis-[75%]"}>
                {cartProducts.map((product, index) => (
                    <div key={index} className={"flex items-center gap-4 border basis-3/5"}>
                        <img
                            src={product.productImage}
                            alt={"Product img"}
                            className={"w-36 h-32 object-cover bg-center"}
                        />
                        <div>
                            <p>Name : {product.name}</p>
                            <p>Size : {product.size}</p>
                            <p>Color : {product.color}</p>
                            <p>Price: &#8377; {product.price}</p>
                            <div className={'flex items-center gap-1'}>
                                <p>Qty: </p>
                                <select onChange={(e) => handleQuantityChange(e, product._id)}>
                                    {[1, 2, 3, 4, 5].map((number) => (
                                        <option
                                            key={number}
                                            value={number}
                                            selected={number === product.quantity}>
                                            {number}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <p className={"text-green-800 cursor-pointer"}>Delete</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className={"border w-80 h-fit p-2 basis-[23%]"}>
                <p>Subtotal ({cartProducts.length} item{cartProducts.length !== 1 ? 's' : ''}) &#8377;{subtotal}</p>
                {loading ? (
                    <Button
                        className={"mt-4"}
                        onClick={handlePayment}
                    >Proceed to Buy <Spinner /> </Button>
                ): (
                    <Button
                        className={"mt-4"}
                        onClick={handlePayment}
                    >Proceed to Buy </Button>
                )}
            </div>
        </div>
    );
};

export default Cart;
