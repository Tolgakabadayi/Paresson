# Pares - Paket Randevu Satış Platformu

Pares, hizmet sağlayıcıların paket halinde hizmet satabildiği ve müşterilerin bu paketleri satın alarak randevu alabileceği kapsamlı bir platformdur.

## Özellikler

### 🏢 Hizmet Sağlayıcı Paneli
- **Profil Yönetimi**: İş bilgileri, uzmanlık alanları, lokasyon
- **Paket Yönetimi**: Paket oluşturma, fiyatlandırma, promosyonlar
- **Randevu Yönetimi**: Takvim görünümü, randevu onaylama/iptal
- **Mesajlaşma**: Müşterilerle doğrudan iletişim
- **İstatistikler**: Satış raporları, gelir takibi

### 👤 Müşteri Paneli
- **Paket Keşfi**: Kategori bazlı arama ve filtreleme
- **Satın Alma**: Güvenli ödeme sistemi
- **Randevu Alma**: Müsait saatleri görme ve rezervasyon
- **Mesajlaşma**: Hizmet sağlayıcılarla iletişim
- **Paket Takibi**: Kalan seans sayısı, son kullanma tarihi

### 🔧 Admin Paneli
- **Kullanıcı Yönetimi**: Tüm kullanıcıları görüntüleme ve yönetme
- **Komisyon Sistemi**: Oranları belirleme ve takip etme
- **İstatistikler**: Platform geneli raporlar
- **Sponsorlu İçerik**: Paketleri öne çıkarma

## Teknoloji Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes
- **Veritabanı**: PostgreSQL (Supabase entegrasyonu hazır)
- **Authentication**: JWT tabanlı kimlik doğrulama

## Kurulum

### 1. Projeyi İndirin
\`\`\`bash
# GitHub'dan klonlayın veya ZIP olarak indirin
git clone <repository-url>
cd pares-platform
\`\`\`

### 2. Bağımlılıkları Yükleyin
\`\`\`bash
npm install
# veya
yarn install
\`\`\`

### 3. Ortam Değişkenlerini Ayarlayın
`.env.local` dosyası oluşturun:
\`\`\`env
JWT_SECRET=your-super-secret-jwt-key-here
NEXT_PUBLIC_APP_URL=http://localhost:3000
\`\`\`

### 4. Veritabanını Kurun (Opsiyonel)
Supabase entegrasyonu için:
- Vercel Project Settings'den Supabase entegrasyonu ekleyin
- `scripts/` klasöründeki SQL dosyalarını çalıştırın

### 5. Uygulamayı Başlatın
\`\`\`bash
npm run dev
# veya
yarn dev
\`\`\`

Uygulama `http://localhost:3000` adresinde çalışacaktır.

## Kullanım

### Demo Hesapları
Uygulama şu anda mock data ile çalışmaktadır:

- **Admin**: admin@paresapp.online
- **Hizmet Sağlayıcı**: provider1@example.com
- **Müşteri**: customer1@example.com

### Sayfalar
- `/` - Ana sayfa
- `/auth` - Giriş/Kayıt
- `/dashboard` - Müşteri paneli
- `/provider` - Hizmet sağlayıcı paneli
- `/admin` - Admin paneli

## Veritabanı Şeması

### Ana Tablolar
- `users` - Kullanıcı bilgileri
- `service_providers` - Hizmet sağlayıcı profilleri
- `categories` - Hizmet kategorileri
- `packages` - Hizmet paketleri
- `package_purchases` - Satın alınan paketler
- `appointments` - Randevular
- `messages` - Mesajlaşma
- `promotions` - Promosyonlar
- `reviews` - Değerlendirmeler

## API Endpoints

### Authentication
- `POST /api/auth/login` - Giriş
- `POST /api/auth/register` - Kayıt
- `POST /api/auth/logout` - Çıkış
- `GET /api/auth/me` - Kullanıcı bilgileri

### Packages
- `GET /api/packages` - Paket listesi
- `GET /api/packages/[id]` - Paket detayı
- `POST /api/provider/packages` - Paket oluşturma

### Appointments
- `GET /api/appointments` - Randevu listesi
- `POST /api/appointments` - Randevu oluşturma
- `PATCH /api/appointments/[id]` - Randevu güncelleme

### Messages
- `GET /api/messages` - Mesaj/konuşma listesi
- `POST /api/messages` - Mesaj gönderme

## Deployment

### Vercel'e Deploy
1. GitHub'a push edin
2. Vercel'de projeyi import edin
3. Environment variables'ları ekleyin
4. Deploy edin

### Supabase Entegrasyonu
1. Vercel Project Settings'den Supabase'i ekleyin
2. SQL scriptlerini Supabase'de çalıştırın
3. Environment variables otomatik olarak eklenecektir

## Geliştirme Notları

- Mock data `lib/mock-data.ts` dosyasında bulunur
- Gerçek veritabanı entegrasyonu için API route'larını güncelleyin
- Ödeme sistemi entegrasyonu için Stripe veya iyzico eklenebilir
- Real-time mesajlaşma için WebSocket veya Supabase Realtime kullanılabilir

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır.
