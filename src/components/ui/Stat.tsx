
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { cva, type VariantProps } from "class-variance-authority";

const statVariants = cva(
  "transition-all duration-200 ease-in-out",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        primary: "bg-primary/10 text-primary border-primary/20",
        success: "bg-green-500/10 text-green-600 border-green-500/20",
        warning: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
        danger: "bg-red-500/10 text-red-600 border-red-500/20",
        info: "bg-blue-500/10 text-blue-600 border-blue-500/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface StatProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof statVariants> {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isUpward: boolean;
  };
  isLoading?: boolean;
}

export function Stat({
  title,
  value,
  icon,
  trend,
  variant,
  isLoading = false,
  className,
  ...props
}: StatProps) {
  return (
    <Card className={cn(statVariants({ variant }), "overflow-hidden border", className)} {...props}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            {isLoading ? (
              <div className="h-7 w-24 animate-pulse rounded-md bg-muted" />
            ) : (
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold">{value}</p>
                {trend && (
                  <span
                    className={cn(
                      "text-xs font-medium",
                      trend.isUpward ? "text-green-500" : "text-red-500"
                    )}
                  >
                    {trend.isUpward ? "↑" : "↓"} {Math.abs(trend.value)}%
                  </span>
                )}
              </div>
            )}
          </div>
          {icon && (
            <div className="rounded-full p-2 bg-background/80">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
