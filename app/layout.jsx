export const metadata = {
  title: 'Cloud VPN',
  description: 'Sua privacidade protegida na nuvem',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
