import axios from "axios";

const CART_URL = "https://api-motoxelerate.onrender.com/api/cart";

// 🛒 Add product to cart (no quantity)
export const addToCart = async ({
  userId,
  productId,
  quantity = 1,
  selected = false,
}) => {
  try {
    const res = await axios.post(CART_URL, {
      userId,
      productId,
      quantity,
      selected,
    });
    console.log("✅ Cart added successfully:", res.data);
    return res.data;
  } catch (err) {
    console.error(
      "❌ Failed to add to cart:",
      err.response?.data || err.message
    );
    throw err;
  }
};

// 📦 Get all carts (or filter manually by userId)
export const getCart = async (userId) => {
  try {
    const res = await axios.get(`${CART_URL}/${userId}`);
    return res.data; // ✅ returns a single cart object
  } catch (err) {
    console.error(
      "❌ Failed to fetch cart:",
      err.response?.data || err.message
    );
    throw err;
  }
};


// ✏️ Update cart by ID (e.g. toggle selected)
export const updateCart = async (cartId, payload) => {
  try {
    const res = await axios.put(`${CART_URL}/${cartId}`, payload);
    console.log("✏️ Cart updated:", res.data);
    return res.data;
  } catch (err) {
    console.error(
      "❌ Failed to update cart:",
      err.response?.data || err.message
    );
    throw err;
  }
};

// 🗑 Delete entire cart by ID
export const deleteCart = async (cartId) => {
  try {
    const res = await axios.delete(`${CART_URL}/${cartId}`);
    console.log("🗑 Cart deleted:", res.data);
    return res.data;
  } catch (err) {
    console.error(
      "❌ Failed to delete cart:",
      err.response?.data || err.message
    );
    throw err;
  }
};

// Remove specific product from cart
export const removeItemFromCart = async ({ cartId, productId }) => {
  try {
    const url = `${CART_URL}/${cartId}/remove`;
    console.log(`🧪 Calling: ${url} with productId: ${productId}`);
    const res = await axios.put(url, { productId });
    console.log("🗑 Removed item from cart:", res.data);
    return res.data;
  } catch (err) {
    console.error(
      "❌ Failed to remove item:",
      err.response?.data || err.message
    );
    throw err;
  }
};
