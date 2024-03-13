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
  fs.readFile("./messages.json", (err, data) => {
    if (err) throw err;

    const messages = JSON.parse(data);

    // Rendering messages as a bootstrap table
    let html = `<!DOCTYPE html>
      <html lang="en">
      <head>
        <title>Bootstrap Example</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
        <style>h1{text-align: center}</style>
      </head>
      <body><h1 class="h1">Guestbook</h1><div class="container mt-3"><table class="table table-bordered"><thead><tr><th>Username</th><th>Country</th><th>Message
      </th></tr></thead><tbody>`;

    for (const message of messages) {
      html += `<tr><td>${message.username}</td><td>${message.country}</td><td>${message.message}</td></tr>`;
    }

    html += "</tbody></table></div>";

    res.send(html);
  });
});

//Newmessage path
app.get("/newmessage", (req, res) => {
  res.sendFile(path.join(__dirname, "/newmessage.html"));
});

app.post("/newmessage", (req, res) => {
  const { username, country, message } = req.body;

  if (!username || !country || !message) {
    res.send("Error: All fields are required.");
    return;
  }

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


app.get("/ajaxmessage", (req, res) => {
  res.sendFile(path.join(__dirname, "/AJAX.html"));
});

app.post("/ajaxmessage", (req, res) => {
  const { username, country, message } = req.body;

  if (!username || !country || !message) {
    res.send("Error: All fields are required.");
    return;
  }

  fs.readFile("./messages.json", (err, data) => {
    if (err) {
      console.log("Error reading file:", err);
      return;
    }

    const messages = JSON.parse(data);

    messages.push({ username, country, message });

    let html = `<h1 class="h1">Guestbook</h1><div class="container mt-3"><table class="table table-bordered"><thead><tr><th>Username</th><th>Country</th><th>Message
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


