export default async function handler(req, res) {

  // Verify request origin

  if (req.method !== 'POST') {
      return res.status(405).json({ error: `${req.method} not allowed` });
  }

  try {
    if (req.body==process.env.SB_PW){
      return res.status(200).json({ message: "Success"});
    } else {
      return res.status(200).json({ message: "Failed" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}