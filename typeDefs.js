import { gql } from "apollo-server-express";

export const typeDefs = gql`
type AvailabilityType {
    Sunday: String
    Monday: String
    Tuesday: String
    Wednesday: String
    Thursday: String
    Friday: String
    Saturday: String
}

type CategoryItemType {
    name: String
    price: Float
    image: String
    cropped: String
    availability: AvailabilityType
    description: String
}

type CategoryType {
    name: String
    items: [CategoryItemType]
}

type OrderItemType {
    name: String
    price: Float
    qty: Float
}

type OrderType {
    name: NameType
    id: String
    price: Float
    status: String
    date: String
    time: String
    type: String
    categories: [String]
    items: [OrderItemType]
}

type HoursType {
    from: String
    to: String
}

type AddressType {
    line1: String
    city: String
    state: String
}

type LocationType {
    lat: Float
    lng: Float
}

type NameType {
    first: String
    last: String
}

type OwnerType {
    name: NameType
    phonenumber: String
    email: String
}

type RestaurantType {
    owner: OwnerType
    name: String
    image: String
    backgroundImage: String
    location: LocationType
    address: AddressType
    phonenumber: String
    hours: HoursType
    description: String
    status: String
    unavailableItems: [String]
    categories: [CategoryType]
    orders: [OrderType]
}

type Query {
  allData(id: Float): RestaurantType
  order(id: Float, orderNumber: String): OrderType
}

type Mutation {
  addCategory(id: Float, name: String): [CategoryType]
  changeRestStatus(id: Float, status: String): RestaurantType
  updateOwner(id: Float, first: String, last: String, email: String, phonenumber: String): RestaurantType
  addItem(id: Float, category: String, name: String, image: String, price: Float, desc: String, sunday: String, monday: String, tuesday: String, wednesday: String, thursday: String, friday: String, saturday: String): CategoryType
  editItem(id: Float, category: String, name: String, image: String, price: Float, desc: String, sunday: String, monday: String, tuesday: String, wednesday: String, thursday: String, friday: String, saturday: String): [CategoryItemType]
  editCategory(id: Float, oldName: String, newName: String): [CategoryType]
  removeCategory(id: Float, name: String): [CategoryType]
  removeItem(id: Float, category: String, name: String): [CategoryType]
  changeOrderStatus(id: Float, orderId: String, Status: String): [OrderType]
  updateRestaurantInfo(id: Float, name: String, line1: String, city: String, state: String, phonenumber: String, from: String, to: String, description: String, image: String, backgroundImage: String): RestaurantType
  addNewRest(id: Float, name: String, line1: String, city: String, state: String, phonenumber: String, from: String, to: String, description: String, image: String, backgroundImage: String, first: String, last: String, oEmail: String, oPhone: String): [RestaurantType]
  removeRest(id: Float): RestaurantType
  addUnavailable(id: Float, item: String): RestaurantType
  removeUnavailable(id: Float, item: String): RestaurantType
}
`;
