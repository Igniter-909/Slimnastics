import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import User from "../models/user.models.js";

const router = express.Router();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,     // Your test key ID
    key_secret: process.env.RAZORPAY_KEY_SECRET  // Your test key secret
});

// Create order
router.post('/checkout', async (req, res) => {
    try {
        const options = {
            amount: parseInt(req.body.amount),    // amount in smallest currency unit
            currency: req.body.currency || "INR",
            receipt: `receipt_${Date.now()}`
        };

        console.log('Creating order with options:', options); // Debug log

        const order = await razorpay.orders.create(options);
        console.log('Order created:', order); // Debug log

        res.status(200).json({
            success: true,
            key: razorpay.key_id,
            amount: options.amount,
            order,
            currency: options.currency
        });
    } catch (error) {
        console.error('Order creation error:', error); // Debug log
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
});

// Verify payment
router.post('/verify', async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            userId  // Add userId to the request body
        } = req.body;

        // Verify all required parameters are present
        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({
                success: false,
                error: 'Missing required parameters'
            });
        }

        const sign = `${razorpay_order_id}|${razorpay_payment_id}`;
        const expectedSign = crypto
            .createHmac("sha256", razorpay.key_secret)
            .update(sign.toString())
            .digest("hex");

        if (razorpay_signature === expectedSign) {
            // Clear the user's cart after successful payment
            if (userId) {
                await User.findByIdAndUpdate(
                    userId,
                    { $set: { cart: [] } },  // Empty the cart array
                    { new: true }
                );
            }

            return res.status(200).json({ 
                success: true,
                message: "Payment verified successfully and cart cleared"
            });
        } else {
            return res.status(400).json({ 
                success: false,
                message: "Invalid signature" 
            });
        }
    } catch (error) {
        console.error('Verification error:', error); // Debug log
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
});

export default router; 