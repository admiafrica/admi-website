import { Metadata } from 'next'
import { PageSEO } from '@/components/shared/v3/PageSEO'
import { FAQSchema, PriceSpecification } from '@/components/shared/StructuredData'

export const metadata: Metadata = {
  title: 'ADMI Fee Structure 2025 | Course Fees & Payment Plans | Africa Digital Media Institute',
  description: 'View ADMI fee structure for all courses. Flexible payment plans available for Digital Marketing, Graphic Design, Film Production, Animation & more. Get full fee details.',
  keywords: 'ADMI fee structure, ADMI fees, Africa Digital Media Institute fees, course fees Kenya, digital marketing course fees, graphic design fees, ADMI payment plans'
}

const feeFAQs = [
  {
    question: "What is the ADMI fee structure for 2025?",
    answer: "ADMI offers competitive fees ranging from KES 80,000 to KES 150,000 per year depending on the program. All courses include access to industry-standard equipment and software."
  },
  {
    question: "Does ADMI offer payment plans?",
    answer: "Yes, ADMI offers flexible payment plans including monthly, quarterly, and semester options. Students can pay in up to 4 installments per academic year."
  },
  {
    question: "Are there any scholarships available at ADMI?",
    answer: "ADMI offers merit-based scholarships and partners with organizations like Sanara for sponsored programs. Contact admissions for current opportunities."
  },
  {
    question: "What is included in the ADMI course fees?",
    answer: "Course fees include tuition, access to labs and equipment, software licenses, workshop materials, and industry mentorship programs. Accommodation and meals are separate."
  },
  {
    question: "How much does the Digital Marketing course cost at ADMI?",
    answer: "The Digital Marketing diploma at ADMI costs KES 120,000 per year. This includes all course materials, certifications, and practical project expenses."
  }
]

const coursesFeeStructure = [
  {
    name: "Diploma in Digital Marketing",
    duration: "2 years",
    totalFee: "KES 240,000",
    perYear: "KES 120,000",
    perSemester: "KES 60,000",
    modules: ["Social Media Marketing", "SEO & SEM", "Content Strategy", "Analytics", "E-commerce"]
  },
  {
    name: "Diploma in Graphic Design",
    duration: "2 years", 
    totalFee: "KES 200,000",
    perYear: "KES 100,000",
    perSemester: "KES 50,000",
    modules: ["Adobe Creative Suite", "Brand Design", "UI/UX", "Print Design", "Portfolio Development"]
  },
  {
    name: "Diploma in Film & TV Production",
    duration: "2 years",
    totalFee: "KES 300,000",
    perYear: "KES 150,000",
    perSemester: "KES 75,000",
    modules: ["Cinematography", "Video Editing", "Sound Design", "Directing", "Post-Production"]
  },
  {
    name: "Diploma in Animation & Motion Graphics",
    duration: "2 years",
    totalFee: "KES 280,000",
    perYear: "KES 140,000",
    perSemester: "KES 70,000",
    modules: ["2D Animation", "3D Modeling", "Motion Design", "Visual Effects", "Character Design"]
  },
  {
    name: "Certificate in Photography",
    duration: "6 months",
    totalFee: "KES 80,000",
    perSemester: "KES 80,000",
    modules: ["Camera Techniques", "Lighting", "Photo Editing", "Studio Photography", "Event Coverage"]
  }
]

export default function FeesPage() {
  return (
    <>
      <PageSEO
        title="ADMI Fee Structure 2025 | Course Fees & Payment Plans"
        description="View ADMI fee structure for all courses. Flexible payment plans available. Get detailed fee information for Digital Marketing, Graphic Design, Film Production & more."
        path="/fees"
        imageUrl="/images/admi-campus.jpg"
      />
      
      {/* FAQ Schema for fee-related questions */}
      <FAQSchema faqs={feeFAQs} />
      
      {/* Price Specification Schema for courses */}
      {coursesFeeStructure.map(course => (
        <script
          key={course.name}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Course",
              "name": course.name,
              "provider": {
                "@type": "EducationalOrganization",
                "name": "Africa Digital Media Institute (ADMI)"
              },
              "offers": {
                "@type": "Offer",
                "price": course.totalFee.replace(/[^0-9]/g, ''),
                "priceCurrency": "KES",
                "availability": "https://schema.org/InStock"
              }
            })
          }}
        />
      ))}

      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              ADMI Fee Structure 2025
            </h1>
            <p className="text-xl mb-8">
              Transparent pricing for quality creative education in Kenya
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
                Download Fee Structure PDF
              </button>
              <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600">
                Talk to Admissions
              </button>
            </div>
          </div>
        </section>

        {/* Quick Summary */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="p-6 border rounded-lg">
                <h3 className="text-3xl font-bold text-blue-600 mb-2">KES 80K - 150K</h3>
                <p className="text-gray-600">Annual Fee Range</p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="text-3xl font-bold text-green-600 mb-2">4 Installments</h3>
                <p className="text-gray-600">Flexible Payment Options</p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="text-3xl font-bold text-purple-600 mb-2">All Inclusive</h3>
                <p className="text-gray-600">Equipment & Software Access</p>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Fee Structure */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Course Fee Breakdown
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-lg shadow-lg">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-4 text-left">Program</th>
                    <th className="border p-4 text-left">Duration</th>
                    <th className="border p-4 text-left">Total Fee</th>
                    <th className="border p-4 text-left">Per Year</th>
                    <th className="border p-4 text-left">Per Semester</th>
                  </tr>
                </thead>
                <tbody>
                  {coursesFeeStructure.map((course, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border p-4 font-semibold">{course.name}</td>
                      <td className="border p-4">{course.duration}</td>
                      <td className="border p-4 font-bold text-blue-600">{course.totalFee}</td>
                      <td className="border p-4">{course.perYear}</td>
                      <td className="border p-4">{course.perSemester}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Payment Options */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Flexible Payment Plans
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">Full Payment</h3>
                <p className="text-gray-600 mb-4">Pay the full annual fee upfront and enjoy:</p>
                <ul className="list-disc list-inside text-gray-600">
                  <li>5% discount on total fee</li>
                  <li>Priority course selection</li>
                  <li>Free ADMI merchandise</li>
                </ul>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">Semester Payment</h3>
                <p className="text-gray-600 mb-4">Pay per semester (2 payments/year):</p>
                <ul className="list-disc list-inside text-gray-600">
                  <li>50% at start of each semester</li>
                  <li>No additional charges</li>
                  <li>Flexible payment dates</li>
                </ul>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">Monthly Plan</h3>
                <p className="text-gray-600 mb-4">Spread payments over the year:</p>
                <ul className="list-disc list-inside text-gray-600">
                  <li>10 monthly installments</li>
                  <li>Small admin fee applies</li>
                  <li>Auto-debit available</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              {feeFAQs.map((faq, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-bold mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Join ADMI?
            </h2>
            <p className="text-xl mb-8">
              Invest in your creative future with Kenya's leading digital media institute
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/apply" className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100">
                Apply Now
              </a>
              <a href="/contact" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600">
                Contact Admissions
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}