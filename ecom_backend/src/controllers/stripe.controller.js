import stripe from "stripe";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

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
                    quantity: 1
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

export { payment };
