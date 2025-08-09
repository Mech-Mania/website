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
    const body = req.body
    if (body.pw !== process.env.SB_PW){
        return res.status(200).json({ message: "Not authorized" });
    }
  try {
    
    const docRef1 = db.collection('scoreboard').doc('teams');
      await db.runTransaction(async (transaction) => {
        transaction.set(docRef1,body.teams)
    });

    const docRef2 = db.collection('scoreboard').doc('Games');
    await db.runTransaction(async (transaction) => {
        transaction.set(docRef2,body.games)
    });

    const docRef3 = db.collection('page').doc('status');
    await db.runTransaction(async (transaction) => {
        transaction.update(docRef3,{scoreboard:body.enabled})
    });




    return res.status(200).json({ message: "Success"});





  } catch (error) {
    return res.status(500).json({ error: `Internal Server Error ${error}` });
  }
}