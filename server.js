const express = require('express');
const bodyParser = require('body-parser');
const Simplify = require("simplify-commerce");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const client = Simplify.getClient({
    publicKey: 'lvpb_Mjg2NjM5ZWQtNTY1OC00ZTM4LTllZDMtMjhkMjEzNDUxMGJl',  // 使用你提供的公钥
    privateKey: 'PLxpUtfOvsUvUEKZGlgOKHhopPfcPzpjYYC7+ZrTFdV5YFFQL0ODSXAOkNtXTToq'  // 使用你提供的私钥
});

// Serve the front-end HTML file
app.use(express.static('public'));

app.post('/process-payment', (req, res) => {
    const simplifyToken = req.body.simplifyToken;

    client.payment.create({
        amount: "1000", // Amount in cents ($10.00)
        token: simplifyToken,
        description: "Payment Description",
        currency: "AUD",
        reference: "7a6ef6be31"
    }, (errData, data) => {
        if (errData) {
            console.error("Error Message: " + errData.data.error.message);
            return res.status(500).send("Payment failed");
        }
        console.log("Payment Status: " + data.paymentStatus);
        return res.status(200).send("Payment successful");
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
