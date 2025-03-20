import { useCart } from "../context/CartContext";
import { Box, Button, Card, CardContent, CardMedia, Container, Typography } from "@mui/material";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Your cart
      </Typography>

      {cart.length === 0 ? (
        <Typography align="center" color="textSecondary">
          Your cart is empty
        </Typography>
      ) : (
        <>
          {cart.map((item) => (
            <Card key={item.id} sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <CardMedia component="img" sx={{ width: 100, height: 100 }} image={item.image} alt={item.name} />
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body2">Price: {item.price}€</Typography>
                <Typography variant="body2">Quantity: {item.quantity}</Typography>
                <Button variant="contained" color="error" onClick={() => removeFromCart(item.id)}>
                  Remove
                </Button>
              </CardContent>
            </Card>
          ))}

          <Button variant="contained" color="primary" fullWidth onClick={clearCart}>
            Clear my cart
          </Button>
        </>
      )}
    </Container>
  );
};

export default Cart;