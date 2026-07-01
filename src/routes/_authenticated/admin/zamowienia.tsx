import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState, useMemo } from "react";
import { listAdminOrders, type OrderStatusFilter } from "@/lib/admin-orders.functions";
import { checkIsAdmin } from "@/lib/auth.functions";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CATALOG } from "@/lib/catalog";

const STATUS_OPTIONS: { value: OrderStatusFilter; label: string }[] = [
  { value: "all", label: "Wszystkie" },
  { value: "paid", label: "Opłacone" },
  { value: "failed", label: "Nieudane" },
  { value: "expired", label: "Wygasłe" },
  { value: "canceled", label: "Anulowane" },
  { value: "refunded", label: "Zwrócone" },
];

const STATUS_LABEL: Record<
  string,
  { label: string; variant: "default" | "secondary" | "destructive" | "outline" }
> = {
  paid: { label: "Opłacone", variant: "default" },
  failed: { label: "Nieudane", variant: "destructive" },
  expired: { label: "Wygasłe", variant: "secondary" },
  canceled: { label: "Anulowane", variant: "outline" },
  refunded: { label: "Zwrócone", variant: "secondary" },
};

export const Route = createFileRoute("/_authenticated/admin/zamowienia")({
  component: AdminOrdersPage,
});

function AdminOrdersPage() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<OrderStatusFilter>("all");
  const [priceFilter, setPriceFilter] = useState<string>("pakiet_start_one_time");
  const [search, setSearch] = useState("");

  const checkAdmin = useServerFn(checkIsAdmin);
  const fetchOrders = useServerFn(listAdminOrders);

  const adminQuery = useQuery({
    queryKey: ["isAdmin"],
    queryFn: () => checkAdmin(),
  });

  const ordersQuery = useQuery({
    queryKey: ["admin-orders", status, priceFilter],
    enabled: adminQuery.data?.isAdmin === true,
    queryFn: () =>
      fetchOrders({
        data: {
          status,
          priceId: priceFilter === "all" ? undefined : priceFilter,
        },
      }),
  });

  const filtered = useMemo(() => {
    const list = ordersQuery.data?.orders ?? [];
    if (!search.trim()) return list;
    const q = search.trim().toLowerCase();
    return list.filter(
      (o) =>
        (o.customer_email ?? "").toLowerCase().includes(q) ||
        (o.customer_name ?? "").toLowerCase().includes(q) ||
        o.stripe_session_id.toLowerCase().includes(q),
    );
  }, [ordersQuery.data, search]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/login" });
  };

  if (adminQuery.isLoading) {
    return <CenteredMessage>Sprawdzam uprawnienia…</CenteredMessage>;
  }

  if (adminQuery.data && !adminQuery.data.isAdmin) {
    return (
      <CenteredMessage>
        <div className="space-y-4 text-center">
          <h1 className="text-xl font-semibold">Brak dostępu</h1>
          <p className="text-sm text-muted-foreground">
            Twoje konto ({adminQuery.data.email}) nie ma uprawnień administratora.
            <br />
            Skontaktuj się z właścicielem projektu, aby nadać rolę <code>admin</code> w tabeli{" "}
            <code>user_roles</code>.
          </p>
          <div className="flex justify-center gap-2">
            <Button variant="outline" asChild>
              <Link to="/">Strona główna</Link>
            </Button>
            <Button onClick={handleLogout}>Wyloguj</Button>
          </div>
        </div>
      </CenteredMessage>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-lg font-semibold">Zamówienia</h1>
            <p className="text-xs text-muted-foreground">
              Zalogowano jako {adminQuery.data?.email}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to="/">Strona</Link>
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Wyloguj
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8 space-y-6">
        <div className="flex flex-wrap items-end gap-4">
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground">Status</label>
            <Select value={status} onValueChange={(v) => setStatus(v as OrderStatusFilter)}>
              <SelectTrigger className="w-44">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <label className="text-xs text-muted-foreground">Pakiet</label>
            <Select value={priceFilter} onValueChange={setPriceFilter}>
              <SelectTrigger className="w-56">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Wszystkie pakiety</SelectItem>
                {Object.entries(CATALOG).map(([priceId, item]) => (
                  <SelectItem key={priceId} value={priceId}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 min-w-[200px] space-y-1">
            <label className="text-xs text-muted-foreground">
              Szukaj (e-mail / nazwisko / sesja)
            </label>
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="np. jan@firma.pl"
            />
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Klient</TableHead>
                <TableHead>Pakiet</TableHead>
                <TableHead className="text-right">Kwota</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Środowisko</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ordersQuery.isLoading && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-sm text-muted-foreground py-8">
                    Ładowanie…
                  </TableCell>
                </TableRow>
              )}
              {ordersQuery.error && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-sm text-destructive py-8">
                    Błąd: {(ordersQuery.error as Error).message}
                  </TableCell>
                </TableRow>
              )}
              {!ordersQuery.isLoading && filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-sm text-muted-foreground py-8">
                    Brak zamówień dla wybranych filtrów.
                  </TableCell>
                </TableRow>
              )}
              {filtered.map((o) => {
                const meta = STATUS_LABEL[o.status] ?? {
                  label: o.status,
                  variant: "outline" as const,
                };
                return (
                  <TableRow key={o.id}>
                    <TableCell className="text-sm whitespace-nowrap">
                      {new Date(o.created_at).toLocaleString("pl-PL", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm font-medium">{o.customer_name || "—"}</div>
                      <div className="text-xs text-muted-foreground">
                        {o.customer_email || "brak e-maila"}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{o.product_name}</TableCell>
                    <TableCell className="text-right text-sm font-medium whitespace-nowrap">
                      {(o.amount_cents / 100).toLocaleString("pl-PL", {
                        style: "currency",
                        currency: (o.currency || "pln").toUpperCase(),
                      })}
                    </TableCell>
                    <TableCell>
                      <Badge variant={meta.variant}>{meta.label}</Badge>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{o.environment}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        <p className="text-xs text-muted-foreground">
          Łącznie: {filtered.length} {filtered.length === 1 ? "zamówienie" : "zamówień"}
        </p>
      </main>
    </div>
  );
}

function CenteredMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 text-sm text-muted-foreground">
      {children}
    </div>
  );
}
