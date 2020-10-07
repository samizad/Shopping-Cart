let cart = [];

class Product {
  //receive data from products.json

  async getProducts() {
    try {
      const result = await fetch("products.json");
      const data = await result.json();
      return data;
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }
}
class View {
  // show received data in DOM
}
class Storage {
  // manage save received data
}
//create objects after loading
document.addEventListener("DOMContentLoaded", () => {
  //when document loaded this object will be created here
  const view = new View();
  const product = new Product();

  product.getProducts().then((data) => console.log(data));
});
