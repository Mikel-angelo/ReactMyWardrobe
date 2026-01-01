import { LayoutGrid, Table2 } from "lucide-react";
import logo from "@/assets/logo.png";

type Mode = "wardrobe" | "inventory";

type Props = {
  mode: Mode;
  onModeChange: (mode: Mode) => void;
};

export function AppHeader({ mode, onModeChange }: Props) {
  return (
    <header className="border-b border-border bg-card">
      <div className="container py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={logo}
              alt="React My Wardrobe logo"
              className="h-10 w-10 rounded"
            />
            <h1 className="font-mono text-lg font-semibold tracking-tight ">
              React-My-Wardrobe
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex border border-border rounded overflow-hidden">
              <button
                onClick={() => onModeChange("wardrobe")}
                className={`px-3 py-1.5 text-xs font-medium flex items-center gap-1.5 ${
                  mode === "wardrobe"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground hover:text-foreground"
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                Wardrobe
              </button>

              <button
                onClick={() => onModeChange("inventory")}
                className={`px-3 py-1.5 text-xs font-medium flex items-center gap-1.5 border-l border-border ${
                  mode === "inventory"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground hover:text-foreground"
                }`}
              >
                <Table2 className="w-3.5 h-3.5" />
                Inventory
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
