const fs = require('fs'); // Dosya okuma kütüphanesi
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// API Anahtarı Kontrolü
const apiKey = process.env.GEMINI_API_KEY;
console.log("Sistem kontrol ediliyor...");

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

// 1. SUNUCU SEVİYESİNDE HAFIZA (Route'un dışında tanımlıyoruz)
let chatHistory = []; 

app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        const products = JSON.parse(fs.readFileSync('products.json'));

        // Akıllı filtreleme (Kelimeleri ayırıp ürünlerde arama yapar)
        const keywords = message.toLowerCase().split(' ');
        const relatedProducts = products.filter(p => {
            const textToSearch = (p.baslik + " " + p.aciklama).toLowerCase();
            return keywords.some(keyword => keyword.length > 3 && textToSearch.includes(keyword));
        }).slice(0, 5);

        // Her mesajda Gemini'a kim olduğunu ve elindeki ürünleri tekrar hatırlatıyoruz.
        const combinedPrompt = `
            KİMLİK: Sen Akıllı Ürün Asistanısın. 
            ELİNDEKİ ÜRÜNLER: ${JSON.stringify(relatedProducts)}
            
            GÖREV:
            1. Sadece listedeki ürünleri öner ve teknik özelliklerine (fiyat, id vb.) sadık kal.
            2. Eğer kullanıcı "başka bir şey" derse, az önce önerdiklerini DEĞİL, listedeki diğer alternatifleri sun.
            3. Kullanıcının şu anki mesajı: "${message}"
        `;

        const chat = model.startChat({
            history: chatHistory,
        });

        // sendMessage fonksiyonu combinedPrompt'u hem Gemini'a iletir hem de hafızaya kaydeder
        const result = await chat.sendMessage(combinedPrompt);
        const response = await result.response;
        const text = response.text();

        // Sohbet geçmişini güncelliyoruz
        chatHistory.push({ role: "user", parts: [{ text: message }] });
        chatHistory.push({ role: "model", parts: [{ text: text }] });

        res.json({
            status: "success",
            ai_response: text,
            recommended_products: relatedProducts
        });

    } catch (error) {
        console.error("Hata:", error);
        res.status(500).json({ status: "error", message: "Bir hata oluştu." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} adresinde aktif.`);
    console.log(`Hafıza (Chat History) özelliği aktif edildi.`);
});
