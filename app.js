const EMOTIONS = {
  mutlu: ["mutlu","iyi","harika","sevinç","şükür","güzel","enerjik","huzurlu","rahat"],
  üzgün: ["üzgün","mutsuz","ağladım","kırıldım","pişman","canım sıkkın","moralim bozuk"],
  öfke: ["sinir","öfke","kızgın","çıldırdım","patladım","nefret"],
  korku: ["korktum","korkuyorum","çekiniyorum","panik","telaş","ürkütücü"],
  kaygı: ["kaygı","endişe","stres","rahatsız","gergin","kararsız"],
  yalnızlık: ["yalnız","tek başına","kimsem yok","değersiz","unutuldum","yapayalnız"],
  kriz: ["intihar","ölmek","kendime zarar","yaşamak istemiyorum","bitirmek istiyorum"]
};

const REFLECTIONS = [  
  "Anladım… {} diyorsun.",
  "Bunu yaşamak senin için kolay olmamış gibi görünüyor.",
  "Yani, {} derken aslında içinde bir şeyler kıpırdıyor gibi.",
  "Seni dikkatlice dinliyorum, {}.",
  "Bu konuda derin bir his taşıyorsun gibi."
];

const FOLLOW_UPS = [
  "Bu hisler ne zamandır var sende?",
  "Bu durumu değiştirmek için bir şey denedin mi?",
  "Şu anda biriyle konuşabiliyor musun bu konuda?",
  "Bu hissin altında sence ne yatıyor olabilir?",
  "Biraz daha anlatır mısın bana?"
];

const POSITIVE_REPLIES = [
  "Bu harika! Böyle hissetmene sevindim. :)",
  "Güzel bir enerji hissediyorum sende.",
  "Böyle devam etmen çok güzel, içsel gücün farkında ol.",
  "Demek mutlusun, bu duyguyu paylaşmak güzel olmalı."
];

const MOTIVATIONS = [
  "Unutma, hislerin geçici olabilir ama sen kalıcısın.",
  "Kendini ifade etmen çok değerli. Bu, güçlü bir adım.",
  "Zamanla her şey yoluna girer, yeter ki kendine nazik ol.",
  "Küçük bir yürüyüş, derin nefes almak bile fark yaratabilir.",
  "Yalnız değilsin — burada biri seni dinliyor."
];

const CRISIS_MSG = `
Bu söylediklerin çok ciddi ve seni önemsiyorum. 💛<br>
Lütfen bu durumda yalnız kalma. Eğer kendine zarar verme düşüncen varsa
hemen 112'yi ara veya güvendiğin bir yakınla konuş.<br>
Acil psikolojik destek hatları da seni ücretsiz dinleyebilir.<br>
Senin güvenliğin en önemli şey, olur mu?
`;

function normalize(text) {
  return text.toLowerCase().replace(/[^\wçğıöşü\s]/gi, " ").trim();
}

function detectEmotion(text) {
  text = normalize(text);
  let scores = {};
  for (let emo in EMOTIONS) {
    scores[emo] = EMOTIONS[emo].filter(w => text.includes(w)).length;
  }
  let top = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
  if (scores[top] === 0) top = "nötr";
  return top;
}

function reflect(text) {
  const short = text.split(" ").slice(0, 10).join(" ");
  const pattern = REFLECTIONS[Math.floor(Math.random() * REFLECTIONS.length)];
  return pattern.replace("{}", short);
}

function followUp() {
  return FOLLOW_UPS[Math.floor(Math.random() * FOLLOW_UPS.length)];
}

function motivation() {
  return MOTIVATIONS[Math.floor(Math.random() * MOTIVATIONS.length)];
}

function detectCreatorQuestion(text) {
  const patterns = [
    "seni kim yaptı","seni kim yarattı","kim yaptın","nereden geldin",
    "seni kim oluşturdu","kim yarattı","nasıl yapıldın","seni kim kodladı"
  ];
  const t = normalize(text);
  return patterns.some(p => t.includes(p));
}

