import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/store";
import { User } from "lucide-react";
import { Show } from "../../components/Show";

const AvatarSection = () => {
  const sidebarExpanded = useAppStore((s) => s.sidebarExpanded);
  const toggleSidebar = useAppStore((s) => s.toggleSidebar);

  return (
    <div
      className={cn(
        "flex-row-v-center gap-x-4 w-full self-end px-2 mb-2",
        !sidebarExpanded && "!px-0 flex-row-center"
      )}
    >
      <Avatar
        className={cn(
          "bg-transparent border rounded-full size-10 p-1 transition",
          !sidebarExpanded && "cursor-pointer hover:brightness-125"
        )}
        onClick={sidebarExpanded ? undefined : toggleSidebar}
      >
        <AvatarImage
          src={undefined}
          className="object-contain  text-foreground dark:text-white"
        />
        <AvatarFallback>
          <User className="size-4 text-foreground dark:text-white" />
        </AvatarFallback>
      </Avatar>

      <Show when={sidebarExpanded}>
        {() => (
          <div className="flex-col-v-center">
            <h4 className="text-sm">admin</h4>
          </div>
        )}
      </Show>
    </div>
  );
};

export default AvatarSection;
