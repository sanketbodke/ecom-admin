import stripe from "stripe";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";

const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
const payment = asyncHandler(async (req, resp) => {
    try {
        const session = await stripeInstance.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: "payment",
            line_items: req.body.items.map(item => {
                return {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: item.name
                        },
                        unit_amount: item.price * 100
                    },
                    quantity: item.quantity
                };
            }),
            success_url: `${process.env.CLIENT_URL}`,
            cancel_url: `${process.env.CLIENT_URL}`
        });
        resp.json({url: session.url});
    } catch (error) {
        throw new ApiError(400, error, "Error");
    }
});

const getAllPayments = asyncHandler(async (req,resp) => {
    try{
        const payments = await stripeInstance.paymentIntents.list();

        if(!payments){
            return new ApiError(400, "Payments not found!")
        }
        return resp.status(200).json(
            new ApiResponse(200, payments, "All Payments")
        )
    }catch (error){
        console.log(error)
        throw new ApiError(400, error, "Error to fetch payments")
    }
})

export {
    payment,
    getAllPayments
};
