export default class API{

    static STORE_PRODUCTS = "STORE_PRODUCTS";
    static async getProducts(category){
        let url = 'https://fakestoreapi.com/products';
        if(category) url += `/category/${category}`;
        
        let products = await fetch(url);
            products = await products.json();

        return products;
    }

    static async getCategories(){
        let categories = await fetch('https://fakestoreapi.com/products/categories');
            categories = await categories.json();
        return categories;
    }
}