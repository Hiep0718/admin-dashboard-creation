import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { RobotCard } from '@/components/RobotCard';
import { EventCard } from '@/components/EventCard';
import { ContactSection } from '@/components/ContactSection';
import exhibition from '@/public/data/exhibition.json';
import robot from '@/public/data/robot.json';

export const metadata = {
  title: 'Triển Lãm Công Nghệ Tương Lai - Robot AI & Đổi Mới',
  description: 'Khám phá tương lai của công nghệ cùng những robot dẫn đường thông minh và các triển lãm tương tác.',
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <HeroSection
        title={exhibition.name}
        description={exhibition.fullDescription}
        location={exhibition.location}
        address={exhibition.address}
      />

      {/* Robot Showcase Section */}
      <section className="py-16 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Gặp Gỡ NOVA-X1
              </span>
            </h2>
            <p className="text-foreground/70 text-sm sm:text-lg">Robot dẫn đường thông minh của chúng tôi</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-1">
              <RobotCard
                name={robot.name}
                model={robot.model}
                status={robot.status}
                batteryLevel={robot.batteryLevel}
                specifications={{
                  height: robot.specifications.height,
                  weight: robot.specifications.weight,
                  processor: robot.specifications.processor,
                  cameras: robot.specifications.cameras,
                }}
              />
            </div>

            <div className="space-y-4 sm:space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-foreground">Các Tính Năng Tiên Tiến</h3>
                <ul className="space-y-2 sm:space-y-3">
                  {robot.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <span className="text-primary font-bold text-lg sm:text-xl mt-0.5 flex-shrink-0">✓</span>
                      <span className="text-sm sm:text-base text-foreground/80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 sm:pt-6 border-t border-border space-y-2 sm:space-y-3">
                <div className="flex justify-between items-center gap-2">
                  <span className="text-sm sm:text-base text-foreground/70 font-medium">Vị Trí Hiện Tại:</span>
                  <span className="text-sm sm:text-base text-primary font-semibold text-right">{robot.currentLocation}</span>
                </div>
                <div className="flex justify-between items-center gap-2">
                  <span className="text-sm sm:text-base text-foreground/70 font-medium">Trạng Thái Hệ Thống:</span>
                  <span className="inline-block bg-green-100 text-green-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                    ✓ Đang Hoạt Động
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-8 sm:py-16 bg-gradient-to-br from-primary/5 to-accent/5 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Sự Kiện Hàng Ngày
              </span>
            </h2>
            <p className="text-foreground/70 text-sm sm:text-lg">Trải nghiệm các hoạt động tương tác và trình diễn</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {exhibition.events.map((event) => (
              <EventCard
                key={event.id}
                title={event.title}
                time={event.time}
                description={event.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-8 sm:py-16 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Những Điểm Nổi Bật
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {exhibition.highlights.map((highlight, idx) => (
              <div key={idx} className="text-center space-y-2 sm:space-y-3">
                <div className="text-3xl sm:text-4xl lg:text-5xl">{highlight.icon}</div>
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-foreground">{highlight.title}</h3>
                <p className="text-xs sm:text-sm lg:text-base text-foreground/70">{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection
        location={exhibition.location}
        address={exhibition.address}
        phone={exhibition.phone}
        email={exhibition.email}
        website={exhibition.website}
        openingHours={exhibition.openingHours}
      />

      {/* Footer */}
      <footer className="py-6 sm:py-8 border-t border-border bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container mx-auto px-4 text-center text-foreground/70 text-xs sm:text-sm">
          <p>&copy; 2024 Tech Summit 2026. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
