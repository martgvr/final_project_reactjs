import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, getDocs, addDoc } from 'firebase/firestore'
import alertify from 'alertifyjs';

const firebaseConfig = {
  apiKey: "AIzaSyBMuUiSIvDwddGSXQssL8C_0YDCxQm1UTk",
  authDomain: "reactjs-vincit.firebaseapp.com",
  projectId: "reactjs-vincit",
  storageBucket: "reactjs-vincit.appspot.com",
  messagingSenderId: "512832100460",
  appId: "1:512832100460:web:05fd8b90f7543c1a5ca049"
};

const app = initializeApp(firebaseConfig);
const firestoreDB = getFirestore(app);

export default firestoreDB;

export function getData(category) {
  return new Promise((resolve) => {
    const collectionRef = collection(firestoreDB, 'products');
    const ref = (category == null) ? collectionRef : query(collectionRef, where('category', '==', category));

    getDocs(ref).then(snapshot => {
      const docsData = snapshot.docs.map(doc => {
        return { ...doc.data(), key: doc.id }
      });
      resolve(docsData);
    })
  })
}

export function getByKey(key) {
  return new Promise((resolve) => {
      const productsCollection = collection(firestoreDB, 'products');
      getDocs(productsCollection).then(snapshot => {
        const docsData = snapshot.docs.map(doc => {
          return { ...doc.data(), key: doc.id }
        });
        let itemRequested = docsData.find((elemento) => elemento.key === key);
        resolve(itemRequested);
      })
  });
}

export async function addToDatabase(orderData) {
  const ordersCollection = collection(firestoreDB, 'orders');
  const docRef = await addDoc(ordersCollection, orderData);
  alertify.alert('Gracias por su compra!', 'El id de su compra es: ' + docRef.id);
}