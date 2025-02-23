const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

the
const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(
  'mongodb+srv://deyvoalerts:9TVJl62BkfF1LkFS@deyvo.zxin9.mongodb.net/store?retryWrites=true&w=majority&appName=DEYVO',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define Schema
const KeySchema = new mongoose.Schema({
  key: { type: String, required: true }
});

const KeyModel = mongoose.model('Key', KeySchema);

// Store key route
app.post('/store', async (req, res) => {
  try {
    const { key } = req.body;
    if (!key) {
      return res.status(400).json({ error: 'Key is required' });
    }

    const newKey = new KeyModel({ key });
    await newKey.save();
    res.status(201).json({ message: 'Key stored successfully', data: newKey });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
