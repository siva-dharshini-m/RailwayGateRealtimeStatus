module.exports = function(app) {
    // Example gate state and info (in a real app, this would come from a database or hardware)
    let gateState = 0; // 0: opened, 1: closed
    let lastOpenedTime = new Date().toISOString();
    let gateLocation = "Main Entrance";

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
};