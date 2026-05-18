import type { SVGProps } from 'react'

export function wechatIcon(props: SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M8.5 11.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm7 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM12 2C6.48 2 2 6.03 2 11c0 2.76 1.36 5.22 3.5 6.83V22l4.07-2.24c.77.15 1.57.24 2.43.24 5.52 0 10-4.03 10-9s-4.48-9-10-9z"/>
    </svg>
  )
}

export function xiaohongshuIcon(props: SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-6c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm4 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-2 4c2.21 0 4-1.34 4-3H10c0 1.66 1.79 3 4 3z"/>
    </svg>
  )
}

export function videoIcon(props: SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
    </svg>
  )
}

export function playIcon(props: SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M8 5v14l11-7z"/>
    </svg>
  )
}

export function arrowRightIcon(props: SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  )
}

export function leafIcon(props: SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M6.5 21.5C3 18 2 12.5 4 7c2.5-3 7-3.5 10.5-1s5.5 8 3 13c-1.5 3-4 5.5-7 7"/>
      <path d="M6.5 21.5c1.5-2 3-4 4.5-6s3-4 4.5-6"/>
      <path d="M6.5 21.5C9 19 12 16 14 13"/>
    </svg>
  )
}

export function gardenIcon(props: SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 22V12"/>
      <path d="M12 12c-2-2-6-2-6 2 0 3 2.5 5 6 5"/>
      <path d="M12 12c2-2 6-2 6 2 0 3-2.5 5-6 5"/>
      <path d="M12 2v4"/>
      <path d="M12 6c-2 0-4 1-4 3"/>
      <path d="M12 6c2 0 4 1 4 3"/>
      <circle cx="12" cy="12" r="10"/>
    </svg>
  )
}

export function terraceIcon(props: SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="8" width="18" height="13" rx="1"/>
      <path d="M3 8l9-6 9 6"/>
      <path d="M12 2v6"/>
      <path d="M8 8v4"/>
      <path d="M16 8v4"/>
    </svg>
  )
}
