export function TypographyBlockquote({ children }: { children: string }) {
  return (
    <blockquote className="my-2 border-l-2 pl-5 italic">
      {children}
    </blockquote>
  )
}
