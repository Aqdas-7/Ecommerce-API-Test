const request = require("supertest");

const baseURL = "https://fakestoreapi.com";

describe("FakeStoreAPI Tests", () => {
  let productId;
  let authToken;

  test("POST /auth/login → should return a token", async () => {
    const response = await request(baseURL)
      .post("/auth/login")
      .send({ username: "mor_2314", password: "83r5^_" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");

    authToken = response.body.token;
  });

  test("GET /products → should return a list of products", async () => {
    const response = await request(baseURL).get("/products");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("POST /products → should create a new product", async () => {
    const newProduct = {
      title: "Dynamic Product",
      price: 15.99,
      description: "A test product",
      image: "http://example.com/product.jpg",
      category: "electronics",
    };

    const response = await request(baseURL).post("/products").send(newProduct);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");

    productId = response.body.id;
  });

  test("GET /products/:id → should return one product", async () => {
    // Use a known existing product ID from the API
    const existingProductId = 1;
    const response = await request(baseURL).get(`/products/${existingProductId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", existingProductId);
  });

  test("PUT /products/:id → should update a product", async () => {
    const updatedProduct = {
      title: "Updated Dynamic Product",
      price: 25.99,
      description: "Updated description",
      image: "http://example.com/updated.jpg",
      category: "home",
    };

    const response = await request(baseURL)
      .put(`/products/${productId}`)
      .send(updatedProduct);

    expect(response.status).toBe(200);
  });

  test("DELETE /products/:id → should delete a product", async () => {
    const response = await request(baseURL).delete(`/products/${productId}`);
    expect(response.status).toBe(200);
  });
});