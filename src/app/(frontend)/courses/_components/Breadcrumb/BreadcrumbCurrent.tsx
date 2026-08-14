interface BreadcrumbCurrentProps {
  label: string
}

export function BreadcrumbCurrent({ label }: BreadcrumbCurrentProps) {
  return <span className="text-gray-600">{label}</span>
}
