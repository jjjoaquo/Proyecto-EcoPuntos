import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90',
        outline: 'border border-border bg-card text-foreground shadow-sm hover:bg-secondary/60',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-accent',
        ghost: 'text-foreground hover:bg-secondary/70',
        destructive: 'bg-destructive text-white shadow-sm hover:bg-destructive/90',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-lg px-3 text-[0.8rem]',
        lg: 'h-12 rounded-xl px-6 text-base',
        icon: 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

type SlotProps = { children: React.ReactNode; className?: string } & Record<string, unknown>

function Slot({ children, className, ...props }: SlotProps) {
  if (!React.isValidElement(children)) return null
  const child = children as React.ReactElement<any>
  return React.cloneElement(child, {
    ...props,
    ...child.props,
    className: cn(className, child.props.className),
  })
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size, className }))
  if (asChild) {
    return <Slot className={classes} {...(props as Record<string, unknown>)} />
  }
  return <button data-slot="button" className={classes} {...props} />
}

export { Button, buttonVariants }
