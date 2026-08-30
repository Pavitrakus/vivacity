export function Mark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden
      fill="none"
    >
      <circle cx="12" cy="12" r="2.1" fill="currentColor" />
      <ellipse
        cx="12"
        cy="12"
        rx="9"
        ry="3.6"
        stroke="currentColor"
        strokeWidth="1.2"
        transform="rotate(-24 12 12)"
      />
      <circle cx="20.1" cy="8.4" r="1.15" fill="currentColor" />
    </svg>
  );
}
