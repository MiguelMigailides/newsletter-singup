const express = require("express");
const bodyParser = require("body-parser");

const mailchimp = require("@mailchimp/mailchimp_marketing");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

mailchimp.setConfig({
  apiKey: "3c5c369eb277af73914c1f9ad4fb8d58-us14",
  server: "us14",
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/singup.html");
});

app.post("/", (req, res) => {
  let firstName = req.body.primeiroNome;
  let LastName = req.body.segundoNome;
  let email = req.body.email;

  const addMember = async () => {
    try {
      const data = await mailchimp.lists.addListMember("10977f23be", {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: LastName,
        },
      });
      console.log(data);
      res.sendFile(__dirname + "/sucesso.html");
    } catch (error) {
      res.sendFile(__dirname + "/failute.html");
    }
  };

  addMember();
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Servidor esta rodando na porta 3000");
});

//CHAVE API: 3c5c369eb277af73914c1f9ad4fb8d58-us14
//LIST ID: 10977f23be
