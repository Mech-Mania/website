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

    if (req.method !== 'POST') {
      return res.status(405).json({ error: `${req.method} not allowed` });
  }

  try {
    
    // Global team points
    let teams = ''
    const docRef1 = db.collection('scoreboard').doc('teams');
      await db.runTransaction(async (transaction) => {
        const doc1 = await transaction.get(docRef1);
        if (doc1.exists){
          teams = doc1.get('Points') || {};
          console.log(doc1.get('Points'))
        }
    });

    let games = ''
    const docRef2 = db.collection('scoreboard').doc('Games');
      await db.runTransaction(async (transaction) => {
        const doc2 = await transaction.get(docRef2);
        if (doc2.exists){
          games = doc2.get('Games') || {};
        }
    });




    return res.status(200).json({ message: "Success", teams:teams, games:games});





  } catch (error) {
    return res.status(500).json({ error: `Internal Server Error` });
  }
}