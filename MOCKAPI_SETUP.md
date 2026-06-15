# MockAPI Setup - Cấu Trúc Lịch Sự Kiện

## Cấu Trúc Dữ Liệu Mới (Schedule)

Khi bạn tạo resource `schedules` trên MockAPI, sử dụng các trường sau:

```
id              (Object ID - auto generate)
time            (String - HH:mm format, e.g., "09:00")
end             (String - HH:mm format, e.g., "10:30")
duration        (String - auto-calculated, e.g., "1h 30 phút")
icon            (String - Users, Mic, MapPin, CalendarDays, Utensils, Trophy)
label           (String - tên sự kiện, e.g., "Buổi Nói Chuyện AI")
detail          (String - địa điểm, e.g., "Phòng 101 - Tòa A")
accent          (String - mã hex, e.g., "#3B82F6")
speaker         (String - tên diễn giả, optional/nullable)
createdAt       (auto generate)
```

## Các Icon Sẵn Có

- **Users** - Cho sự kiện liên quan đến đông người
- **Mic** - Cho buổi nói chuyện, thuyết trình
- **MapPin** - Cho sự kiện về địa điểm
- **CalendarDays** - Cho sự kiện định thời gian
- **Utensils** - Cho giờ ăn, tiệc
- **Trophy** - Cho giải thưởng, cuộc thi

## Các Màu Sắc Preset

- **Xanh**: #3B82F6 (blue-500)
- **Tím**: #A855F7 (purple-500)
- **Hồng**: #EC4899 (pink-500)
- **Xanh Lá**: #22C55E (green-500)
- **Cam**: #F97316 (orange-500)
- **Đỏ**: #EF4444 (red-500)

## Tính Năng Tự Động Hóa

### 1. Duration (Thời Lượng)
- **Tự động tính toán** từ `time` (giờ bắt đầu) và `end` (giờ kết thúc)
- Người dùng **không thể nhập tay** - field này read-only
- Ví dụ: Nếu time=09:00 và end=10:30 → duration="1h 30 phút"

### 2. Icon Dropdown
- **Dropdown select** thay vì input text
- Danh sách cố định: [Users, Mic, MapPin, CalendarDays, Utensils, Trophy]
- Mặc định chọn "Users"

### 3. Color Picker
- **Nút bấm màu preset** thay vì input hex
- 6 nút tương ứng 6 màu chủ đạo
- Nút được chọn sẽ có viền đen đậm

### 4. Speaker (Diễn Giả)
- **Tùy chọn** - có thể để trống
- Dùng cho sự kiện không có diễn giả (giờ nghỉ, ăn trưa)

## API Endpoint

```
POST   https://69f458c0bd2396bf5310c8bf.mockapi.io/schedules
GET    https://69f458c0bd2396bf5310c8bf.mockapi.io/schedules
PUT    https://69f458c0bd2396bf5310c8bf.mockapi.io/schedules/:id
DELETE https://69f458c0bd2396bf5310c8bf.mockapi.io/schedules/:id
```

## Ví Dụ JSON Gửi Lên MockAPI

```json
{
  "time": "09:00",
  "end": "10:30",
  "duration": "1h 30 phút",
  "icon": "Mic",
  "label": "Buổi Nói Chuyện về AI",
  "detail": "Phòng 101 - Tòa A",
  "accent": "#A855F7",
  "speaker": "Nguyễn Văn A"
}
```

## Cách Sử Dụng Trên Admin

1. Đăng nhập vào `/admin` (admin/123)
2. Click tab "Lịch Sự Kiện"
3. Click nút "+ Thêm Mới" để thêm sự kiện
4. Điền thông tin:
   - **Tên Sự Kiện**: nhập tên
   - **Giờ Bắt Đầu**: chọn giờ từ time picker
   - **Giờ Kết Thúc**: chọn giờ từ time picker
   - **Thời Lượng**: tự động điền
   - **Biểu Tượng**: chọn từ dropdown
   - **Địa Điểm**: nhập địa điểm
   - **Màu Sắc**: click nút màu
   - **Diễn Giả**: nhập tên (optional)
5. Click "Lưu Thay Đổi"

Dữ liệu sẽ được tự động gửi lên MockAPI với đúng cấu trúc!
