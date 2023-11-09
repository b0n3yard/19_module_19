import { openDB } from 'idb';

const initdb = async () =>
  openDB('jatedb', 1, {
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
  const db = await openDB('jatedb', 1)
  const tx = db.transaction('jate', 'readwrite')
  const store = tx.objectStore('jate')
console.log(content)
  // if(content && !Number.isInteger(content.id)){
  //   delete content.id
  // }
  const request = store.put({id: 1, value: content})

  const result =  await request
  console.log(result)
  // await tx.done
  // request.onsuccess = () =>{
  //   console.log('Content updated')
  // }
  // await new Promise((resolve, reject)=>{
  //   tx.oncomplete = resolve,
  //   tx.onerror = reject

  // }) 
}
  // console.error('putDb not implemented');}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () =>{
  const db = await openDB('jatedb', 1)
  const tx = db.transaction('jate', 'readonly')
  const store = tx.objectStore('jate')

  const request = await store.get(1)
  await tx.done
  console.log(request)
  return request?.value
  
};

initdb();
