interface File {
    link: string,
    name: string
}

export interface Product {
  _id: string,
  userId: string,
  productId: string, // Not to be confused with the mongo uid
  name: string,
  info?: string,
  referenceNumber?: number,
  country?: string,
  image?: File,
  file?: File,
  createdAt: string,
  updatedAt?: string
}