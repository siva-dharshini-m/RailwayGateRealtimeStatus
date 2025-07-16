const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // <-- Add this line

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // <-- Add this line to allow frontend requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Example gate state and info (in a real app, this would come from a database or hardware)
let gateState = 0; // 0: opened, 1: closed
let lastOpenedTime = new Date().toISOString();
let gateLocation = "tambaram";

app.get('/api/gate', (req, res) => {
    const { action } = req.query; // expects /api/gate?action=open or ?action=close
    if (action === "open") {
        gateState = 0;
        lastOpenedTime = new Date().toISOString();
    } else if (action === "close") {
        gateState = 1;
    }
    res.json({
        gate_state: gateState, // 0: opened, 1: closed
        last_gate_opened_time: lastOpenedTime,
        location: gateLocation
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});