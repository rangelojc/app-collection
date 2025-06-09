import { OrderStatus } from "@/api/dto/order";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function OrderStatusBadge(props: { status?: OrderStatus }) {
  return (
    <Badge
      className={cn("!bg-neutral-200 text-black font-medium", {
        "!bg-green-600 text-text-light": props.status === "pending",
        "!bg-blue-500 text-text-light": props.status === "paid",
        "!bg-red-500 text-text-light": props.status === "failed",
      })}
    >
      {props.status}
    </Badge>
  );
}
