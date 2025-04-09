const express = require('express');
const path = require('path');
const app = express();


const workingHoursMiddleware = (req, res, next) => {
  const now = new Date();
  const day = now.getDay(); 
  const hour = now.getHours(); 

  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next(); 
  } else {
    res.sendFile(path.join(__dirname, 'views', 'closed.html'));
  }
};


app.use(express.static(path.join(__dirname, 'public')));
app.use(workingHoursMiddleware);


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

app.get('/services', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'services.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'contact.html'));
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});