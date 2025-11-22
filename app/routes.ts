// app/routes.ts
import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("products/:slug", "routes/product.$slug.tsx"),
   route("products", "routes/products.tsx"),
   route("cart", "routes/CartPage.tsx"),
    route("wishlist", "routes/WishlistPage.tsx"),
    route("account", "routes/AccountPage.tsx"),
route("order/:orderId", "routes/OrderDetailPage.tsx"),
route("request-product", "routes/request-product.tsx"),
  route("checkout", "routes/Checkout.tsx"),
  route("reservation-confirmation", "routes/reservation-confirmation.tsx"),
  route("order-confirmation", "routes/order-confirmation.tsx"),






] satisfies RouteConfig;