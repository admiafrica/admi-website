'use client'

import React, { Fragment, createContext, useContext, useMemo, useState } from 'react'

type AnyProps = Record<string, any>

const cx = (...values: Array<string | undefined | false | null>) => values.filter(Boolean).join(' ')

const sizeToClass = (size?: string | number) => {
  if (typeof size === 'number') return ''
  switch (size) {
    case 'xs':
      return 'text-xs'
    case 'sm':
      return 'text-sm'
    case 'md':
      return 'text-base'
    case 'lg':
      return 'text-lg'
    case 'xl':
      return 'text-xl'
    default:
      return ''
  }
}

const spacingToClass = (value?: string | number, type: 'gap' | 'p' | 'm' = 'gap') => {
  if (typeof value === 'number') {
    const scaled = Math.max(0, Math.min(12, Math.round(value / 4)))
    return `${type}-${scaled}`
  }
  switch (value) {
    case 'xs':
      return `${type}-1`
    case 'sm':
      return `${type}-2`
    case 'md':
      return `${type}-4`
    case 'lg':
      return `${type}-6`
    case 'xl':
      return `${type}-8`
    default:
      return ''
  }
}

const extractStyle = (style: any): React.CSSProperties | undefined => {
  if (!style) return undefined
  return typeof style === 'function' ? style({}) : style
}

const getWidthClass = (span: any) => {
  const value = typeof span === 'object' ? span?.md ?? span?.base ?? 12 : span
  if (!value || value === 12) return 'w-full'
  const map: Record<number, string> = {
    1: 'w-1/12',
    2: 'w-2/12',
    3: 'w-3/12',
    4: 'w-4/12',
    5: 'w-5/12',
    6: 'w-1/2',
    7: 'w-7/12',
    8: 'w-8/12',
    9: 'w-9/12',
    10: 'w-10/12',
    11: 'w-11/12',
  }
  return map[value] ?? 'w-full'
}

const defaultComponent = (Tag: keyof JSX.IntrinsicElements, baseClass = '') => {
  return React.forwardRef<any, AnyProps>(function Component(
    { className, style, children, component, ...rest },
    ref,
  ) {
    const Element = (component || Tag) as any
    return (
      <Element ref={ref} className={cx(baseClass, className)} style={extractStyle(style)} {...rest}>
        {children}
      </Element>
    )
  })
}

export const createTheme = (theme: AnyProps) => theme
export const ColorSchemeScript = () => null
export type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  c?: string
  fw?: string | number
  ta?: React.CSSProperties['textAlign']
  fz?: string | number
}

export const MantineProvider = ({ children }: AnyProps) => <>{children}</>

export const Box = defaultComponent('div')
export const Paper = defaultComponent('div', 'rounded-xl bg-white')
export const Stack = ({ className, gap, children, ...rest }: AnyProps) => (
  <div className={cx('flex flex-col', spacingToClass(gap, 'gap'), className)} {...rest}>
    {children}
  </div>
)
export const Group = ({ className, gap, justify, align, children, ...rest }: AnyProps) => (
  <div
    className={cx(
      'flex flex-wrap',
      spacingToClass(gap, 'gap'),
      justify === 'space-between' ? 'justify-between' : justify === 'center' ? 'justify-center' : '',
      align === 'center' ? 'items-center' : '',
      className,
    )}
    {...rest}
  >
    {children}
  </div>
)
export const Container = ({ className, size, children, ...rest }: AnyProps) => {
  const max =
    size === 'xs'
      ? 'max-w-xl'
      : size === 'sm'
        ? 'max-w-2xl'
        : size === 'md'
          ? 'max-w-4xl'
          : size === 'lg'
            ? 'max-w-5xl'
            : size === 'xl'
              ? 'max-w-6xl'
              : 'max-w-7xl'
  return (
    <div className={cx('mx-auto w-full px-4', max, className)} {...rest}>
      {children}
    </div>
  )
}

export const Grid = ({ className, gutter, children, ...rest }: AnyProps) => (
  <div className={cx('flex flex-wrap', spacingToClass(gutter, 'gap'), className)} {...rest}>
    {children}
  </div>
)
Grid.Col = ({ className, span, children, ...rest }: AnyProps) => (
  <div className={cx(getWidthClass(span), className)} {...rest}>
    {children}
  </div>
)

export const SimpleGrid = ({ className, cols = 1, children, ...rest }: AnyProps) => (
  <div
    className={cx(
      'grid',
      cols === 2 ? 'grid-cols-1 md:grid-cols-2' : cols === 3 ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1',
      className,
    )}
    {...rest}
  >
    {children}
  </div>
)

