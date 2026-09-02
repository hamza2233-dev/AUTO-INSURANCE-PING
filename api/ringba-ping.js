export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { cid } = req.body;

  if (!cid) {
    return res.status(400).json({ error: 'Missing required Caller ID' });
  }

  const payload = {
    CID: cid,
    exposeCallerId: "yes"
  };

  try {
    const response = await fetch('https://rtb.ringba.com/v1/production/bf95a1c2fdfa4dc189c24360e9b05252.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    const resultText = await response.text();
    return res.status(200).send(resultText);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

