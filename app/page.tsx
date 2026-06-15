import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { VirtualExpo } from '@/components/VirtualExpo';
import { BrandHighlights } from '@/components/BrandHighlights';
import { ScheduleSection } from '@/components/ScheduleSection';
import { NewsSection } from '@/components/NewsSection';
import { WhyAttend } from '@/components/WhyAttend';
import { Footer } from '@/components/Footer';

export const metadata = {
  title: 'FUTURE CONSUMER EXPO 2026 | Where Technology Meets Consumer Experience',
  description: 'Khám phá không gian triển lãm ảo với các thương hiệu hàng đầu và công nghệ tương lai trong lĩnh vực tiêu dùng.',
};

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 scroll-smooth">
      <Header />
      
      <main>
        {/* Hero Section - Dark gradient with particles */}
        <HeroSection />

        {/* Virtual Expo Map - Dark glassmorphism */}
        <VirtualExpo />

        {/* Brand Highlights - Light, premium card */}
        <BrandHighlights />

        {/* Schedule - Timeline cards */}
        <ScheduleSection />

        {/* News & Updates */}
        <NewsSection />

        {/* Why Attend - Cards with hover inversion */}
        <WhyAttend />
      </main>

      {/* Footer - Dark gradient with CTA */}
      <Footer />
    </div>
  );
}
