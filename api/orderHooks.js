import axios from "axios";

export const getOrders = async (userId) => {
    try {
        const res = await axios.get(
            `https://api-motoxelerate.onrender.com/api/orders/user/${userId}`
        );
        return res.data;
    } catch (err) {
        console.error("❌ Error fetching orders:", err.message);
        return [];
    }
};
