import mongoose from "mongoose";
import Data from './data.js';

const RestaurantSchema = mongoose.Schema({ owner: { name: { first: String, last: String }, phonenumber: String, email: String }, name: String, image: String, backgroundImage: String,
location: { lat: Number, lng: Number },
address: { line1: String, city: String, state: String },
phonenumber: String,
hours: { from: String, to: String },
description: String,
status: String,
unavailabeItems: [String],
categories: [{ name: String, items: [{ name: String, price: Number, image: String, cropped: String, availability: { Sunday: String, Monday: String, Tuesday: String, Wednesday: String, Thursday: String, Friday: String, Saturday: String }, description: String }] }],
orders: [{ name: {first: String, last: String}, id: String, price: Number, status: String, date: String, time: String, type: String, categories: [String], items: [{ name: String, price: Number, qty: Number }] }] })

export const AvailabilityType = mongoose.model("AvailabilityType", { Sunday: String, Monday: String, Tuesday: String, Wednesday: String, Thursday: String, Friday: String, Saturday: String });
export const CategoryItemType = mongoose.model("CategoryItemType", { name: String, price: Number, image: String, cropped: String, availability: { Sunday: String, Monday: String, Tuesday: String, Wednesday: String, Thursday: String, Friday: String, Saturday: String }, description: String });
export const CategoryType = mongoose.model("CategoryType", { name: String, items: [{ name: String, price: Number, image: String, cropped: String, availability: { Sunday: String, Monday: String, Tuesday: String, Wednesday: String, Thursday: String, Friday: String, Saturday: String }, description: String }] });
export const OrderItemType = mongoose.model("OrderItemType", { name: String, price: Number, qty: Number });
export const OrderType = mongoose.model("OrderType", { name: {first: String, last: String}, id: String, price: Number, status: String, date: String, time: String, type: String, items: [{ name: String, price: Number, qty: Number }] });
export const HoursType = mongoose.model("HoursType", { from: String, to: String });
export const AddressType = mongoose.model("AddressType", { line1: String, city: String, state: String });
export const LocationType = mongoose.model("LocationType", { lat: Number, lng: Number });
export const NameType = mongoose.model("NameType", { first: String, last: String });
export const OwnerType = mongoose.model("OwnerType", { name: { first: String, last: String }, phonenumber: String, email: String });
export const RestaurantType = mongoose.model("RestaurantType", RestaurantSchema);
