import { Category } from "../Category/category";
import { ProductImageFile } from "./productImageFile";

export class Product {
    id: number;
    name: string;
    description: string;
    price: number;
    categoryId: number;
    category: Category;
    productImageFiles: ProductImageFile;
}
