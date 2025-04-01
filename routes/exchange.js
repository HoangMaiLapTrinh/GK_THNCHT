const express = require('express')
const router = express.Router()

// Tỉ giá ngoại tệ
const exchangeRates = {
    "USD": {"VND": 24000, "EUR": 0.91, "JPY": 150},
    "VND": {"USD": 0.000042, "EUR": 0.000038, "JPY": 0.0067},
    "EUR": {"USD": 1.10, "VND": 26000, "JPY": 165},
    "JPY": {"USD": 0.0067, "VND": 150, "EUR": 0.0061}
}

// API get chuyển đổi tỉ giá ngoại tệ
router.get('/convert', (req, res) => {
    let { from, to, amount } = req.query

    if(!from || !to || !amount) {
        return res.status(400).json({ error: 'Thiếu thông tin hoặc số tiền không hợp lệ' })
    }
    
    from = from.toUpperCase()
    to = to.toUpperCase()
    amount = parseFloat(amount)

    if(!exchangeRates[from] || !exchangeRates[to]) {
        return res.status(400).json({ error: 'Không hỗ trợ loại tiền này' })
    }

    const convertedAmount = amount * exchangeRates[from][to]

    res.json({
        from,
        to,
        amount,
        convertedAmount,
        rate: exchangeRates[from][to]
    });
});

module.exports = router