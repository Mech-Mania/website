import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin SDK (if not already initialized globally)
const app = initializeApp({
    credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(
            /\\n/g,
           '\n',
        ),
    }),
});

const db = getFirestore(app);

export default async function handler(req, res) {

    if (req.method !== 'GET') {
      return res.status(405).json({ error: `${req.method} not allowed` });
  }

  try {
    
    // Global team points
    let pagestatus = ''
    const docRef1 = db.collection('page').doc('status');
      await db.runTransaction(async (transaction) => {
        const doc1 = await transaction.get(docRef1);
        if (doc1.exists){
          pagestatus = doc1.data() || {};
        }
    });




    return res.status(200).json({ message: "Success", pagestatus:pagestatus});





  } catch (error) {
    return res.status(500).json({ error: `Internal Server Error` });
  }
}