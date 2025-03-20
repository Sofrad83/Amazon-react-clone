import { useEffect, useState } from "react";
import { fetchProducts, Product } from "../services/productService";
import { Link } from "react-router-dom";
import { Typography, Card } from "@mui/material";

const Home = () => {
    const [product, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadProducts = async() => {
            try{
                const data = await fetchProducts();
                setProducts(data);
            } catch (err) {
                setError("Impossible de charger les produits.");
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    if(loading) return <h2>Loading ...</h2>
    if(error) return <h2>{error}</h2>

    return (
        <div style={styles.container}>
            <Typography variant="h3">Products</Typography>
            <br />
            <div style={styles.grid}>
                {product.map((product) => (
                    <Link to={"/product/"+product.id} key={product.id} style={styles.link}>
                        <Card variant="outlined">
                            <img src={product.image} alt={product.name} style={styles.image}/>
                            <Typography variant="h6">{product.name}</Typography>
                            <Typography variant="body1" color="primary" sx={{ fontWeight: "bold"}}>{product.price} €</Typography>
                            <Typography variant="body2">Tag : {product.category}</Typography>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: "20px",
        textAlign: "center" as const,
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "20px",
    },
    card: {
        border: "1px solid #ddd",
        padding: "10px",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
    },
    image: {
        width: "100%",
        height: "150px",
        objectFit: "cover" as const,
    },
    link: {
        textDecoration: "none",
        color: "inherit",
    },    
}

export default Home;