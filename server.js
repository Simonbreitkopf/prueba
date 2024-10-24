const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/womenListDB', { useNewUrlParser: true, useUnifiedTopology: true });

const womanSchema = new mongoose.Schema({
    name: String
});

const Woman = mongoose.model('Woman', womanSchema);

app.get('/women', async (req, res) => {
    const women = await Woman.find();
    res.json(women);
});

app.post('/women', async (req, res) => {
    const newWoman = new Woman({ name: req.body.name });
    await newWoman.save();
    res.json(newWoman);
});

app.delete('/women/:id', async (req, res) => {
    await Woman.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});