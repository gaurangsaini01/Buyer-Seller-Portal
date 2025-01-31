const navbarLinks = [
  {
    id: 0,
    name: "Profile",
    link: "/dashboard/my-profile",
  },
  {
    id: 1,
    name: "Items",
    link: "/dashboard/items",
  },
  {
    id: 2,
    name: "Orders",
    link: "/dashboard/orders/pending-buy-orders",
  },
  {
    id: 3,
    name: "Deliver",
    link: "/dashboard/deliver",
  },
];
const filterRoutes = [
  { path: "/dashboard/orders/pending-buy-orders", label: "Pending Buy Orders" },
  {
    path: "/dashboard/orders/previously-bought-items",
    label: "Previously Bought Orders",
  },
  {
    path: "/dashboard/orders/previously-sold-items",
    label: "Previously Sold Orders",
  },
];

const categoriesList = [
  "Electronics",
  "Fashion",
  "Home & Kitchen",
  "Beauty & Personal Care",
  "Health",
  "Education",
  "Sports & Outdoors",
  "Toys & Games",
  "Automotive",
  "Groceries",
  "Furniture",
  "Pet Supplies",
  "Baby Products",
  "Jewelry & Accessories",
];

export { navbarLinks, filterRoutes, categoriesList };