export const Card = ({ className, children, ...rest }: AnyProps) => (
  <div className={cx('rounded-xl border border-gray-200 bg-white shadow-sm', className)} {...rest}>
    {children}
  </div>
)
Card.Section = ({ className, children, ...rest }: AnyProps) => (
  <div className={cx(className)} {...rest}>
    {children}
  </div>
)

export const Text = ({ className, size, component, children, ...rest }: AnyProps) => {
  const Tag = (component || 'p') as any
  return (
    <Tag className={cx('text-gray-700', sizeToClass(size), className)} {...rest}>
      {children}
    </Tag>
  )
}
export const Title = ({ className, order = 2, children, ...rest }: AnyProps) => {
  const Tag = (`h${Math.min(6, Math.max(1, order))}` as unknown) as any
  const size = order === 1 ? 'text-4xl' : order === 2 ? 'text-3xl' : order === 3 ? 'text-2xl' : 'text-xl'
  return (
    <Tag className={cx('font-semibold text-gray-900', size, className)} {...rest}>
      {children}
    </Tag>
  )
}
export const Anchor = ({ className, children, c, fw, ta, fz, style, ...rest }: AnyProps) => (
  <a className={cx('text-blue-700 hover:underline', className)} style={{ color: c, fontWeight: fw, textAlign: ta, fontSize: fz, ...(style || {}) }} {...rest}>
    {children}
  </a>
)

export const Button = React.forwardRef<any, AnyProps>(function Button(
  { className, variant, color, leftSection, rightSection, children, component, ...rest },
  ref,
) {
  const Element = (component || 'button') as any
  const variantClass =
    variant === 'subtle'
      ? 'bg-transparent text-gray-900'
      : variant === 'light'
        ? 'bg-gray-100 text-gray-900'
        : variant === 'outline'
          ? 'border border-gray-400 bg-white text-gray-900'
          : color === 'red'
            ? 'bg-red-600 text-white'
            : 'bg-brand-orange text-white'
  return (
    <Element
      ref={ref}
      className={cx('inline-flex items-center gap-2 rounded-lg px-4 py-2 font-medium transition', variantClass, className)}
      {...rest}
    >
      {leftSection}
      {children}
      {rightSection}
    </Element>
  )
})

export const ActionIcon = ({ className, children, ...rest }: AnyProps) => (
  <button className={cx('inline-flex h-10 w-10 items-center justify-center rounded-full', className)} {...rest}>
    {children}
  </button>
)

export const Badge = ({ className, children, variant, ...rest }: AnyProps) => (
  <span
    className={cx(
      'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide',
      variant === 'light' ? 'bg-gray-100 text-gray-800' : 'bg-gray-900 text-white',
      className,
    )}
    {...rest}
  >
    {children}
  </span>
)

export const Pill = ({ className, children, ...rest }: AnyProps) => (
  <span className={cx('inline-flex items-center rounded-full border border-gray-300 px-3 py-1 text-xs', className)} {...rest}>
    {children}
  </span>
)

export const Alert = ({ className, title, children, ...rest }: AnyProps) => (
  <div className={cx('rounded-lg border border-amber-300 bg-amber-50 p-4 text-amber-900', className)} {...rest}>
    {title ? <div className="mb-1 font-semibold">{title}</div> : null}
    {children}
  </div>
)

export const Divider = ({ className, ...rest }: AnyProps) => <hr className={cx('border-gray-200', className)} {...rest} />

export const Avatar = ({ className, src, alt, children, ...rest }: AnyProps) =>
  src ? (
    <img className={cx('h-10 w-10 rounded-full object-cover', className)} src={src} alt={alt || ''} {...rest} />
  ) : (
    <div className={cx('flex h-10 w-10 items-center justify-center rounded-full bg-gray-200', className)} {...rest}>
      {children}
    </div>
  )

export const Image = ({ className, src, alt, ...rest }: AnyProps) => (
  <img className={cx('h-auto w-full', className)} src={src} alt={alt || ''} {...rest} />
)

export const ThemeIcon = ({ className, children, ...rest }: AnyProps) => (
  <span className={cx('inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-100', className)} {...rest}>
    {children}
  </span>
)

export const List = ({ className, children, ...rest }: AnyProps) => (
  <ul className={cx('list-disc pl-5', className)} {...rest}>
    {children}
  </ul>
)
List.Item = ({ className, children, ...rest }: AnyProps) => (
  <li className={cx(className)} {...rest}>
    {children}
  </li>
)

export const Loader = ({ className }: AnyProps) => <div className={cx('h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-gray-700', className)} />

export const Skeleton = ({ className, h, w, ...rest }: AnyProps) => (
  <div
    className={cx('animate-pulse rounded-md bg-gray-200', className)}
    style={{ height: h, width: w, ...(rest.style || {}) }}
    {...rest}
  />
)

