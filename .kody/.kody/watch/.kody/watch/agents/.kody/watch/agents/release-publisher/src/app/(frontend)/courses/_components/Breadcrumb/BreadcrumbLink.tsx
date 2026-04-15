import Link from 'next/link'

interface BreadcrumbLinkProps {
  href: string
  label: string
}

export function BreadcrumbLink({ href, label }: BreadcrumbLinkProps) {
  return (
    <Link href={href} className="text-blue-600 hover:underline">
      {label}
    </Link>
  )
}
