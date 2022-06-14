import { AvailabilityType, CategoryItemType, CategoryType, OrderItemType, OrderType, HoursType, AddressType, LocationType, NameType, OwnerType, RestaurantType } from "./Cat.js";
import Data from './data.js';
import fetch from 'node-fetch';

export const resolvers = {
  Query: {
    allData: (_, { id }) => Data.find(d => d.id === id),
    order: (_, { id, orderNumber }) => Data.find(d => d.id === id).orders.find(o => o.id === orderNumber),
  },
  Mutation: {
    addCategory: (_, { id, name }) => {
      Data.find(d => d.id === id).categories.push({ name: name, items: [] });
      return Data.find(d => d.id === id).categories;
    },
    changeRestStatus: (_, { id, status }) => {
      Data.find(d => d.id === id).status = status;
      return Data.find(d => d.id === id);
    },
    updateOwner: (_, { id, first, last, email, phonenumber }) => {
      const owner = {
          name: {
            first: first,
            last: last
          },
          email: email,
          phonenumber: phonenumber
        }
      Data.find(d => d.id === id).owner = owner;
      return Data.find(d => d.id === id);
    },
    addItem: (_, { id, category, name, image, price, desc, sunday, monday, tuesday, wednesday, thursday, friday, saturday }) => {
        Data.find(d => d.id === id).categories.find(c => c.name === category).items.push({
            name: name,
            image: image,
            price: price,
            desc: desc,
            availability: {
              sunday: sunday,
              monday: monday,
              tuesday: tuesday,
              wednesday: wednesday,
              thursday: thursday,
              friday: friday,
              saturday: saturday
            }
          });
        return Data.find(d => d.id === id).categories.find(c => c.name === category);
    },
    editItem: (_, { id, category, name, image, price, desc, sunday, monday, tuesday, wednesday, thursday, friday, saturday  }) => {
      const item = {
          name: name,
          image: image,
          price: price,
          desc: desc,
          availability: {
            sunday: sunday,
            monday: monday,
            tuesday: tuesday,
            wednesday: wednesday,
            thursday: thursday,
            friday: friday,
            saturday: saturday
          }
        }
        const removed = Data.find(d => d.id === id).categories.find(c => c.name === category).items.filter(i => i.name !== name);
        removed.push(item);
        Data.find(d => d.id === id).categories.find(c => c.name === category).items = removed;
        return Data.find(d => d.id === id).categories.find(c => c.name === category).items;
    },
    editCategory: (_, args) => {
      const { id, oldName, newName } = args;
      const newCategory = {name: newName};
        Data.find(d => d.id === id).categories.find(c => c.name === oldName).name = newName;
        return Data.find(d => d.id === id).categories;
    },
    changeOrderStatus: (_, args) => {
      const { id, orderId, status } = args;
      Data.find(d => d.id === id).orders.find(o => o.id === orderId).status = status;
      return Data.find(d => d.id === id).orders;
    },
    updateRestaurantInfo: (_, args) => {
      const { id, name, line1, city, state, phonenumber, from, to, description, image, backgroundImage } = args;
      Data.find(d => d.id === id).name = name;
        Data.find(d => d.id === id).phonenumber = phonenumber;
        Data.find(d => d.id === id).description = description;
        Data.find(d => d.id === id).image = image;
        Data.find(d => d.id === id).backgroundImage = backgroundImage;
        Data.find(d => d.id === id).address = {
          line1: line1,
          city: city,
          state: state
        };
        Data.find(d => d.id === id).hours = {
          from: from,
          to: to
        };
        return Data.find(d => d.id === id);
    },
    addNewRest: (_, { id, name, line1, city, state, phonenumber, from, to, description, image, backgroundImage, first, last, oEmail, oPhone }) => {
      Data.push({
        id: id,
        name: name,
        owner: {
            name: {
              first: first,
              last: last
            },
            email: oEmail,
            phonenumber: oPhone
          },
        address: {
          line1: line1,
          city: city,
          state: state
        } ,
        phonenumber: phonenumber,
        hours: {
          from,
          to
        },
        description: description,
        image: image,
        backgroundImage: backgroundImage,
        status: "not busy",
        location: {
          lat: 0,
          lng: 0
        },
        categories: [],
        orders: [] })
        const newUser = new RestaurantType(Data[0])
        newUser.save()
        return Data
    },
    removeCategory: (_, { id, name }) => {
const removed = Data.find(d => d.id === id).categories.filter(c => c.name !== name);
Data.find(d => d.id === id).categories = removed
return Data.find(d => d.id === id).categories
},
removeItem: (_, { id, category, name }) => {
const removed = Data.find(d => d.id === id).categories.find(c => c.name === category).items.filter(i => i.name !== name);
Data.find(d => d.id === id).categories.find(c => c.name === category).items = removed;
return Data.find(d => d.id === id).categories;
},
removeRest: (_, { id }) => {
Data.pop();
return Data[id]
},
addUnavailable: (_, { id, item }) => {
Data.find(d => d.id === id).unavailableItems.push(item);
return Data.find(d => d.id === id)
},
removeUnavailable: (_, { id, item }) => {
const removed = Data.find(d => d.id === id).unavailableItems.filter(u => u !== item);
Data.find(d => d.id === id).unavailableItems = removed;
return Data.find(d => d.id === id)
}
  }
};
