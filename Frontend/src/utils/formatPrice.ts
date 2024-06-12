export const  formatPrice = (price: number | undefined): string => {
    return price ? `₪${price}` : '';
}