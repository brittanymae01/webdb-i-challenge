const express = require("express");

const db = require("./data/dbConfig.js");

const server = express();

server.use(express.json());

server.get("/api/accounts", (req, res) => {
  db("accounts")
    .then(account => {
      return res.json(account);
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({
        errorMessage: "Failed to retreive accounts"
      });
    });
});

server.get("/api/accounts/:id", (req, res) => {
  db("accounts")
    .where("id", req.params.id)
    .then(account => {
      if (account.length) {
        return res.json(account);
      } else {
        return res.status(404).json({
          error: "invalid account id"
        });
      }
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({
        errorMessage: "failed to retreive the account specified"
      });
    });
});

server.post("/api/accounts", (req, res) => {
  db("accounts")
    .insert(req.body)
    .then(post => {
      return res.status(201).json(req.body);
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({
        errorMessage: "error posting to accounts"
      });
    });
});

server.put("/api/accounts/:id", (req, res) => {
  db("accounts")
    .where("id", req.params.id)
    .update(req.body)
    .then(updated => {
      return res.status(200).json(updated);
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({
        errorMessage: "error updating account"
      });
    });
});

server.delete("/api/accounts/:id", (req, res) => {
  db("accounts")
    .where("id", req.params.id)
    .del()
    .then(deleted => {
      return res.status(200).json({
        deleted: deleted,
        url: `api/accounts/${req.params.id}`,
        operation: `DELETE for account with id ${req.params.id}`
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({
        errorMessage: "error deleting account"
      });
    });
});

module.exports = server;