export const ScrollArea = ({ className, children, ...rest }: AnyProps) => (
  <div className={cx('overflow-auto', className)} {...rest}>
    {children}
  </div>
)

export const Collapse = ({ in: opened, children }: AnyProps) => (opened ? <>{children}</> : null)

const AccordionContext = createContext<{ open: string | null; setOpen: (v: string | null) => void }>({
  open: null,
  setOpen: () => {},
})
const AccordionItemContext = createContext<{ value: string | null }>({ value: null })

export const Accordion = ({ children, defaultValue }: AnyProps) => {
  const [open, setOpen] = useState<string | null>(defaultValue ?? null)
  const value = useMemo(() => ({ open, setOpen }), [open])
  return <AccordionContext.Provider value={value}>{children}</AccordionContext.Provider>
}
Accordion.Item = ({ children, value }: AnyProps) => (
  <AccordionItemContext.Provider value={{ value }}>
    <div className="mb-2 rounded-lg border border-gray-200">{children}</div>
  </AccordionItemContext.Provider>
)
Accordion.Control = ({ children, className }: AnyProps) => {
  const { open, setOpen } = useContext(AccordionContext)
  const { value } = useContext(AccordionItemContext)
  const active = open === value
  return (
    <button
      type="button"
      onClick={() => setOpen(active ? null : value)}
      className={cx('w-full px-4 py-3 text-left font-medium', className)}
    >
      {children}
    </button>
  )
}
Accordion.Panel = ({ children, className }: AnyProps) => {
  const { open } = useContext(AccordionContext)
  const { value } = useContext(AccordionItemContext)
  if (open !== value) return null
  return <div className={cx('border-t border-gray-200 px-4 py-3', className)}>{children}</div>
}

const TabsContext = createContext<{ value: string | null; setValue: (v: string) => void }>({
  value: null,
  setValue: () => {},
})

export const Tabs = ({ children, defaultValue, value: controlledValue, onChange }: AnyProps) => {
  const [uncontrolled, setUncontrolled] = useState<string | null>(defaultValue ?? null)
  const value = controlledValue ?? uncontrolled
  const setValue = (v: string) => {
    if (onChange) onChange(v)
    if (controlledValue === undefined) setUncontrolled(v)
  }
  return <TabsContext.Provider value={{ value, setValue }}>{children}</TabsContext.Provider>
}
Tabs.List = ({ className, children, ...rest }: AnyProps) => (
  <div className={cx('mb-4 flex gap-2 border-b border-gray-200', className)} {...rest}>
    {children}
  </div>
)
Tabs.Tab = ({ className, children, value, ...rest }: AnyProps) => {
  const ctx = useContext(TabsContext)
  const active = ctx.value === value
  return (
    <button
      type="button"
      onClick={() => ctx.setValue(value)}
      className={cx('rounded-t-md px-4 py-2', active ? 'border-b-2 border-gray-900 font-semibold' : 'text-gray-500', className)}
      {...rest}
    >
      {children}
    </button>
  )
}
Tabs.Panel = ({ className, children, value, ...rest }: AnyProps) => {
  const ctx = useContext(TabsContext)
  if (ctx.value !== value) return null
  return (
    <div className={className} {...rest}>
      {children}
    </div>
  )
}

export const Menu = ({ children }: AnyProps) => <>{children}</>
Menu.Target = ({ children }: AnyProps) => <>{children}</>
Menu.Dropdown = ({ className, children, ...rest }: AnyProps) => (
  <div className={cx('rounded-lg border border-gray-200 bg-white p-1 shadow-md', className)} {...rest}>
    {children}
  </div>
)
Menu.Item = ({ className, children, ...rest }: AnyProps) => (
  <button type="button" className={cx('block w-full rounded px-3 py-2 text-left hover:bg-gray-100', className)} {...rest}>
    {children}
  </button>
)
Menu.Label = ({ className, children, ...rest }: AnyProps) => (
  <div className={cx('px-3 py-1 text-xs font-semibold uppercase text-gray-500', className)} {...rest}>
    {children}
  </div>
)
Menu.Divider = ({ className, ...rest }: AnyProps) => <hr className={cx('my-1 border-gray-200', className)} {...rest} />

export const AppShell = ({ children }: AnyProps) => <div className="min-h-screen">{children}</div>
AppShell.Header = ({ className, children, ...rest }: AnyProps) => (
  <header className={cx(className)} {...rest}>
    {children}
  </header>
)
AppShell.Navbar = ({ className, children, ...rest }: AnyProps) => (
  <aside className={cx(className)} {...rest}>
    {children}
  </aside>
)
AppShell.Main = ({ className, children, ...rest }: AnyProps) => (
  <main className={cx(className)} {...rest}>
    {children}
  </main>
)

