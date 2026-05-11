🚀 Akıllı Ürün Asistanı (Backend)
Gemini AI destekli, products.json veri seti üzerinden RAG (Retrieval-Augmented Generation) yapısıyla çalışan akıllı bir ürün tavsiye asistanıdır.

🛠️ Kurulum Adımları
Node.js Yükleyin: Bilgisayarınızda Node.js LTS sürümünün kurulu olduğundan emin olun.

Projeyi Klonlayın: ```bash
git clone

Bağımlılıkları Yükleyin:

Bash
npm install
Çevre Değişkenlerini Ayarlayın: * .env.example dosyasının adını .env olarak değiştirin.

Google AI Studio üzerinden aldığınız API anahtarını ilgili alana ekleyin.

⚡ Çalıştırma
Sunucuyu başlatmak için şu komutu kullanın:

Bash
npm start
Not: Sunucu varsayılan olarak http://localhost:3000 adresinde aktif olacaktır.

🔌 API Kullanımı (Endpoint)
Frontend henüz geliştirme aşamasında olduğu için Thunder Client veya Postman eklentilerini kullanarak test yapabilirsiniz.

URL: http://localhost:3000/api/chat

Metot: POST

İstek (Body - JSON):

JSON
{ 
  "message": "Zorlu hava koşulları için ne önerirsin?" 
}
Örnek Yanıt:
JSON
{
  "status": "success",
  "ai_response": "Zorlu hava koşulları için size şu ürünleri önerebilirim...",
  "recommended_products": [
    {
      "id": 1,
      "baslik": "ZirvePro Kışlık Çadır",
      "fiyat": 4250.00
    }
  ]
}