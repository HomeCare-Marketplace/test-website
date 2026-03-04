import { collections } from "@/data/collections";
import { products } from "@/data/products";
import type { Collection } from "@/types";

export function getCollections() {
  return collections;
}

export function getCollectionsGrouped() {
  const groups: Record<Collection["group"], Collection[]> = {
    Sheets: [],
    Layers: [],
    Protection: [],
    Accessories: [],
  };

  for (const collection of collections) {
    groups[collection.group].push(collection);
  }

  return groups;
}

export function getFeaturedCollections() {
  return collections.filter((collection) => collection.featured);
}

export function getProducts() {
  return products;
}

export function getFeaturedProducts() {
  return products.filter((product) => product.featured);
}

export function getBestsellers() {
  return products.filter((product) => product.bestseller);
}

export function getCollectionByHandle(handle: string) {
  return collections.find((collection) => collection.handle === handle);
}

export function getProductByHandle(handle: string) {
  return products.find((product) => product.handle === handle);
}

export function getProductsByCollectionHandle(handle: string) {
  return products.filter((product) => product.collectionHandles.includes(handle));
}

export function getRelatedProducts(productHandle: string, collectionHandle?: string) {
  const pool = collectionHandle
    ? getProductsByCollectionHandle(collectionHandle)
    : products;

  return pool.filter((item) => item.handle !== productHandle).slice(0, 4);
}
