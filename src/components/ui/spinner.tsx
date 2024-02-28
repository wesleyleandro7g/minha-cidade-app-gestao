import { twMerge } from 'tailwind-merge'

interface SpinnerProps {
  className?: string
}

export function Spinner({ className }: SpinnerProps) {
  return (
    <div
      className={twMerge(
        'w-8 h-8 border-2 border-primary border-b-transparent rounded-full animate-spin',
        className
      )}
    />
  )
}
