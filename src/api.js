const urlBase = "/api/spells";

const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use(
  "/api/spells",
  createProxyMiddleware({
    target: "https://www.dnd5eapi.co",
    changeOrigin: true,
  })
);
app.listen(3000);

// http://localhost:3000/api/foo/bar -> http://www.example.org/api/foo/bar
