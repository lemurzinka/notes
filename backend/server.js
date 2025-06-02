const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/notes', (req, res) => {
    res.json([{ id: 1, title: "First note", content: "test" }]);
});

app.listen(5000, () => console.log("Server started on port 5000"));
