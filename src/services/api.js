export async function getCategories() {
  const END_POINT = 'https://api.mercadolibre.com/sites/MLB/categories';
  const response = await fetch(END_POINT);
  const data = await response.json();
  return data;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  if (query) {
    const QUERY_END_POINT = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
    const queryResponse = await fetch(QUERY_END_POINT);
    const queryData = await queryResponse.json();
    return queryData;
  }
  const CATEGORY_END_POINT = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
  const categoryResponse = await fetch(CATEGORY_END_POINT);
  const categoryData = await categoryResponse.json();
  return categoryData;
}

export async function getProductById(productId) {
  const END_POINT = `https://api.mercadolibre.com/items/${productId}`;
  const response = await fetch(END_POINT);
  const data = await response.json();
  return data;
}
