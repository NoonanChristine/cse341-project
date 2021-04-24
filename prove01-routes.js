
const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Greeting Page</title></head>');
        res.write('<body>')
        res.write('<h1>Hello! Welcome to this page!</h1>')
        res.write('<p>First of all, please enter your username:</p>')
        res.write('<form action="/create-user" method="POST"><input type="text" name="username" placeholder="username"><br><br><button type="submit">Send</button></form>')
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }
    if (url === '/users') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Users</title></head>');
        res.write('<body>')
        res.write('<h1>List of Dummy Users:</h1>')
        res.write('<ul><li>User 1</li></ul><ul><li>User 2</li></ul>')
        res.write('<h1>Returning the List of Users: </h1>')
        res.write('<ul><li></li></ul>')
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }
    if (url === '/create-user' && method === 'POST') {
        const body = [];
        req.on('data', chunk => {
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody.split('=')[1]);
            res.setHeader('Location', '/create-user')
            res.setHeader('Content-Type', 'text/html');
            res.write('<html>');
            res.write('<head><title>Users</title></head>');
            res.write('<body>')
            res.write('<h1>List of Users: </h1>')
            res.write('<ul>')
            res.write('<li>')
            res.write(parsedBody.split('=')[1]);
            res.write('</li></ul>')
            res.write('</body>');
            res.write('</html>');
            return res.end();
        });
    }
};

exports.handler = requestHandler;