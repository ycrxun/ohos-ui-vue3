/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // HarmonyOS主题色
        'ohos-primary': '#007DFF',
        'ohos-success': '#00B42A',
        'ohos-warning': '#FF7D00',
        'ohos-danger': '#F53F3F',
        'ohos-bg-primary': '#FFFFFF',
        'ohos-bg-secondary': '#F2F3F5',
        'ohos-bg-tertiary': '#E5E6EB',
        'ohos-text-primary': '#1D2129',
        'ohos-text-secondary': '#4E5969',
        'ohos-text-tertiary': '#86909C',
      },
      spacing: {
        // 自定义间距单位 (1单位 = 4px)
        'ohos-1': '4px',
        'ohos-2': '8px',
        'ohos-3': '12px',
        'ohos-4': '16px',
        'ohos-5': '20px',
        'ohos-6': '24px',
        'ohos-7': '28px',
        'ohos-8': '32px',
        'ohos-9': '36px',
        'ohos-10': '40px',
      },
      borderRadius: {
        'ohos': '4px',
        'ohos-lg': '8px',
        'ohos-xl': '12px',
      },
      fontSize: {
        'ohos-xs': '12px',
        'ohos-sm': '14px',
        'ohos-base': '16px',
        'ohos-lg': '18px',
        'ohos-xl': '20px',
      },
      boxShadow: {
        'ohos': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'ohos-lg': '0 4px 16px rgba(0, 0, 0, 0.12)',
      }
    },
  },
  plugins: [],
}
    