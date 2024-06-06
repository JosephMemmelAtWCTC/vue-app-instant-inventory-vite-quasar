//TODO: Convert to instantiatable with settings
import {STORAGE_TYPES} from "src/models/InventoryItem";

const N_FOR_CATEGORY_START = 3;
const N_FOR_CATEGORY_LENGTH = 10;
const N_FOR_CATEGORY_END = 4;

const N_FOR_PRODUCT_START = 3;
const N_FOR_PRODUCT_LENGTH = 8;
const N_FOR_PRODUCT_END = 5;

export const NGRAM_CONFIG = {
  START:{
    CATEGORY: N_FOR_CATEGORY_START,
    PRODUCT: N_FOR_PRODUCT_START,
  },
  LENGTH:{
    CATEGORY: N_FOR_CATEGORY_LENGTH,
    PRODUCT: N_FOR_PRODUCT_LENGTH,
  },
  END:{
    CATEGORY: N_FOR_CATEGORY_END,
    PRODUCT: N_FOR_PRODUCT_END,
  }
}

export function sanitize(userInputString){
  userInputString = userInputString.toLowerCase().trim();
  while(userInputString.includes("  ")){
    userInputString = userInputString.replaceAll("  ", " ");
  }
  return userInputString;
}

export function generateNGrams(startingStoreString, type){
  startingStoreString = sanitize(startingStoreString);
  let nGrams = [];
  if(type === STORAGE_TYPES.CATEGORY){
    nGrams = generateHybridNGrams(startingStoreString, NGRAM_CONFIG.LENGTH.CATEGORY, NGRAM_CONFIG.START.CATEGORY, NGRAM_CONFIG.END.CATEGORY)
  }else if(type === STORAGE_TYPES.PRODUCT_GENERIC){
    nGrams = generateHybridNGrams(startingStoreString, NGRAM_CONFIG.LENGTH.PRODUCT, NGRAM_CONFIG.START.PRODUCT, NGRAM_CONFIG.END.PRODUCT)
  }
  return nGrams;
}

function generateHybridNGrams(startingStoreString, initialLength, shortN, longN) {
  const nGrams = [];
  startingStoreString = sanitize(startingStoreString);

  // Generate starting n-grams
  for (let i = 0; i <= initialLength - shortN; i++) {
    if (i + shortN <= startingStoreString.length) {
      nGrams.push(startingStoreString.substring(i, i + shortN));
    }
  }

  // Generate remaining n-grams
  for (let i = initialLength - longN + 1; i <= startingStoreString.length - longN; i++) {
    if (i >= 0 && i + longN <= startingStoreString.length) {
      nGrams.push(startingStoreString.substring(i, i + longN));
    }
  }

  return nGrams;
}