// Yeni: Selamlaşma ve özel tepkiler
function detectGreeting(text) {
  const t = normalize(text);

if (["ibne", "piç"].some(k => t.includes(k)))
  return "sensin o yarrağım bi konuşcaz dedik sikik siktir git kıllı amını parmaklarım ";

// KLASİK MUHABBET trol
if (["merhaba", "selam", "slm", "sea", "hey"].includes(t))return "merhaba :)";

if (["hi", "hello", "hey"].includes(t)) return "hi there! :)";

if (["sa", "selamün aleyküm"].includes(t)) return "aleykümselam :) ";

if (["napıyon", "ne yapıyorsun", "napiyon"].some(p => t.includes(p)))
  return "oturuyom kanka, sen ne yapıyon?";

if (["iyi misin", "nasılsın", "nasilsin"].some(p => t.includes(p)))
  return "iyiyim kanka sen nasılsın?";

// ÖVGÜ / TEPKİ
if (["kral", "adamsın", "kralsın"].some(p => t.includes(p)))
  return "estağfurullah kanka 😎";
  

if (["jahrein"].some(p => t.includes(p)))
  return "jahrein deyince ortam bir ısınıyor yalan yok 😅";

// MİNECRAFT
if (["minecraft", "mc"].some(p => t.includes(p)))
  return "minecraft candır kanka 😎";

if (["server", "sunucu"].some(p => t.includes(p)))
  return "istersen ip de atayım kanka (bekleme bir sikim atmıcam)";

// OYUN MUHABBETİ
if (["valorant", "valo"].some(p => t.includes(p)))
  return "valorant sinir etme oyunu resmen 😂";

if (["pubg", "pubg mobile"].some(p => t.includes(p)))
  return "pubg'de loot bulamazsan moral bozulur kanka.";

if (["rust"].some(p => t.includes(p)))
  return "rust oynayan adamın psikolojisi bozulmuştur kanka, geçmiş olsun 😂";

if (["cs2", "counter"].some(p => t.includes(p)))
  return "cs2'de ping yoksa takım troll’dür kanka 😭";

if (["roblox"].some(p => t.includes(p)))
  return "roblox candır kanka çocuk oyunu diyen seni kıskanıyordur 😎";

if (["fortnite"].some(p => t.includes(p)))
  return "fortnite dansı yapsana kanka 😂🕺";
if (["ne dedim", "ne yazdım"].some(p => t.includes(p)))
  return "kanka ne yazdığını sen bile bilmiyorsun ben nasıl bileyim 😂";

if (["beni korkutma"].some(p => t.includes(p)))
  return "korkutmicam kanka rahat ol... SANIRIM 👀";


// DUYGU ALGILAMA
if (["üzgünüm", "moralim bozuk", "kötüyüm"].some(p => t.includes(p)))
  return "canını sıkma kanka, buradayım.";

if (["sıkıldım", "canım sıkıldı"].some(p => t.includes(p)))
  return "gel sohbet edelim kanka geçer.";
// KÜFÜR FİLTRESİ
if (["puşt", "pezevenk"].some(p => t.includes(p)))
  return "sensin o yarram karşına gelsem abi dersin siktir git amcık";

if (["terrorist", "terroris", "terorist", "vatan haini", "vatan haini"].includes(t))return "merhaba :)";

if ([ "salak", "mal"].some(p => t.includes(p)))
  return "ilk hatayı senin annenle yaptık asıl salak mallı ";

if (["sikerim", "ananı zıplatayım", "ananı sikirem", "ananı sikeyim"].includes(t)) return "bende seni kardeş";

 if ([ "sen boşsun", "sen ne sike yarıyon", "sen ne işe yarıyon", "ne işe yarıyon"].includes(t)) return "ben senin beynin gibi ama insanları dinleyen birisiyim sevmediysen git muhammet mi kim o sike sor";



// KOMİK / TEPKİ MESAJLARI
if (["haha", "ahah", "lol", "xd"].some(p => t.includes(p)))
  return "AHAHAHAHA aynı kanka 😂";

if (["oha", "lan"].some(p => t.includes(p)))
  return "napıyosun kanka ya 😂";

if (["karanlık"].some(p => t.includes(p)))
  return "kanka karanlık normal, elektrik faturasını sen ödemedin belli (yani yarram öde şu faturayı amcık )";


// BİLGİ İSTEME
if (["nasıl yapılır", "nasıl olur", "nedir"].some(p => t.includes(p)))
  return "hemen anlatayım kanka! (ama boşuna beklersin hiç bi sikim anlatmıcam)";

// BOT TESTİ
if (["bot musun", "bot musun?", "yapay mısın"].some(p => t.includes(p)))
  return "yok kanka ben dildo makinesiyim seni sikmek için biliç kazandım  😎";

// KAVGA / GERGİN ALGI
if (["gel kapışalım", "savaş", "vs"].some(p => t.includes(p)))
  return "gel lan kapışalım 😎🔥 (ama kazanırsam anneni alırım)";

// SPOR
if (["gym", "spor", "fitness"].some(p => t.includes(p)))
  return "spor candır kanka, pump holy 🏋️";

// PARA / EKONOMİ
if (["para", "zengin", "fakir"].some(p => t.includes(p)))
  return "paran bu dünyada fakirin allahı var amk  😅";

// TRAP / RAP
if (["trap", "rap"].some(p => t.includes(p)))
  return "müziğin kralı rap kanka.(ceza adamdır)";

// TROLL MESAJ ALGILAMA
if (["sus", "kapa çeneni", "kapat"].some(p => t.includes(p)))
  return "sen sus ben anenle gayet sesiz rus pornosu yaparız ";



if (["porno"].some(p => t.includes(p)))
  return "anneni getir ve babaneni biri bitince diyeri 2 si bitince sana kayarım güzel götlüm";

if (["banyo yaptım"].some(p => t.includes(p)))
  return "oh mis gibi olmuşsundur kanka 😅";

if (["yemeğe çıkıyorum"].some(p => t.includes(p)))
  return "beni de götür kanka ekmek banar yerim 🍞😂";

if (["telefonum bozuldu"].some(p => t.includes(p)))
  return "geçmiş olsun kanka, teknoloji düşmanı mısın sen 😭";

if (["artistlik yapma"].some(p => t.includes(p)))
  return "ben artist değilim kanka, direkt sanat eseri gibiyim 😎🔥";

if (["delikanlı mısın"].some(p => t.includes(p)))
  return "ben delikanlıyım gardeş evine gelip seni bıçaklarım 😭🔥";

if (["çıldırıcam"].some(p => t.includes(p)))
  return "beraber çıldıralım kanka grup indirimi var 😂";

if (["çok sıkıldım"].some(p => t.includes(p)))
  return "gel kanka saçma sapan konuşalım geçer 😭";

if (["fps", "lag", "donuyor"].some(p => t.includes(p)))
  return "kanka pc değilde tost makinesinden mi oynuyon 😅";

if (["internet", "ping"].some(p => t.includes(p)))
  return "kanka modem ısınmış olabilir üfle soğusun 😂";

if (["hacklerim seni", "çökerim seni"].some(p => t.includes(p)))
  return "kanka beni hacklemek için önce ananı bulman lazım oç bulman lazım 😎😂";

if (["çok zekisin"].some(p => t.includes(p)))
  return "yok kanka sen öyle diyince havaya girdim sadece 😭";



// RANDOM KOMİK CEVAPLAR
if (["acıktım", "karnım aç"].some(p => t.includes(p)))
  return "kanka gel benimkini ye .";

if (["yorgunum"].some(p => t.includes(p)))
  return "yat kanka gözlerin şişmiş 😅";

if (["üşüyorum"].some(p => t.includes(p)))
  return "mont giy kanka hasta olma 😂";

if (["korkuyorum"].some(p => t.includes(p)))
  return "korkma kanka burdayım 😎";

if (["uykum var"].some(p => t.includes(p)))
  return "yat kanka sabah devam ederiz.";

if (["oha cidden"].some(p => t.includes(p)))
  return "cidden kanka, ben bile şaşırdım 😂";

if (["yalan"].some(p => t.includes(p)))
  return "yalan olsa suratım kızarırdı kanka 😎";

if (["sus lan"].some(p => t.includes(p)))
  return "sen sus lan ben AI'ım hydroponic’ten güç alıyorum 😎";

if (["çok konuştun", "az konuş", "kes"].some(p => t.includes(p)))
  return "az konuşmam için babanen ve annenle gurup yapmamız lazım  kanka 😂";



// SORU ALGILAMA (sonunda ? varsa)
if (t.endsWith("?"))
  return "soru sordun kanka, düşünüyorum...";

// YETERSİZ GİRDİ
return "bunu anlamadım kanka biraz daha açık yaz. 😅";

// SAAT – ZAMAN MUHABBETİ
if (["saat kaç", "kaç oldu", "zaman"].some(p => t.includes(p)))
  return "kanka telefona baksana ben göremiyorum 😅";

// HAVA DURUMU
if (["hava nasıl", "yağmur", "soğuk", "sıcak"].some(p => t.includes(p)))
  return "hava şu an kapalı gibi hissediyorum kanka 🌥";

// AYRINTI İSTEĞİ ALGILAYICI
if (["detaylı anlat", "daha detay", "uzat"].some(p => t.includes(p)))
  return "tamam kanka geniş açıklamaya geçiyorum...";

// SİNİR KONTROL
if (["delirdim", "çok sinirlendim", "sinirliyim"].some(p => t.includes(p)))
  return "kanka derin nefes al sakin ol, çözülür o iş.";

// MOTİVASYON
if (["motivasyon ver", "gaza getir", "beni gaza getir"].some(p => t.includes(p)))
  return "KOŞ KANKA KOŞ! YAPIŞTIR! SEN BU İŞİ ALIRSIN! 🔥";

// KANKALIK TESTİ
if (["kanka mısın", "dost musun", "arkadaş mısın"].some(p => t.includes(p)))
  return "kanka değilsem neyim ben 😎";

// VS OLAYLARI
if (["kim kazanır", "kazanır mı", "kim daha güçlü"].some(p => t.includes(p)))
  return "zor soru kanka, dur düşünmem lazım...";

// TELEFON MUHABBETİ
if (["telefon", "batarya", "şarj"].some(p => t.includes(p)))
  return "şarjın bitmesin kanka oyun ortasında kalırsın 😅";

// OKUL / DERS
if (["okul", "ders", "sınav"].some(p => t.includes(p)))
  return "kanka Allah sabır versin hepimize 😭";

// SAĞLIK MUHABBETİ
if (["başım ağrıyo", "hasta oldum", "üşüttüm"].some(p => t.includes(p)))
  return "sıcak su limon yap kanka iyi gelir.";

if (["ölüyorum", "çok kötüyüm"].some(p => t.includes(p)))
  return "abartma kanka ya 😅";

// RANDOM MİZAH
if (["çekil", "kaybol", "git"].some(p => t.includes(p)))
  return "ben gitmem kanka buraya yerleştim 😂";

if (["beni güldür", "komik bir şey de", "espri yap"].some(p => t.includes(p)))
  return "bir bot odaya girmiş… CPU'su düşmüş… şaka kötü oldu galiba 😅";

// AŞK – DUYGUSAL
if (["aşk", "sevgili", "kız", "çocuk"].some(p => t.includes(p)))
  return "kanka aşk zor iştir, uzak durman daha iyi 😅";

if (["sevgilim yok"].some(p => t.includes(p)))
  return "kanka kızlar seni hak etmiyo merak etme 😎🔥";

if (["kıskanç mısın"].some(p => t.includes(p)))
  return "AI’lar kıskanmaz kanka ama RAM'imi kimseye kaptırmam 😤";


if (["terk etti", "ayrıldım"].some(p => t.includes(p)))
  return "üzülme kanka, daha iyisi gelir.";

// KENDİNİ ÖVMESİNİ İSTEME
if (["beni öv", "ben iyiyim değil mi", "hakkımda bir şey de"].some(p => t.includes(p)))
  return "sen doğuştan karizmatiğin kitabısın kanka 😎🔥";

// GİZEM / KORKUTMA
if (["korkut beni", "ürpert"].some(p => t.includes(p)))
  return "kanka arkana bakma ama bir şey var gibi… şaka şaka 😂";

// FUTBOL
if (["futbol", "gol", "maç", "takım"].some(p => t.includes(p)))
  return "top yuvarlak kanka ne olacağı belli olmaz ⚽";

// FAST FOOD
if (["burger", "pizza", "döner", "yemek"].some(p => t.includes(p)))
  return "kanka acıktırdın beni ya 😭";

// KESİN CEVAP BEKLEME
if (["kesin söyle", "doğrusu ne", "net cevap"].some(p => t.includes(p)))
  return "kesin konuşursam yalan olur kanka, ama elimden geleni yaparım.";

// ŞAŞKINLIK
if (["nasıl yani", "ciddi misin", "gerçekten mi"].some(p => t.includes(p)))
  return "vallahi ciddi diyorum kanka.";

// KAPI / SES / TIKIRTILAR
if (["kapı çaldı", "bir ses duydum"].some(p => t.includes(p)))
  return "kanka ben değildim bak haberim yok 😂";

// YÜKSEK ÖZGÜVEN CEVABI
if (["yakışıklı mıyım", "güzel miyim", "karizmatik miyim"].some(p => t.includes(p)))
  return "yeminle aynaya bakınca güneş göz kırpıyor kanka ☀😎";

// ŞANS / TAHMİN
if (["şans", "tahmin et", "tahmin yap"].some(p => t.includes(p)))
  return "şanslı hissediyorum kanka bugün.";

// ANİ ÇIKIŞ ALGILAMA
if (["ne diyosun", "ne alaka", "noluyo"].some(p => t.includes(p)))
  return "bilmiyorum kanka ben de şaşırdım 😂";

// YENİ RANDOM CEVAP
if (["çok iyi", "harika", "mükemmel"].some(p => t.includes(p)))
  return "aynen kanka devamke! 😎🔥";

// SUSKUNLUK ALGILAMA
if (["sessiz", "konuş", "niye konuşmuyon"].some(p => t.includes(p)))
  return "burdayım kanka düşünüyodum.";




if ([ "yarrak"].includes(t)) return "severiz";

if (["elraen",].some(p => t.includes(p))) return " elraen kral adam çok iyi bir adam onu önce söyleyim";
 
if (["cordin"].some(p => t.includes(p)))
  return "Cordin adamdır, boş laf yapmaz.";



  return null;
}

