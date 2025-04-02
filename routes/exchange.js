const exchangeRates = {
    "USD": { "VND": 24000, "EUR": 0.91, "JPY": 150 },
    "VND": { "USD": 0.000042, "EUR": 0.000038, "JPY": 0.0067 },
    "EUR": { "USD": 1.10, "VND": 26000, "JPY": 165 },
    "JPY": { "USD": 0.0067, "VND": 150, "EUR": 0.0061 }
};

const handleExchangeRoutes = (req, res, parsedUrl) => {
    const path = parsedUrl.pathname;

    if (path === '/convert' && req.method === 'GET') {
        const { from, to, amount } = parsedUrl.query;

        if (!from || !to || !amount || isNaN(amount)) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'Thiếu thông tin hoặc số tiền không hợp lệ' }));
        }

        const fromCurrency = from.toUpperCase();
        const toCurrency = to.toUpperCase();
        const amountFloat = parseFloat(amount);

        if (!exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'Không hỗ trợ loại tiền này' }));
        }

        const convertedAmount = amountFloat * exchangeRates[fromCurrency][toCurrency];

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            from: fromCurrency,
            to: toCurrency,
            amount: amountFloat,
            convertedAmount,
            rate: exchangeRates[fromCurrency][toCurrency]
        }));
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
};

module.exports = handleExchangeRoutes;