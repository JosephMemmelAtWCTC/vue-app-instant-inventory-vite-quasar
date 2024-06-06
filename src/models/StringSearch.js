export default function StringSearch(id, data){

  id = id ?? '';
  data = data ?? {};

  return {
      id: id,
      forId: data.forId ?? '',
      searchTerms: data.searchTerms ?? [],
      itemType: data.itemType ?? '',
      parentLocation: data.parentLocation ?? '',
      parentCategoryName: data.parentCategoryName ?? '',
  }
}
