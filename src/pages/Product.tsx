import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProducts, Product } from "../services/productService";
import { useCart } from "../context/CartContext";
import { Box, Button, Card, CardContent, CardMedia, Container, Typography } from "@mui/material";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const products = await fetchProducts();
        const selectedProduct = products.find((p) => p.id === id);
        if (!selectedProduct) throw new Error("Product not found");
        setProduct(selectedProduct);
      } catch (err) {
        setError("Error : product not found");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) return <Typography align="center">Loading...</Typography>;
  if (error) return <Typography align="center" color="error">{error}</Typography>;
  if (!product) return <Typography align="center">Product not found</Typography>;

  return (
    <Container maxWidth="sm">
      <Card>
        <CardMedia component="img" image={product.image} alt={product.name} sx={{ height: 300 }} />
        <CardContent>
          <Typography variant="h5">{product.name}</Typography>
          <Typography variant="body1" color="textSecondary">
            Tag: {product.category}
          </Typography>
          <Typography variant="h6" color="primary" mt={2}>
            Price: {product.price}€
          </Typography>
          <Button variant="contained" color="primary" fullWidth onClick={() => addToCart(product)}>
            Add to cart
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProductPage;