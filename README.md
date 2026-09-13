# Bandage — E-Commerce

React ile gelistirilmis, coklu sayfali bir e-ticaret uygulamasi. Urun katalogu,
kategori/filtre/siralama destekli magaza sayfasi, sepet yonetimi ve uctan uca
checkout (adres → odeme → siparis) akisini icerir.

## Teknolojiler

- **React 18** + **Vite** (build ve dev server)
- **React Router v5** — sayfa yonlendirme, korumali route'lar
- **Redux** + **redux-thunk** — global state ve asenkron akislar
- **React Hook Form** — form yonetimi ve dogrulama
- **Tailwind CSS** — stil
- **Axios** — API istemcisi
- **React Toastify** — bildirimler
- **Oxlint** — statik analiz

## Kurulum

```bash
npm install
npm run dev
```

Uygulama varsayilan olarak `http://localhost:5173` adresinde calisir.

## Komutlar

| Komut | Aciklama |
| --- | --- |
| `npm run dev` | Gelistirme sunucusunu HMR ile baslatir |
| `npm run build` | Uretim derlemesini `dist/` altina uretir |
| `npm run preview` | Uretim derlemesini yerelde servis eder |
| `npm run lint` | Oxlint ile projeyi denetler |

## Proje Yapisi

```
src/
├── api/            Axios instance ve base URL yapilandirmasi
├── components/     Yeniden kullanilabilir UI bilesenleri
│   ├── home/       Ana sayfa bolumleri
│   └── icons/      SVG ikon bilesenleri
├── data/           Statik icerik (kategoriler, ekip, sehir listesi)
├── layout/         Header, Footer ve route tanimlari
├── pages/          Sayfa bilesenleri
├── store/          Redux action, reducer ve store yapilandirmasi
└── utils/          Yardimci fonksiyonlar (fiyat, slug, dogrulama, rol)
```

## Route'lar

| Route | Sayfa |
| --- | --- |
| `/` | Ana sayfa |
| `/shop` | Magaza |
| `/shop/:gender/:categoryName/:categoryId` | Kategoriye gore urunler |
| `/shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId` | Urun detayi |
| `/cart` | Sepet |
| `/checkout/address` | Checkout — adres secimi (korumali) |
| `/checkout/payment` | Checkout — odeme (korumali) |
| `/orders` | Gecmis siparisler (korumali) |
| `/login`, `/signup` | Oturum acma ve kayit |
| `/about`, `/contact`, `/team` | Kurumsal sayfalar |

Korumali route'lar oturum gerektirir; giris yapilmamissa kullanici `/login`
sayfasina yonlendirilir ve girisin ardindan geldigi sayfaya geri doner.

## API

Uygulama, `src/api/axiosInstance.js` icinde tanimli REST API'yi kullanir.
Oturum token'i `localStorage` uzerinde saklanir ve her istege `Authorization`
basligi olarak eklenir. Sayfa yenilendiginde token dogrulanarak oturum
otomatik olarak geri yuklenir.

## Dagitim

Proje statik bir SPA olarak derlenir. `vercel.json` icindeki rewrite kurali,
tum yollari `index.html` dosyasina yonlendirerek istemci tarafli
yonlendirmenin dogrudan URL erisimlerinde de calismasini saglar.
