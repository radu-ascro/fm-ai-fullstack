import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'

const links = [
  { href: '/', label: 'Home' },
  { href: '/journal', label: 'Journal' },
]

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="relative h-screen w-screen">
      <aside className="absolute left-0 top-0 h-full w-[200px] border-r border-black/10">
        <div>Mood</div>
        <ul>
          {links.map(({ href, label }) => (
            <li key={href} className="px-2 py-6 text-xl">
              <Link href={href}>{label}</Link>
            </li>
          ))}
        </ul>
      </aside>
      <div className="ml-[200px] h-full">
        <header className="h-[60px] border-b border-black/10">
          <div className="flex h-full w-full items-center justify-end px-6">
            <UserButton />
          </div>
        </header>
        <div className="h-[calc(100vh-60px)]">{children}</div>
      </div>
    </div>
  )
}
