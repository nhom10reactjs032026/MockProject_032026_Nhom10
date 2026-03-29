import { ActOverviewHeader } from '../components/overview/ActOverviewHeader';
import { ActSummary } from '../components/overview/ActSummary';
import { LocationSnapshot } from '../components/overview/LocationSnapshot';
import { ComplianceSnapshot } from '../components/overview/ComplianceSnapshot';
import { QuickActions } from '../components/overview/QuickActions';
import { DocumentPreview } from '../components/overview/DocumentPreview';

export const ActOverviewPage = () => {
  return (
    <div className="animate-in fade-in duration-500 bg-[#f8fbff]/30 min-h-screen">
      <div className="max-w-[1400px] mx-auto py-8">
        <ActOverviewHeader />

        <div className="px-4">
           {/* Two-column layout matching the design */}
           <div className="flex flex-col lg:flex-row gap-6">
              {/* Left Column (Wider) */}
              <div className="flex-[3] lg:flex-none lg:w-[65%] xl:w-[70%]">
                 <ActSummary />
                 <LocationSnapshot />
                 <ComplianceSnapshot />
              </div>

              {/* Right Column (Narrower) */}
              <div className="flex-[2] lg:flex-none lg:w-[35%] xl:w-[30%]">
                 <QuickActions />
                 <DocumentPreview />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
