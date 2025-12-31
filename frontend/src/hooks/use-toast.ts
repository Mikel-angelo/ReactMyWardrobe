type ToastOptions = {
  title: string;
  description?: string;
  variant?: "default" | "destructive";
};

export function toast({ title, description }: ToastOptions) {
  // Minimal implementation for now
  // Replace later if you want UI toasts
  // console.log("[toast]", title, description ?? "");
}
