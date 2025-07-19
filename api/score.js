// api/scores.js
let scores = []; // In-memory storage. Clears on server restart/deploy.

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Sort top 10 scores descending
    const topScores = scores
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
    res.status(200).json(topScores);
  }

  else if (req.method === 'POST') {
    const { username, score } = req.body;

    if (!username || typeof score !== 'number') {
      return res.status(400).json({ error: 'Invalid input' });
    }

    scores.push({ username, score, timestamp: Date.now() });
    res.status(200).json({ message: 'Score submitted' });
  }

  else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
