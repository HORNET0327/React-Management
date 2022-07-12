const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/customers", (req, res, next) => {
  res.send([
    {
      id: 1,
      image: "https://placeimg.com/64/64/any/1",
      name: "홍길동",
      birthday: "991112",
      gender: "남자",
      job: "nothing",
    },
    {
      id: 2,
      image: "https://placeimg.com/64/64/any/2",
      name: "남",
      birthday: "770707",
      gender: "남자",
      job: "nothing",
    },
    {
      id: 3,
      image: "https://placeimg.com/64/64/any/3",
      name: "박",
      birthday: "880808",
      gender: "남자",
      job: "nothing",
    },
  ]);
});

// app.get("/api/hello", (req, res, next) => {
//   res.send({ message: "HELLO EXPRESS" });
// });

app.listen(port, () => console.log(`listening on port  {${port}}`));
