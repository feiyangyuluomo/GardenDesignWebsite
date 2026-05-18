import 'react'

declare module 'react' {
  interface SVGAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // Allow custom SVG icon components to be used as JSX elements
    fill?: string
    stroke?: string
    strokeWidth?: string | number
    strokeLinecap?: string
    strokeLinejoin?: string
    viewBox?: string
    xmlns?: string
    children?: React.ReactNode
  }
}

// Declare the icon functions as React component types
declare function wechatIcon(props: React.SVGProps<SVGSVGElement>): JSX.Element
declare function xiaohongshuIcon(props: React.SVGProps<SVGSVGElement>): JSX.Element
declare function videoIcon(props: React.SVGProps<SVGSVGElement>): JSX.Element
declare function playIcon(props: React.SVGProps<SVGSVGElement>): JSX.Element
declare function arrowRightIcon(props: React.SVGProps<SVGSVGElement>): JSX.Element
declare function leafIcon(props: React.SVGProps<SVGSVGElement>): JSX.Element
declare function gardenIcon(props: React.SVGProps<SVGSVGElement>): JSX.Element
declare function terraceIcon(props: React.SVGProps<SVGSVGElement>): JSX.Element