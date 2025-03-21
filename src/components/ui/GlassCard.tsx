
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface GlassCardProps extends React.ComponentProps<typeof Card> {
  title?: string;
  description?: string;
  footer?: React.ReactNode;
  contentClassName?: string;
  headerClassName?: string;
  footerClassName?: string;
}

export function GlassCard({
  title,
  description,
  footer,
  children,
  contentClassName,
  headerClassName,
  footerClassName,
  className,
  ...props
}: GlassCardProps) {
  return (
    <Card 
      className={cn(
        "glass border-none shadow-md transition-all duration-300 hover:shadow-lg",
        className
      )} 
      {...props}
    >
      {(title || description) && (
        <CardHeader className={cn("pb-2", headerClassName)}>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent className={cn("", contentClassName)}>
        {children}
      </CardContent>
      {footer && (
        <CardFooter className={cn("pt-0", footerClassName)}>
          {footer}
        </CardFooter>
      )}
    </Card>
  );
}
