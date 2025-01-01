import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin SDK (if not already initialized globally)
const app = initializeApp({
    credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(
            /\\n/g,
           '\n',
        ),
    }),
});

const db = getFirestore(app);

export default async function handler(req, res) {

  // Verify request origin

  if (req.method !== 'POST') {
      return res.status(405).json({ error: `${req.method} not allowed` });
  }

  try {
    if (req.body==process.env.PW){
      var currentVal1 = ''
      var currentVal2 = ''
      const docRef1 = db.collection('emails').doc('emails');
      await db.runTransaction(async (transaction) => {
        const doc1 = await transaction.get(docRef1);
        if (doc1.exists){
          currentVal1 = doc1?.data()?.val || [];
        }
      });
      const docRef2 = db.collection('analytics').doc('visits');
      await db.runTransaction(async (transaction) => {
        const doc1 = await transaction.get(docRef2);
        if (doc1.exists){
          currentVal2 = doc1?.data() || [];
        }
      });
      return res.status(200).json({ message: "Success", emails: currentVal1, visits: currentVal2 });
    } else {
      return res.status(200).json({ message: "Failed" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}