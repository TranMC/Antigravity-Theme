# Kanagawa Theme for Google Antigravity 2.x

[🇻🇳 Tiếng Việt](#tiếng-việt) | [🇺🇸 English](#english)

### Preview / Xem trước

![Kanagawa Theme Home & Aqua-to-Gold Composer](docs/screenshots/kanagawa-home.png)
*Kanagawa Wave default wallpaper & aqua-to-gold gradient composer / Hình nền Kanagawa mặc định & khung nhập gradient xanh ↔ vàng.*

| Custom Wallpaper + Review Panel | Custom Avatars + Diff View |
| :---: | :---: |
| ![Custom Wallpaper & Review Panel](docs/screenshots/custom-wallpaper-review.png) | ![Custom Avatars & Right Diff Panel](docs/screenshots/custom-avatars-diff.png) |
| *Custom wallpaper, 3-column translucent layout & file review* | *Custom user/agent avatars & translucent red/green code diff* |

---

<a name="tiếng-việt"></a>
## 🇻🇳 Tiếng Việt

Theme **Kanagawa Wave (Tối)** & **Kanagawa Lotus (Sáng)** cho **Google Antigravity 2.x** trên Windows — nền ảnh sắc nét không blur, các khung panel bo tròn trong suốt vừa đủ, màn hình loading phong cách Kanagawa, khung chat gradient xanh ↔ vàng và bộ công cụ cho phép người dùng tự đổi **hình nền**, **màu theme / preset** và **cả 2 avatar** chỉ trong vài giây.

### Yêu cầu

- **Windows** đã cài **Google Antigravity 2.x** (`%LOCALAPPDATA%\Programs\Antigravity`)
- **Node.js** (để script chạy `@electron/asar` giải nén/đóng gói `app.asar` và xử lý ảnh/màu)

### Cài đặt

1. Tải repo về máy:
   ```powershell
   git clone https://github.com/Tuna285/Antigravity-Theme.git
   cd Antigravity-Theme
   ```
2. Đóng hoàn toàn Antigravity (hoặc mở **PowerShell ở ngoài**, không chạy trong terminal bên trong Antigravity, rồi dùng cờ `-KillRunning`):
   ```powershell
   .\install.ps1 -KillRunning
   ```
   *(Hoặc đóng Antigravity hoàn toàn rồi click đúp `install.bat`.)*
3. Mở lại Antigravity để dùng theme và màn hình loading mới.

> **Lưu ý:** Khi Antigravity tự cập nhật phiên bản mới, file `app.asar` sẽ trở về bản gốc. Bạn chỉ cần chạy lại `.\install.ps1 -KillRunning` là theme hoạt động lại bình thường.

### Tùy biến cực nhanh (Menu chọn số 1-9, Preset, Wallpaper, Avatar, Font & Profile)

Không cần mở hay tự sửa file `kanagawa.css` nặng hay tự chuyển ảnh sang Base64.

- **Cách 1 — Menu tương tác 1 chạm (Khuyên dùng):** Click đúp **`customize-kanagawa.bat`** hoặc chạy:
  ```powershell
  .\customize-kanagawa.ps1 -Menu
  ```
  > **Chỉ cần bấm 1 phím số rồi Enter:**
  > - Bấm `[1]` đến `[9]` để đổi ngay các Preset màu:
  >   `[1]` Kanagawa Wave | `[2]` Kanagawa Dragon | `[3]` Sakura Dusk | `[4]` Midnight Aqua | `[5]` Catppuccin Mocha | `[6]` Tokyo Night | `[7]` Nord | `[8]` Gruvbox Dark | `[9]` Dracula
  > - Bấm `[10]` - `[12]` để chọn file Wallpaper hoặc 2 Avatar qua hộp thoại Windows.
  > - Bấm `[14]` để chọn nhanh Font (`JetBrains Mono`, `Fira Code`, `Cascadia Code`...).
  > - Bấm `[15]` để chỉnh độ mờ Glassmorphism (0.6 - 0.95).
  > - Bấm `[16]` - `[19]` để quản lý Profile (Lưu / Tải / Xem / Xóa profile trọn gói).

- **Cách 2 — Dùng tham số dòng lệnh / Preset màu có sẵn:**
  ```powershell
  # Đổi nhanh preset màu:
  .\customize-kanagawa.ps1 -Preset tokyo-night
  # Các preset: kanagawa-wave | kanagawa-dragon | sakura-dusk | midnight-aqua | catppuccin-mocha | tokyo-night | nord | gruvbox-dark | dracula

  # Nạp hoặc lưu Profile:
  .\customize-kanagawa.ps1 -SaveProfile "work-setup"
  .\customize-kanagawa.ps1 -Profile "work-setup"
  .\customize-kanagawa.ps1 -ListProfiles

  # Tùy biến Font & Độ mờ Glassmorphism:
  .\customize-kanagawa.ps1 -FontFamily "JetBrains Mono" -UiOpacity 0.85

  # Truyền thẳng đường dẫn ảnh (hỗ trợ png, jpg, jpeg, webp, svg, gif, bmp)
  .\customize-kanagawa.ps1 -Wallpaper "D:\Pictures\bg.jpg" -UserAvatar "D:\Pictures\me.png" -AgentAvatar "D:\Pictures\bot.png"

  # Tắt hình nền (dùng nền màu trơn theo preset)
  .\customize-kanagawa.ps1 -NoWallpaper
  ```
- **Cách 3 — Sửa file cấu hình:** Chỉnh mã màu hex, font, độ mờ hoặc chữ trên màn hình loading trong `kanagawa-theme/kanagawa.config.json`, sau đó chạy:
  ```powershell
  .\customize-kanagawa.ps1
  ```

Mỗi lần tùy biến sẽ tự cập nhật `kanagawa-theme/kanagawa.css`, `kanagawa-theme/loading.html`, đồng bộ sang Antigravity và tự reload giao diện ngay lập tức (**không cần đóng gói lại `app.asar`**).

### Kiểm thử tự động (CI / Testing)

Dự án tích hợp bộ kiểm thử tự động native (Node.js test runner & GitHub Actions CI):
```powershell
npm test
# hoặc
bun test
```

### Reload & Gỡ cài đặt

- **Đồng bộ & reload thủ công:** `.\switch-theme.ps1` (hoặc click đúp `switch-theme.bat`)
- **Gỡ theme & khôi phục Antigravity gốc:**
  ```powershell
  .\uninstall.ps1 -KillRunning
  ```

---

<a name="english"></a>
## 🇺🇸 English

A crisp, unblurred **Kanagawa Wave (Dark)** & **Kanagawa Lotus (Light)** theme for **Google Antigravity 2.x** on Windows — featuring rounded translucent panes, a Kanagawa wave startup loading screen, aqua-to-gold composer gradient, and a built-in customizer to swap your **wallpaper**, **color palette / presets**, and **both chat avatars** in seconds.

### Requirements

- **Windows** with **Google Antigravity 2.x** installed (`%LOCALAPPDATA%\Programs\Antigravity`)
- **Node.js** (used for `@electron/asar` extraction/repacking and image/color customization)

### Installation

1. Clone this repository:
   ```powershell
   git clone https://github.com/Tuna285/Antigravity-Theme.git
   cd Antigravity-Theme
   ```
2. Close Antigravity completely (or run from an **external PowerShell** window with `-KillRunning`):
   ```powershell
   .\install.ps1 -KillRunning
   ```
   *(Or close Antigravity completely and double-click `install.bat`.)*
3. Launch Antigravity.

> **Note:** Antigravity auto-updates overwrite `app.asar` with the stock bundle. Simply re-run `.\install.ps1 -KillRunning` after an update to restore the theme.

### Quick Customization (1-9 Quick Presets, Profiles, Fonts & Opacity)

No need to manually edit `kanagawa.css` or Base64-encode images.

- **Option A — Interactive 1-Key Menu (Recommended):** Double-click **`customize-kanagawa.bat`** or run:
  ```powershell
  .\customize-kanagawa.ps1 -Menu
  ```
  > **Select with a single number key:**
  > - Press `[1]` to `[9]` to switch presets immediately:
  >   `[1]` Kanagawa Wave | `[2]` Kanagawa Dragon | `[3]` Sakura Dusk | `[4]` Midnight Aqua | `[5]` Catppuccin Mocha | `[6]` Tokyo Night | `[7]` Nord | `[8]` Gruvbox Dark | `[9]` Dracula
  > - Press `[10]` - `[12]` to pick Wallpaper or Avatar files via Windows Explorer.
  > - Press `[14]` to choose popular fonts (`JetBrains Mono`, `Fira Code`, `Cascadia Code`...).
  > - Press `[15]` to adjust Glassmorphism UI opacity (0.6 - 0.95).
  > - Press `[16]` - `[19]` to manage Profiles (Save, Load, List, Delete).

- **Option B — CLI Presets & Profiles:**
  ```powershell
  # Switch presets via CLI:
  .\customize-kanagawa.ps1 -Preset tokyo-night
  # Presets: kanagawa-wave | kanagawa-dragon | sakura-dusk | midnight-aqua | catppuccin-mocha | tokyo-night | nord | gruvbox-dark | dracula

  # Save or Load Profiles:
  .\customize-kanagawa.ps1 -SaveProfile "work-setup"
  .\customize-kanagawa.ps1 -Profile "work-setup"
  .\customize-kanagawa.ps1 -ListProfiles

  # Set custom font & panel opacity:
  .\customize-kanagawa.ps1 -FontFamily "JetBrains Mono" -UiOpacity 0.85

  # Pass image paths directly (png, jpg, jpeg, webp, svg, gif, bmp)
  .\customize-kanagawa.ps1 -Wallpaper "D:\Pictures\bg.jpg" -UserAvatar "D:\Pictures\me.png" -AgentAvatar "D:\Pictures\bot.png"

  # Disable wallpaper (use solid preset background color)
  .\customize-kanagawa.ps1 -NoWallpaper
  ```
- **Option C — Edit Config File:** Edit hex colors, font, opacity, image paths, or loading screen text in `kanagawa-theme/kanagawa.config.json`, then run:
  ```powershell
  .\customize-kanagawa.ps1
  ```

Every change regenerates `kanagawa-theme/kanagawa.css` & `kanagawa-theme/loading.html`, syncs to Antigravity, and hot-reloads the window without restarting (**no `app.asar` repack needed after initial install**).

### Automated Testing (CI / Tests)

Run native Node.js / Bun tests locally:
```powershell
npm test
# or
bun test
```

### Reload & Uninstall

- **Manual sync & hot-reload:** `.\switch-theme.ps1` (or double-click `switch-theme.bat`)
- **Uninstall & restore stock Antigravity:**
  ```powershell
  .\uninstall.ps1 -KillRunning
  ```

---

## Credits / Nguồn tham khảo

- Theme injector, Chrome DevTools hot-reload workflow, and `app.asar` patcher architecture derived from [AreSet01/antigravity-theme](https://github.com/AreSet01/antigravity-theme) (MIT License).
- Kanagawa color palette inspired by [rebelot/kanagawa.nvim](https://github.com/rebelot/kanagawa.nvim).
