import { User } from "../models/User.js"
import errorHandler from "../utils/errorHandler.js";
import Stripe from "stripe";

const stripe = new Stripe("sk_test_51LvmGOSFm2R1ZC3VHz3HRr6RcHUt7JZ5KVF2S8UfJVnAePSemwfFRmTzl9Z71fR53fTWingNwVIesgUsBUZpbUDa00QCK1O7IE");

export const buySubscription = async(req,res,next) => {
    const user = await User.findById(req.user._id);
    
    if(user.role==="admin")
    return next(new errorHandler("Admin can't buy subscription",400))

    if (!user.stripeCustomerId || !user.defaultPaymentMethod) {
        return next(new errorHandler("Please add a payment method before purchasing a subscription", 400));
      }

      // Create subscription
      const subscription = await stripe.subscriptions.create({
        customer: 'cus_Q55VquMoSLAl7b', // Replace with the Stripe Customer ID of the user
        items: [{ 
            price: 'price_1PEvFbSFm2R1ZC3VsIKJXsyy',
            quantity: 1
        }],
        default_payment_method: user.defaultPaymentMethod,
    });

  
console.log(subscription);
    user.subscription.id = subscription.id;
    user.subscription.status = subscription.status;

    await user.save();

    res.status(201).json({
        success: true,
        message: "Subscription purchased successfully",
        subscriptionId: subscription.id,
    });

}