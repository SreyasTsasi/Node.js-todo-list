const http = require("http");
const fs = require("fs");
const url = require("url");

const port = 3000;
const server = http.createServer((req, res) => {
    let path = url.parse(req.url).pathname;

    if (path === "/") {
        fs.readFile("./index.html", "utf-8", (error, data) => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        });
    }

    if (path === "/api" && req.method === "GET") {
        let query = url.parse(req.url, true).query;

        fs.readFile("./data.json", "utf-8", (error, data) => {
            let list = data === "" ? [] : JSON.parse(data);
            list.push(query.todo);

            fs.writeFile("./data.json", JSON.stringify(list), (error) => {
                if (error) {
                    res.write("Error Occurred");
                }
            });
        });

        res.write(`Added todo item: ${query.todo}`);
        res.end();
    }
});

server.listen(port, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Server started on port " + port);
    }
});
