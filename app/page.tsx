import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { VirtualExpo } from '@/components/VirtualExpo';
import { BrandHighlights } from '@/components/BrandHighlights';
import { ScheduleSection } from '@/components/ScheduleSection';
import { NewsSection } from '@/components/NewsSection';
import { WhyAttend } from '@/components/WhyAttend';
import { Footer } from '@/components/Footer';

export const metadata = {
  title: 'FUTURE CONSUMER EXPO 2026',
  description: 'Where Technology Meets Consumer Experience. Khám phá không gian triển lãm ảo với các thương hiệu hàng đầu.',
};

export default function Home() {
  return (
    <div className="min-h-[100dvh] bg-[#070b14] font-sans antialiased">
      <Header />
      <main>
        <HeroSection />
        <VirtualExpo />
        <BrandHighlights />
        <ScheduleSection />
        <NewsSection />
        <WhyAttend />
      </main>
      <Footer />
    </div>
  );
}
