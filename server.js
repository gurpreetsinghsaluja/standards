const express = require('express');
const path  = require('path');
const app = express();
const bodyParser = require('body-parser')
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const fs = require('fs');
var stringData= fs.readFileSync('./static/standards.json');
var jsonData = JSON.parse(stringData);

app.use('/public', express.static(path.join(__dirname, 'static')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'standards.html'));
});
app.get('/upload', (req, res)=> {
    res.json(jsonData);
});

app.get('/mod', (req, res) => {
  res.json(jsonData)
});

app.post('/mod',(req, res) => {
  server_json = jsonData.standards;
  client_json = req.body.standards;

  for (i=0; i< server_json.length; i++) {
      if (server_json[i].term == client_json[0].term){
        server_json[i].description = client_json[0].description;
        server_json[i].difficulty = client_json[0].difficulty;
      }
  }

  })
const listener = app.listen(process.env.PORT || 3000, 
	() => console.log(`Server is running...${listener.address().port}`));