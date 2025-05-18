import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());

let products = []; //replace  with  database

app.get("/products", (req, res) => {
  res.status(200).send({ message: "Product Found", products });
});

app.post("/product", (req, res) => {
  const reqBody = req.body;
  if (!reqBody?.name || !reqBody?.price || !reqBody?.description) {
    res.status(400).send({ message: "Please provide all the required fields" });
    return;
  }
  let product = {
    id: new Date().getTime(),
    name: reqBody.name,
    description: reqBody.description,
    price: reqBody.price,
  };
  products.push(product);
  res.status(201).send({ message: "Product Added successfully" });
});

app.delete("/delete-product/:id", (req, res) => {
  const productId = req.params.id;
  let isMatched = false;
  for (let i = 0; i < products.length; i++) {
    if (products[i].id == productId) {
      isMatched = true;
      products.splice(i, 1);

      return;
    }
  }
  if (isMatched) {
    res.status(202).send({ message: "Product Deleted" });
    // res.send("Product Deleted successfully");
  } else {
    res
      .status(400)
      .send({ message: `product id (${productId}) did not matched` });
    // res.send(`product id (${productId}) not found`);
  }
});

app.put("/product/:id", (req, res) => {
  let reqBody = req.body;
  // let productId = Number(req.params.id);
  let productId = req.params.id;
  if (!reqBody?.name || !reqBody?.price || !reqBody?.description) {
    res.send("Please provide all the required fields");
    return;
  }

  let isMatched = false;

  for (let i = 0; i < products.length; i++) {
    if (products[i].id == productId) {
      isMatched = true;

      products[i] = {
        id: productId,
        name: reqBody.name,
        price: reqBody.price,
        description: reqBody.description,
      };
      break;
    }
  }
  if (isMatched) {
    res.send("product updated");
  } else {
    res.send({ message: `product id (${productId}) did not matched ` });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port now ,${PORT}`);
  console.log(`Server is running on http://localhost:${PORT}`);
});
