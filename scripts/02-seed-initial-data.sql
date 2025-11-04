-- Seed initial data for Pares Platform with Supabase Auth

-- Insert default categories
INSERT INTO categories (name, slug, description, icon) VALUES
('Spor ve Fitness', 'spor-fitness', 'Pilates, yoga, kişisel antrenman ve fitness hizmetleri', 'dumbbell'),
('Sağlık ve Wellness', 'saglik-wellness', 'Masaj, terapi ve sağlık hizmetleri', 'heart'),
('Eğitim', 'egitim', 'Özel ders, kurs ve eğitim hizmetleri', 'book'),
('Güzellik ve Bakım', 'guzellik-bakim', 'Kuaför, estetik ve kişisel bakım hizmetleri', 'scissors'),
('Turizm ve Rehberlik', 'turizm-rehberlik', 'Tur rehberliği ve gezi organizasyonu', 'map'),
('Etkinlik ve Organizasyon', 'etkinlik-organizasyon', 'Etkinlik düzenleme ve organizasyon hizmetleri', 'calendar');

-- Insert platform settings
INSERT INTO platform_settings (key, value, description) VALUES
('default_commission_rate', '10.00', 'Varsayılan platform komisyon oranı (%)'),
('package_validity_days', '90', 'Paketlerin varsayılan geçerlilik süresi (gün)'),
('max_sessions_per_package', '20', 'Paket başına maksimum seans sayısı'),
('platform_name', 'Pares', 'Platform adı'),
('support_email', 'destek@paresapp.online', 'Destek e-posta adresi'),
('featured_package_fee', '50.00', 'Öne çıkarılmış paket ücreti (TL)');

-- Note: Admin user must be created through Supabase Auth
-- After running this script, create an admin user with:
-- Email: admin@paresapp.online
-- Password: admin123 (change in production)
-- Then manually update the profiles table:
-- UPDATE profiles SET user_type = 'admin' WHERE id = '<admin-user-id>';
