import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  loadingMessage?: string; // Mensaje de carga opcional
}

function Skeleton({
  className,
  loadingMessage = "🚧 Working hard to bring the best... 🚧", // Valor predeterminado para el mensaje
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-muted flex flex-col items-center justify-center",
        className
      )}
      {...props}>
      <span className="text-gray-500">{loadingMessage}</span>
      {/* Puedes añadir más contenido aquí si lo deseas */}
    </div>
  );
}

export { Skeleton };