export const Affix = ({ children }: AnyProps) => <>{children}</>

export const Select = ({ className, data = [], value, defaultValue, onChange, ...rest }: AnyProps) => (
  <select
    className={cx('h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-gray-900', className)}
    value={value}
    defaultValue={defaultValue}
    onChange={(e) => onChange?.(e.target.value)}
    {...rest}
  >
    {(data || []).map((item: any) => {
      const option = typeof item === 'string' ? { value: item, label: item } : item
      return (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      )
    })}
  </select>
)

export const Modal = ({ opened = true, children, className, ...rest }: AnyProps) =>
  opened ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className={cx('w-full max-w-3xl rounded-xl bg-white p-4 shadow-xl', className)} {...rest}>
        {children}
      </div>
    </div>
  ) : null

export const Center = ({ className, children, ...rest }: AnyProps) => (
  <div className={cx('flex items-center justify-center', className)} {...rest}>
    {children}
  </div>
)

export const AspectRatio = ({ ratio = 16 / 9, className, children, ...rest }: AnyProps) => (
  <div className={cx('relative w-full', className)} style={{ paddingBottom: `${100 / ratio}%` }} {...rest}>
    <div className="absolute inset-0">{children}</div>
  </div>
)

export const Progress = ({ className, value = 0, ...rest }: AnyProps) => (
  <div className={cx('h-2 w-full overflow-hidden rounded-full bg-gray-200', className)} {...rest}>
    <div className="h-full bg-brand-orange" style={{ width: `${Math.max(0, Math.min(100, Number(value) || 0))}%` }} />
  </div>
)

export const Breadcrumbs = ({ className, children, separator = '/', ...rest }: AnyProps) => {
  const nodes = React.Children.toArray(children)
  return (
    <nav className={cx('flex flex-wrap items-center gap-2 text-sm text-gray-600', className)} {...rest}>
      {nodes.map((node, index) => (
        <Fragment key={index}>
          {index > 0 ? <span>{separator}</span> : null}
          {node}
        </Fragment>
      ))}
    </nav>
  )
}

export const TextInput = React.forwardRef<any, AnyProps>(function TextInput({ className, ...rest }, ref) {
  return <input ref={ref} className={cx('h-11 w-full rounded-lg border border-gray-300 bg-[#f8fafc] px-3', className)} {...rest} />
})

export const Textarea = React.forwardRef<any, AnyProps>(function Textarea({ className, ...rest }, ref) {
  return <textarea ref={ref} className={cx('w-full rounded-lg border border-gray-300 bg-[#f8fafc] px-3 py-2', className)} {...rest} />
})

export const Autocomplete = TextInput

export const Rating = ({ className, value = 0 }: AnyProps) => (
  <div className={cx('inline-flex gap-1 text-amber-400', className)}>{Array.from({ length: 5 }).map((_, i) => <span key={i}>{i < value ? '★' : '☆'}</span>)}</div>
)

export const Slider = ({ className, value, min = 0, max = 100, onChange, ...rest }: AnyProps) => (
  <input
    type="range"
    className={cx('w-full', className)}
    value={value}
    min={min}
    max={max}
    onChange={(e) => onChange?.(Number(e.target.value))}
    {...rest}
  />
)

export const NumberFormatter = ({ value, prefix = '', suffix = '', thousandSeparator = ',', decimalScale }: AnyProps) => {
  const number = typeof value === 'string' ? Number(value) : value
  if (Number.isNaN(number)) return <>{value}</>
  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimalScale,
    maximumFractionDigits: decimalScale,
    useGrouping: Boolean(thousandSeparator),
  }).format(number)
  return (
    <>
      {prefix}
      {formatted}
      {suffix}
    </>
  )
}

export const Table = ({ className, children, ...rest }: AnyProps) => (
  <table className={cx('w-full border-collapse', className)} {...rest}>
    {children}
  </table>
)
Table.Thead = defaultComponent('thead')
Table.Tbody = defaultComponent('tbody')
Table.Tr = defaultComponent('tr')
Table.Th = defaultComponent('th', 'border border-gray-200 p-3 text-left')
Table.Td = defaultComponent('td', 'border border-gray-200 p-3 align-top')
Table.ScrollContainer = ({ className, children, ...rest }: AnyProps) => (
  <div className={cx('w-full overflow-auto', className)} {...rest}>
    {children}
  </div>
)

export const Code = ({ className, children, ...rest }: AnyProps) => (
  <code className={cx('rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm', className)} {...rest}>
    {children}
  </code>
)

export default {
  createTheme,
}
