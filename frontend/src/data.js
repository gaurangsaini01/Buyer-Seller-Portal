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
    id:3,
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
export { navbarLinks, filterRoutes };
