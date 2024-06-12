const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const PORT = 3000;
const PUBLIC_DIR = path.join(__dirname, "public");

const server = http.createServer((req, res) => {
    let filePath = path.join(
        PUBLIC_DIR,
        req.url === "/" ? "index.html" : req.url,
    );

    const extensionName = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
        ".html": "text/html",
        ".js": "application/javascript",
        ".css": "text/css",
        ".json": "application/json",
        ".png": "image/png",
        ".jpg": "image/jpg",
        ".gif": "image/gif",
        ".svg": "image/svg+xml",
        ".wav": "audio/wav",
        ".mp4": "video/mp4",
        ".ttf": "application/font-ttf",
    };

    const contentType = mimeTypes[extensionName] || "application/octet-stream";

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === "ENOENT") {
                fs.readFile(
                    path.join(PUBLIC_DIR, "404.html"),
                    (error, content404) => {
                        res.writeHead(404, { "Content-Type": "text/html" });
                        res.end(content404, "utf-8");
                    },
                );
            } else {
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            res.writeHead(200, { "Content-Type": contentType });
            res.end(content, "utf-8");
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
