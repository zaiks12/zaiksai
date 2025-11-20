const chatBox = document.getElementById("chat-box");
const input = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

function addMessage(text, sender) {
    const msg = document.createElement("div");
    msg.classList.add("message", sender);
    msg.innerText = text;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// === BOT CEVAP MOTORU === //
function botReply(message) {
    message = message.toLowerCase();

    // --- DUYGU ANALİZİ --- //
    if (/(üzgün|kötüyüm|moralim bozuk)/.test(message))
        return "Üzülme kanks, ben buradayım. ❤️";

    if (/(mutluyum|iyim|harikayım)/.test(message))
        return "Ooo süper! Böyle devam et kral 😎🔥";

    // --- MOTİVASYON --- //
    if (message.includes("motivasyon"))
        return "Pes etmek yok! Sen güçlüsün ⚡";

    if (message.includes("yorgunum"))
        return "Dinlen biraz kanka, sonra yine uçarsın ✨";

    // --- BİLGİ --- //
    if (/nedir/.test(message))
        return "Google gibi anlatayım: Sorduğun şey bağlama göre değişir 😄";

    if (message.includes("bilgi ver"))
        return "Bilgi: İnsan beyni 1 saniyede 10m işlem yapabilir 🧠";

    // --- YAPAY ZEKA TARZI --- //
    if (message.includes("yorumla"))
        return "Analiz: Mesajın net ve güçlü bir enerji veriyor 👍";

    if (message.includes("değerlendir"))
        return "Objektif değerlendirdim: Mantıklı gidiyorsun.";

    // --- MATEMATİK (1+1, 5*7, 20-4, 10/2) --- //
    const match = message.match(/(\d+)\s*([-+*/])\s*(\d+)/);
    if (match) {
        const a = Number(match[1]);
        const op = match[2];
        const b = Number(match[3]);
        let result;

        switch (op) {
            case "+": result = a + b; break;
            case "-": result = a - b; break;
            case "*": result = a * b; break;
            case "/": 
                if (b === 0) return "0'a bölünmez kanka 😄";
                result = a / b; 
                break;
        }
        return `${a} ${op} ${b} = ${result}`;
    }

    // --- DİĞER KOMUTLAR --- //
    if (message.includes("rastgele sayı"))
        return "Rastgele: " + Math.floor(Math.random() * 9999);

    if (message.includes("tavsiye ver"))
        return "Bugün biraz temiz hava al kanka ☀️";

    if (message.includes("zar at"))
        return "Zar: 🎲 " + (1 + Math.floor(Math.random() * 6));

    if (message.includes("şifre üret"))
        return "Şifren: " + Math.random().toString(36).slice(2, 10);

    if (message.includes("espri"))
        return "Bilgisayar neden üşür? Çünkü çok pencere açar 😂";

    if (message.includes("versiyon"))
        return "Bot versiyon: 3.0 Ultimate 🧠";

    if (message.includes("ping"))
        return "Ping: " + (10 + Math.floor(Math.random() * 50)) + "ms ⚡";

    if (message.includes("kanka"))
        return "Buradayım kanks 🔥";

    if (message.includes("adın ne"))
        return "Benim adım zaiks 0.2 😎";

    if (message.trim() === "")
        return "Bir şey yaz sayın kral 😄";

    return "Anladım kanka, daha gelişmiş bir şeyse biraz daha detaylı yaz 😉";
}


// === GÖNDERME BUTONU === //
sendBtn.addEventListener("click", () => {
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "user");
    setTimeout(() => addMessage(botReply(text), "bot"), 300);

    input.value = "";
});

// === ENTER İLE GÖNDERME === //
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendBtn.click();
    }
});
