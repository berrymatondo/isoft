"use client";

import { cn } from "@/lib/utils";
import {
  LayoutGrid,
  Users,
  Home,
  Shield,
  FileText,
  UserPlus,
  Edit,
  UserPlus2,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { authClient, signOut, useSession } from "@/lib/auth-client";

const menuItems = [
  {
    title: "Pages",
    items: [
      {
        name: "Dashboard",
        href: "/dashboard",
        icon: LayoutGrid,
        color: "text-primary",
      },
      {
        name: "Clients",
        href: "/clients",
        icon: Users,
        color: "text-secondary",
      },
      {
        name: "Immobiliers",
        href: "/immobiliers",
        icon: Home,
        color: "text-chart-3",
      },
      {
        name: "Assurances",
        href: "/assurances",
        icon: Shield,
        color: "text-chart-5",
      },
      {
        name: "Actions",
        href: "/actions",
        icon: FileText,
        color: "text-chart-2",
      },
    ],
  },
  {
    title: "Administration",
    items: [
      {
        name: "Nouvel utilisateur",
        href: "/admin/new-user",
        icon: UserPlus,
        color: "text-foreground",
      },
      {
        name: "Editer un utilisateur",
        href: "/admin/edit-user",
        icon: Edit,
        color: "text-primary",
      },
      {
        name: "Nouveau client",
        href: "/clients/new",
        icon: UserPlus2,
        color: "text-secondary",
      },
    ],
  },
];

export function Sidebar() {
  const router = useRouter();
  const session = useSession();
  const user = session.data?.user;

  //if (user) console.log("USER", user);

  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [usr, setUsr] = useState<any>(user?.name);

  useEffect(() => {
    const stored = localStorage.getItem("sidebar-collapsed");
    if (stored) {
      setIsCollapsed(JSON.parse(stored));
    }
  }, []);

  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem("sidebar-collapsed", JSON.stringify(newState));
  };

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/auth/signin"); // redirect to login page
          window.location.reload();
          router.refresh();
        },
      },
    });
  };

  return (
    <aside
      className={cn(
        "relative flex flex-col border-r border-border bg-sidebar transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        className="absolute -right-3 top-6 z-10 h-6 w-6 rounded-full border border-border bg-sidebar hover:bg-sidebar-accent"
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </Button>

      {/* User Profile */}
      <div className="border-b border-sidebar-border px-4 py-3">
        <div className="flex items-center gap-3 ">
          <Avatar className="h-10 w-10 shrink-0">
            <AvatarImage src="/placeholder.svg?height=40&width=40" />
            <AvatarFallback className="bg-muted text-foreground">
              {user?.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-medium text-sidebar-foreground">
                Welcome, {user?.name}
              </span>
              <span className="text-xs text-muted-foreground">
                Administrateur
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        {menuItems.map((section) => (
          <div key={section.title} className="mb-6">
            {!isCollapsed && (
              <h3 className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {section.title}
              </h3>
            )}
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent/50",
                      isCollapsed && "justify-center"
                    )}
                    title={isCollapsed ? item.name : undefined}
                  >
                    <Icon
                      className={cn("h-5 w-5 shrink-0", isActive && item.color)}
                    />
                    {!isCollapsed && item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Logout */}
      <div className="border-t border-sidebar-border p-4">
        <button
          className={cn(
            "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-destructive transition-colors hover:bg-sidebar-accent",
            isCollapsed && "justify-center"
          )}
          title={isCollapsed ? "Se Déconnecter" : undefined}
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 shrink-0" />
          {!isCollapsed && "Se Déconnecter"}
        </button>
      </div>
    </aside>
  );
}
