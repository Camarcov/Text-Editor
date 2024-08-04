import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {

  //creating a connection to the db and version to use
  const db = await openDB('jate', 1)

  //transaction with db and data privileges
  const tx = db.transaction('jate', 'readwrite')

  //open the object store
  const store = tx.objectStore('jate')

  //passing the content into the store
  const request = await store.put({ id: 1, value: content })

  //confirm request
  const result = await request

  console.log('Data saved to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the db')

  //creating a connection to the db and version to use
  const db = await openDB('jate', 1)

  //transaction with db and data privileges, since GET, readonly
  const tx = db.transaction('jate', 'readonly')

  //open the object store
  const store = tx.objectStore('jate')

  //getting the item from the store
  const request = store.getAll();

  //confirm request
  const result = await request

  return result?.value;

};

initdb();
