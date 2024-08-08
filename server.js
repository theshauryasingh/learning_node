const http = require('http');
const fs = require('fs');
const url = require('url');

/*
const requestHandler = (req, res)=>{
    console.log("New Req Received");
    // console.log(req);
    const log = `${Date.now()} : New Req Received\n`;
    fs.appendFile('log.txt', log, (err, data)=>{
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Hello, Node.js!');
    })
}

const serverListener = (port) => {console.log(`Server is running on http://localhost:${port}`)};
*/
function requestHandler(req, res) {
    const myUrl = url.parse(req.url, true)
    console.log("New Req Received ");
    const log = `${Date.now()} : ${myUrl.pathname} New Req Received\n`;
    fs.appendFile('log.txt', log, (err, data) => {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        switch (myUrl.pathname) {
          case "/" :
            res.end("HomePage");
            break;
          case "/about":
            const username = myUrl.query.myname;
            res.end(`hi, ${username}`);
            break
          case "/signup":
            if (res.method === "GET"){
              res.end("This is a Signup Form");
            }
            else if (res.method === "POST") {
              res.end("successfully submitted")
            }
            break
          default:
            res.end("404 Not Found")
        }
    });
}

function serverListener(port) {
    console.log(`Server is running on http://localhost:${port}`);
}

const port = 3000;

const server = http.createServer(requestHandler);

server.listen(port, serverListener(port));