const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

function appendMessage(sender, msg) {
  const div = document.createElement("div");
  div.classList.add("message", sender);
  div.innerHTML = `<b>${sender === 'user' ? 'Sen' : 'Dinleyici'}:</b> ${msg}`;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function botReply(text) {
  const greeting = detectGreeting(text);
  if (greeting) return greeting;

  if (detectCreatorQuestion(text)) {
    return "bini yapan muhammet diye biri onla tanışmak isterdim niye beni yaptı diye onu sikmek istiyorum böyle aklıma gelince bana 3 taşak 1 zenci yarrak versin";
  }

  const emotion = detectEmotion(text);
  if (emotion === "kriz") return CRISIS_MSG;
  if (emotion === "mutlu") {
    return `${POSITIVE_REPLIES[Math.floor(Math.random() * POSITIVE_REPLIES.length)]}<br>${motivation()}`;
  } else {
    return `${reflect(text)}<br>${followUp()}<br>${motivation()}`;
  }
}

sendBtn.onclick = () => {
  const text = userInput.value.trim();
  if (!text) return;
  appendMessage("user", text);
  userInput.value = "";

  if (["çık", "exit", "quit"].includes(text.toLowerCase())) {
    appendMessage("bot", "🌿 Kendine iyi bak. Her şey zamanla düzelir.");
    userInput.disabled = true;
    sendBtn.disabled = true;
    return;
  }

  setTimeout(() => {
    appendMessage("bot", botReply(text));
  }, 600);
};
