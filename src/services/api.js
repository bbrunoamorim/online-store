export async function getCategories() {
  const END_POINT = 'https://api.mercadolibre.com/sites/MLB/categories';
  try {
    const response = await fetch(END_POINT);
    return response.json();
  } catch (error) {
    return error;
  }
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const END_POINT = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}_ID&q=${query}`;
  try {
    const response = await fetch(END_POINT);
    return response.json();
  } catch (error) {
    return error;
  }
}

export async function getProductById(productId) {
  const END_POINT = `https://api.mercadolibre.com/items/${productId}`;
  try {
    const response = await fetch(END_POINT);
    return response.json();
  } catch (error) {
    return error;
  }
}
