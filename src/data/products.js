import { images } from "../constants";

export const products = [
    {
        id: 1,
        title: "Boxy T-Shirt with Roll Sleeve",
        price: "$20.00",
        oldPrice: null,
        sale: false,
        img: images.shops.shopi,
        stock: 15,
        sku: "TSHIRT-BOXY-001",
        category: "Women"
    },
    {
        id: 2,
        title: "Classic V-Neck T-Shirt",
        price: "$25.00",
        oldPrice: "$35.00",
        sale: true,
        img: images.shops.shop,
        stock: 8,
        sku: "TSHIRT-VNECK-002",
        category: "Women"
    },
    {
        id: 3,
        title: "Cotton Crew Neck Tee",
        price: "$18.00",
        oldPrice: null,
        sale: false,
        img: images.shops.shopy3,
        stock: 22,
        sku: "TSHIRT-CREW-003",
        category: "Men"
    },
    {
        id: 4,
        title: "Oversized Basic T-Shirt",
        price: "$30.00",
        oldPrice: null,
        sale: false,
        img: images.shops.shopy4,
        stock: 0, // Out of stock example
        sku: "TSHIRT-OVER-004",
        category: "Men"
    },
    {
        id: 5,
        title: "Premium Graphic Tee",
        price: "$35.00",
        oldPrice: "$50.00",
        sale: true,
        img: images.shops.shopy5,
        stock: 5,
        sku: "TSHIRT-GRAPH-005",
        category: "Women"
    },
    {
        id: 6,
        title: "Striped Cotton Top",
        price: "$28.00",
        oldPrice: null,
        sale: false,
        img: images.shops.shop6,
        stock: 12,
        sku: "TOP-STRIPE-006",
        category: "Women"
    },
    {
        id: 7,
        title: "Linen Blend Button-Down",
        price: "$45.00",
        oldPrice: null,
        sale: false,
        img: images.shops.shop7,
        stock: 3, // Low stock example
        sku: "SHIRT-LINEN-007",
        category: "Men"
    },
    {
        id: 8,
        title: "Essential Denim Jacket",
        price: "$65.00",
        oldPrice: "$85.00",
        sale: true,
        img: images.shops.shop8,
        stock: 10,
        sku: "JACKET-DENIM-008",
        category: "Women"
    }
];

export const getProductById = (id) => products.find((p) => p.id === Number(id));
export const getFeaturedProducts = () => products.slice(0, 8);
