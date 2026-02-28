import { useAppStore } from '../../store/useAppStore'

export function LiveRegion() {
  const announcement = useAppStore((s) => s.announcement)

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
      role="status"
    >
      {announcement}
    </div>
  )
}
