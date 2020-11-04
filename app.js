let cart = [];
const productDOM = document.querySelector(".products-center");

class Product {
  //receive data from products.json

  async getProducts() {
    try {
      const result = await fetch("products.json");
      const data = await result.json();
      let products = data.items;
      products = products.map((item) => {
        const { title, price } = item.fields;
        const { id } = item.sys;
        const image = item.fields.image.fields.file.url;
        return { title, price, id, image };
      });

      return products;
    } catch (err) {
      console.log(err);
    }
  }
}
class View {
  displayProducts(products) {
    let result = "";
    products.forEach((item) => {
      result += `
    <article class="product">
    <div class="img-container">
      <img
       src=${item.image}
       alt=${item.title}
       class="product-img"
        />
      <button class="bag-btn" data-id=${item.id}>افزودن به سبد خرید</button>
    </div>
    <h3 >${item.title}</h3>
    <h4> ${item.price}</h4>
  </article>
    `;
    });
    productDOM.innerHTML = result;
  }
  //identify products base on id
  //for select buttons
  // document.querySelectorAll(".bag-btn") return a noad list
  //use spread operator to collect all buttons in an array
  getCartButtons() {
    const buttons = [...document.querySelectorAll(".bag-btn")];
    //get id of each
    buttons.forEach((item) => {
      let id = item.dataset.id;
      item.addEventListener("click", (event) => {
        let cartItem = Storage.getProduct(id);
        cart = [...cart, cartItem];
        console.log(cart);
      });
    });
  }
}

class Storage {
  // manage save received data
  //save data in local storage
  // define a static object to use itglobaly
  static saveProducts(products) {
    //json.stringify for change array to JSon
    localStorage.setItem("products", JSON.stringify(products));
  }
  static getProduct(id) {
    let products = JSON.parse(localStorage.getItem("products"));
    return products.find((item) => item.id === id);
  }
}
//create objects after loading
document.addEventListener("DOMContentLoaded", () => {
  //when document loaded this object will be created here
  const view = new View();
  const product = new Product();

  product
    .getProducts()
    .then((data) => {
      view.displayProducts(data);
      Storage.saveProducts(data);
    })
    .then(() => {
      //get buttons after  get products list
      view.getCartButtons();
    });
});
