let allProducts = [];

// Render sản phẩm
function renderProducts(products) {
  const container = document.getElementById("productContainer");
  container.innerHTML = "";

  if (!products || products.length === 0) {
    container.innerHTML = '<p class="text-center">Không có sản phẩm nào.</p>';
    return;
  }

  products.forEach((product) => {
    const productHTML = `
      <div class="col-lg-3 col-md-4 col-sm-6 mb-4 d-flex align-items-stretch">
        <div class="card h-100">
          <img src="${product.img}" alt="${product.name}" class="card-img-top">
          <div class="card-body d-flex flex-column">
            <div>
              <div class="product-name">${product.name}</div>
              <div class="product-price">Giá: ${product.price}đ</div>
              <div class="product-info">Màn hình: ${product.screen}</div>
              <div class="product-info">Camera sau: ${product.backCamera}</div>
              <div class="product-info">Camera trước: ${product.frontCamera}</div>
              <div class="product-info">Mô tả: ${product.desc}</div>
            </div>
            <button class="btn btn-primary btn-add-cart mt-3" onclick="addToCart(${product.id})">
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>
    `;
    container.innerHTML += productHTML;
  });
}

// Thêm sản phẩm vào giỏ hàng
function addToCart(productId) {
  const product = allProducts.find((item) => item.id == productId);

  if (!product) {
    alert("Không tìm thấy sản phẩm!");
    return;
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingItem = cart.find((item) => item.productId == product.id);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    const cartItem = {
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.img,
      quantity: 1,
    };
    cart.push(cartItem);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  window.location.href = "Cart.html";
}

// Lọc sản phẩm theo loại
function filterProductsByType() {
  const filterValue = document.getElementById("productFilter").value;
  const filteredProducts =
    filterValue === "all"
      ? allProducts
      : allProducts.filter(
          (product) =>
            product.type && product.type.toLowerCase() === filterValue
        );

  renderProducts(filteredProducts);
}

// Tìm kiếm sản phẩm
function searchProducts() {
  const keyword = document
    .getElementById("searchInput")
    .value.toLowerCase()
    .trim();
  const filteredProducts = allProducts.filter((product) => {
    const nameMatch = product.name.toLowerCase().includes(keyword);
    const idMatch = product.id.toString().includes(keyword);
    const priceMatch = product.price.toString().includes(keyword);

    return nameMatch || idMatch || priceMatch;
  });

  renderProducts(filteredProducts);
}

// Fetch API sản phẩm
fetch("https://680b244bd5075a76d989f845.mockapi.io/Products")
  .then((res) => res.json())
  .then((data) => {
    allProducts = data;
    renderProducts(allProducts);
  })
  .catch((err) => {
    console.error("Lỗi khi tải sản phẩm:", err);
    document.getElementById("productContainer").innerHTML =
      '<p class="text-center">Lỗi khi tải sản phẩm.</p>';
  });
