import { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "../services/productService";

interface CartItem extends Product {
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({children} : {children: ReactNode}) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (product: Product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === product.id);
            if(existingItem) {
                return prevCart.map((item) => 
                    item.id === product.id ? {...item, quantity: item.quantity+1} : item
                );
            }
            return [...prevCart, {...product, quantity: 1}];
        });
    };

    const removeFromCart = (id: string) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === id);
        
            if (existingItem) {
            return prevCart
                .map((item) =>
                item.id === id
                    ? item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : null
                    : item
                )
                .filter((item): item is CartItem => item !== null);
            }
        
            return prevCart;
        });
    };

    const clearCart = () => {
        setCart([]);
    }

    return (
        <CartContext.Provider value={{cart, addToCart, removeFromCart, clearCart}}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if(!context){
        throw new Error("useCart must be use in a CartProvider")
    }
    return context;
}