const colors = require('tailwindcss/colors')

module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        colors: {
            // Tailwind Color Palette
            slate: colors.slate,
            gray: colors.gray,
            zinc: colors.zinc,
            neutral: colors.neutral,
            stone: colors.stone,
            red: colors.red,
            orange: colors.orange,
            amber: colors.amber,
            yellow: colors.yellow,
            lime: colors.lime,
            green: colors.green,
            emerald: colors.emerald,
            teal: colors.teal,
            cyan: colors.cyan,
            sky: colors.sky,
            blue: colors.blue,
            indigo: colors.indigo,
            violet: colors.violet,
            purple: colors.purple,
            fuchsia: colors.fuchsia,
            pink: colors.pink,
            rose: colors.rose,
            // Custom Color Palette
            divider: '#E4E5E7',
            white: '#FFFFFF',
            card: '#F4EDE2',
            // foreground: '#F5F5F7',
            maintext: '#3A4555',
            accent1: '#ECCCC4',
            accent2: '#DADBD5',
            navbarfooter: '#AEBED0',
            background: '#EFEFF0',
        },
        extend: {},
    },
    plugins: [],
}
