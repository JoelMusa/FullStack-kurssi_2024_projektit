const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Source directory
app.use("/Fullstack-Projekti1/projekti1", express.static("public"));

// Home route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

//Guestbook path
app.get("/guestbook", (req, res) => {
  res.sendFile(path.join(__dirname, "/guestbook.html"));
});

app.post("/guestbook", (req, res) => {

  fs.readFile("./messages.json", (err, data) => {
    if (err) throw err;
    let html;
    const messages = JSON.parse(data);

    for (const message of messages) {
      html += `<tr><td>${message.username}</td><td>${message.country}</td><td>${message.message}</td></tr>`;
    }
    res.send(html)
  });
});

//Newmessage path
app.get("/newmessage", (req, res) => {
  res.sendFile(path.join(__dirname, "/newmessage.html"));
});

app.post("/newmessage", (req, res) => {
  const { username, country, message } = req.body;

  // Read the existing messages from the file
  fs.readFile("./messages.json", (err, data) => {
    if (err) throw err;

    const messages = JSON.parse(data);

    // Add the new message to the array
    messages.push({ username, country, message });

    // Write the updated messages back to the file
    fs.writeFile("./messages.json", JSON.stringify(messages), (err) => {
      if (err) throw err;
    });
    res.redirect('/guestbook')
  });
});

//Ajaxmessage path
app.get("/ajaxmessage", (req, res) => {
  res.sendFile(path.join(__dirname, "/AJAX.html"));
});

app.post("/ajaxmessage", (req, res) => {
  const { username, country, message } = req.body;

  if (!username || !country || !message) {
    res.send(`<div class="alert alert-dark text-center" role="alert">
    Error - All fields required!
  </div>`);
    return;
  }

  fs.readFile("./messages.json", (err, data) => {
    if (err) {
      console.log("Error reading file:", err);
      return;
    }

    const messages = JSON.parse(data);

    messages.push({ username, country, message });

    let html = `<h1 class="pb-2">Guestbook</h1><div class="container mt-3"><table class="table table-bordered"><thead><tr><th>Username</th><th>Country</th><th>Message
      </th></tr></thead><tbody>`;

    for (const message of messages) {
      html += `<tr><td>${message.username}</td><td>${message.country}</td><td>${message.message}</td></tr>`;
    }

    html += "</tbody></table></div>";

    res.send(html);

    fs.writeFile("./messages.json", JSON.stringify(messages), (err) => {
      if (err) {
        console.log("Error writing file:", err);
        return res.sendStatus(500);
      }
    });
  });
});


//Defining port
app.listen(port, function () {
  console.log("Listening port " + port + "!");
});


