import { toast } from 'react-toastify'

const PRODUCT_CART = "productsCart";

export function getProductsCart() {
    const response = localStorage.getItem(PRODUCT_CART);
    return JSON.parse(response || "[]");
}

export function addProductCart(infoProducte, tallaProducte, quantitatProducte, quantitatMax) {
    let products = getProductsCart();
    let producte = { id: infoProducte.id, talla: tallaProducte, quantitat: quantitatProducte }

    const result = products.find(({ id, talla }) => id === producte.id && talla === tallaProducte);
    if (result) {
        if (result.quantitat + quantitatProducte > quantitatMax) {
            toast.error(`No pots afegir més quantitat d'aquesta talla`)
            return
        }
        const posProducte = products.indexOf(result)
        producte = { id: result.id, talla: result.talla, quantitat: result.quantitat + quantitatProducte }
        products[posProducte] = producte;
        toast.success(`Afegit a la cistella ${quantitatProducte} més`)
    } else {
        products.push(producte)
        toast.success(`Afegit a la cistella`)

    }
    localStorage.setItem(PRODUCT_CART, JSON.stringify(products));
}

export function removeProductCart(index) {
    const products = getProductsCart();
    products.splice(index, 1)
    localStorage.setItem(PRODUCT_CART, JSON.stringify(products));

}

export function removeAllProductsCart() {
    localStorage.removeItem(PRODUCT_CART);
}

