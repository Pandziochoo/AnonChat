const express = require("express");
const app = express();
const path = require("path");

const PORT = process.env.PORT || 3001;

// Serwowanie plików statycznych (frontend)
app.use(express.static(path.join(__dirname)));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const WebSocket = require("ws");

const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
    console.log("Nowe połączenie WebSocket");

    ws.on("message", (message) => {
        console.log(`Odebrano: ${message}`);

        // Wysyłanie wiadomości do wszystkich klientów
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
});
