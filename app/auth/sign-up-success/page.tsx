import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Kayıt Başarılı!</CardTitle>
          <CardDescription>E-postanızı kontrol edin</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground text-center">
            Hesabınız başarıyla oluşturuldu. Giriş yapmadan önce lütfen e-posta adresinizi doğrulayın. Size gönderilen
            doğrulama linkine tıklayın.
          </p>
          <Button asChild className="w-full">
            <Link href="/auth">Giriş Sayfasına Dön</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
