import { AppBar, Badge, IconButton, Toolbar, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { cart } = useCart();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <AppBar position="static">
      <Toolbar className="flex justify-between">
        <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: "none", color: "white" }}>
          Amazon react clone
        </Typography>
        <IconButton component={Link} to="/cart" color="inherit">
          <Badge badgeContent={totalItems} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;