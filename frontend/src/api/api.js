const API_URL = 'http://localhost:3000/api/chat';

export async function sendMessage(message) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) throw new Error('Sunucu hatası');
  return response.json();
}