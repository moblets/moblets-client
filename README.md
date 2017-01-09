### Moblets Client

#### Instalation & Setup
```js
import * as Moblets from 'moblets-client';
const config = {
  clientId: clientId,
  app: appId,
  environment: 'local', 'dev' or 'production'
};
this.moblets = new Moblets(config);
```

#### Retrieving data
Data is retrieved through the `moblets.database` service.
There are some paths to retrieve the data:
* Collections
* Data

```js
// Get all collections from the moblet
this.moblets.database.get('/collections').then((response)) => {
  console.log(response);
};

// Get all data from a collection
this.moblets.database.get('/collections/:collection/data').then((response)) => {
  console.log(response);
};

// Query data from a collection
const query = {
  name: 'findName'
}
this.moblets.database.get('/collections/:collection/data', query).then((response)) => {
  console.log(response);
};

// Get a specific data inside a collection
this.moblets.database.get('/collections/:collection/data/:id').then((response)) => {
  console.log(response);
};
```

#### Saving data

| Method                              | Description              |
| ----------------------------------- |:------------------------:|
| push (path: string, data: object)   | Creates a new item       |
| update (path: string, data: object) | Update an existing item  |
| remove (path: string)               | Delete an existing item  |

##### Promises
Each data operation method in the table above returns a promise.

##### Adding new items

Use the `push()` method to add new items on the collection.
```js
this.moblets.database.push('collections/:collection/data', {
  name: newName,
}).then((response) => {
  // Response will have the id from this item on the database
  console.log(response);
});
```

##### Updating items

Use the `update()` method to update existing items.
Be carefull, it will overwrite the item.
```js
this.moblets.database.update('collections/:collection/data/:id', {
  name: newName,
});

// You can even update an entire collection, but be carefull.
const collection = [{name: "1"}, {name: "2"}];
this.moblets.database.update('collections/:collection', collection);
```

##### Removing items

Use the `remove()` method to delete an item.
```js
this.moblets.database.remove('collections/:collection/data/:data');

// You can even delete an entire collection, but be carefull.
this.moblets.database.remove('collections/:collection');
```
