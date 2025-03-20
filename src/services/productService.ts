export interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    image: string;
}

const API_URL = "http://localhost:5000/products";

export const fetchProducts = async (): Promise<Product[]> => {
    const response = await fetch(API_URL);
    if(!response.ok){
        throw new Error("Erreur lors de la récupération des produits");
    }

    return response.json();
};