const User = require('../models/user');

const handleUserRoutes = async (req, res, parsedUrl) => {
    const path = parsedUrl.pathname;
    const method = req.method;
    const id = path.split('/')[2];

    res.setHeader('Content-Type', 'application/json');

    if (path === '/users' && method === 'GET') {
        try {
            const users = await User.find();
            res.writeHead(200);
            res.end(JSON.stringify(users));
        } catch (error) {
            res.writeHead(500);
            res.end(JSON.stringify({ message: 'Internal server error' }));
        }
    } else if (path.startsWith('/users/') && method === 'GET') {
        try {
            const user = await User.findById(id);
            if (!user) {
                res.writeHead(404);
                return res.end(JSON.stringify({ message: 'User not found' }));
            }
            res.writeHead(200);
            res.end(JSON.stringify(user));
        } catch (error) {
            res.writeHead(500);
            res.end(JSON.stringify({ message: 'Internal server error' }));
        }
    } else if (path === '/users' && method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            try {
                const { name, email, password } = JSON.parse(body);
                const newUser = new User({ name, email, password });
                await newUser.save();
                res.writeHead(201);
                res.end(JSON.stringify(newUser));
            } catch (error) {
                res.writeHead(500);
                res.end(JSON.stringify({ message: 'Internal server error' }));
            }
        });
    } else if (path.startsWith('/users/') && method === 'PUT') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            try {
                const { name, email, password } = JSON.parse(body);
                const updatedUser = await User.findByIdAndUpdate(id, { name, email, password }, { new: true });
                if (!updatedUser) {
                    res.writeHead(404);
                    return res.end(JSON.stringify({ message: 'User not found' }));
                }
                res.writeHead(200);
                res.end(JSON.stringify(updatedUser));
            } catch (error) {
                res.writeHead(500);
                res.end(JSON.stringify({ message: 'Internal server error' }));
            }
        });
    } else if (path.startsWith('/users/') && method === 'DELETE') {
        try {
            const deletedUser = await User.findByIdAndDelete(id);
            if (!deletedUser) {
                res.writeHead(404);
                return res.end(JSON.stringify({ message: 'User not found' }));
            }
            res.writeHead(200);
            res.end(JSON.stringify(deletedUser));
        } catch (error) {
            res.writeHead(500);
            res.end(JSON.stringify({ message: 'Internal server error' }));
        }
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ message: 'Not Found' }));
    }
};

module.exports = handleUserRoutes;