// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Cập nhật đường dẫn tùy theo cấu trúc dự án
  ],
  theme: {
    extend: {
      colors: {
        'accept': {
          DEFAULT: '#128D02',
          50: '#D6E9D5',
          100: '#C0D4B6',
          200: '#A3B589',
          300: '#7D9B5C',
          400: '#5F7F3F',
          500: '#4F6A2F',
          600: '#3F5521',
          700: '#2F3F15',
          800: '#1F2909',
          900: '#0F1405',
        },
        'custom-red': {
          DEFAULT: '#CF0000',
          50: '#F9DCDC',
          100: '#F5B6B6',
          200: '#F17F7F',
          300: '#EC4848',
          400: '#E81C1C',
          500: '#CF0000',
          600: '#B70000',
          700: '#8F0000',
          800: '#670000',
          900: '#3E0000',
        },
        'custom-green': {
          DEFAULT: '#99B19C',
          50: '#F0F7F4',
          100: '#D6E4D7',
          200: '#A8B89E',
          300: '#7A8C65',
          400: '#4C5F3B',
          500: '#99B19C',
          600: '#7E927A',
          700: '#5D6E58',
          800: '#3C4A35',
          900: '#1A2810',
        },
        'custom-yellow': {
          DEFAULT: '#F59E0B',
          50: '#FFF8E1',
          100: '#FDE7A2',
          200: '#FBD54C',
          300: '#F9C116',
          400: '#F6A700',
          500: '#F59E0B',
          600: '#D78808',
          700: '#B47006',
          800: '#8D5504',
          900: '#6A4202',
        },
        'cream': {
          DEFAULT: '#D7D1C9',
          50: '#F9F7F4',
          100: '#F3EDE6',
          200: '#E6D7CC',
          300: '#D8C1B1',
          400: '#C5AA9B',
          500: '#D7D1C9',
          600: '#B6A99F',
          700: '#8F8276',
          800: '#6B5D54',
          900: '#4A3F3A',
        },
        'dark-rust': {
          DEFAULT: '#672F2F',
          50: '#F4E6E6',
          100: '#E9C7C7',
          200: '#D9A3A3',
          300: '#C87F7F',
          400: '#B75C5C',
          500: '#672F2F',
          600: '#5A2727',
          700: '#4C1E1E',
          800: '#3F1616',
          900: '#331010',
        },
        'creamy-white': {
          DEFAULT: '#FAF5EF',
          50: '#FEFCF8',
          100: '#FDF9F2',
          200: '#F9F2E6',
          300: '#F4E8D4',
          400: '#E9D9C2',
          500: '#FAF5EF',
          600: '#D6D0C3',
          700: '#B4A29B',
          800: '#8C7A6F',
          900: '#5F594A',
        },
      'custom-placeholder': '#672F2F',
      },
      scale: {
        '130': '1.30', // Custom scale value for 130%
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.placeholder-custom': {
          '::placeholder': {
            color: '#672F2F',
            opacity: 1,
          },
        },
      });
    },
  ],
}
