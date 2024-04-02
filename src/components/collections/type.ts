
type ProductType = any;

export interface CollectionType {
    _id: string;
    title:string;
    description:string;
    image:string;
    products: ProductType[];
}