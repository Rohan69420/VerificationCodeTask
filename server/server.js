    const express = require("express");
    const bodyParser = require("body-parser");
    const app = express();
    const cors = require("cors");
    const corsOption = {
    origin: ["http://localhost:5173"],
    };

    app.use(cors(corsOption));
    app.use(bodyParser.json());

    app.post("/verifycode", (req, res) => {
    console.log("POST parameter received are: ", req.body);

    const { array } = req.body;

    // Server validation criteria : bad code if ends with 7 or less than length of 6
    if (!array || !Array.isArray(array) || array.length < 6 || array[5] === "7") {
        return res.status(400).json({ error: "Invalid Code" });
    }

    // Respond with a success message
    res
        .status(200)
        .json({ message: "Code Verified Successfully", receivedArray: array });
    });

    app.get("/test",(req, res) => {
        res.send(' The Server Get is running fine!');
      });

    app.listen(8080, () => {
    console.log("Server started at port 8080");
    });
