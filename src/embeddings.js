const VENICE_BASE_URL = process.env.VENICE_BASE_URL || 'https://api.venice.ai/api/v1';
const EMBEDDINGS_BASE_URL = process.env.EMBEDDINGS_BASE_URL || VENICE_BASE_URL;
const EMBEDDINGS_API_KEY = process.env.EMBEDDINGS_API_KEY || process.env.VENICE_API_KEY;
const EMBEDDINGS_MODEL = process.env.EMBEDDINGS_MODEL || 'text-embedding-bge-m3';

export async function generateEmbedding(text) {
  const response = await fetch(`${EMBEDDINGS_BASE_URL}/embeddings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${EMBEDDINGS_API_KEY}`
    },
    body: JSON.stringify({
      model: EMBEDDINGS_MODEL,
      input: text,
      encoding_format: 'float'
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Embeddings API error ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  return data.data[0].embedding;
}
