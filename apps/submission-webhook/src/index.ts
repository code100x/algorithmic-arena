import express from "express";

const app = express();
app.use(express.json());

app.put("/submission-callback", (req, res) => {
    console.log(req.body);
    res.send("Received");
});

app.listen(process.env.PORT || 3000);