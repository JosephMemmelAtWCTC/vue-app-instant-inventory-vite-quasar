export default function FirebaseStoreItem(id, data){

  // these arguments are optional
  id = id ?? '';
  data = data ?? {};

  return {
      id: id,
      image: data.image ?? null,
      categories: data.categories ?? null,
      products: data.products ?? null,
  }
}

// export default {Account};
