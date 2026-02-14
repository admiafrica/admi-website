import { MainLayout } from '@/layouts/v3/MainLayout'
import { ContactForm } from '@/components/forms'
import { PageSEO } from '@/components/shared/v3'

export default function ContactPage() {
  return (
    <MainLayout minimizeFooter minimizeHeader footerBgColor="#002A23">
      <PageSEO title="Contact Us" description="Reach ADMI admissions and support teams." />
      <div className="w-full bg-[#002A23] px-4 pb-16 pt-16 xl:px-0">
        <div className="mx-auto grid w-full max-w-screen-xl grid-cols-1 gap-8 lg:grid-cols-2">
          <section className="text-white">
            <h1 className="font-fraunces text-[48px] font-bold leading-[1.1]">Get in Touch</h1>
            <p className="pt-4 font-nexa text-[17px] text-white/85">We&apos;re here to help with admissions, programme, and student support questions.</p>
            <div className="mt-8 space-y-4">
              <article className="rounded-xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
                <h2 className="font-fraunces text-[28px] font-bold">Visit Us</h2>
                <p className="pt-2 font-nexa text-[15px]">25 Caxton House 3rd Floor, Kenyatta Avenue, Nairobi, Kenya</p>
              </article>
              <article className="rounded-xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
                <h2 className="font-fraunces text-[28px] font-bold">Call or WhatsApp</h2>
                <p className="pt-2 font-nexa text-[15px]">+254 741 132 751</p>
              </article>
            </div>
          </section>
          <section className="mx-auto w-full max-w-xl">
            <ContactForm />
          </section>
        </div>
      </div>
    </MainLayout>
  )
}
