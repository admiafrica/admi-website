import { MainLayout } from '@/layouts/v3/MainLayout';
import { EnquiryForm } from '@/components/forms';
import { Title } from '@/components/ui';

export default function CampaignsLandingPage() {
  return (
    <MainLayout minimizeFooter minimizeHeader footerBgColor="#002A23">
      <div className="h-[100vh] w-full bg-[#002A23] pt-24">
        <div className="mx-auto flex w-full max-w-screen-2xl flex-col px-4 sm:flex-row 2xl:px-0">
          <div className="sm:w-1/2">
            <Title label="Take the first steps" color="#F1FE38" />
            <Title label="to building your" color="white" />
            <Title label="career with ADMI" color="white" />
          </div>
          <div className="sm:w-1/2">
            <div className="mx-auto max-w-xl">
              <EnquiryForm />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
