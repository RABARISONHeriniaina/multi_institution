// In your tailwind.config.js
module.exports = {
  // ... your existing config
  plugins: [
    // ... your existing plugins
    function({ addBase, theme }) {
      addBase({
        // Fix for Lucide React icons
        'svg[data-lucide]': {
          color: 'hsl(var(--foreground))',
        },
        // Ensure buttons have proper color inheritance
        'button, [role="button"]': {
          color: 'hsl(var(--foreground))',
        },
      })
    }
  ],
}