import { createClient } from "@/lib/supabase/server";
import { Order } from "@/lib/supabase";
import AdminDashboardClient from "./AdminDashboardClient";
import { User } from "@supabase/supabase-js";

export const revalidate = 60;

export default async function AdminPage() {
    const supabase = await createClient()

    const { data: orders, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });
    const { data: users } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        return (
            <div
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "sans-serif",
                    flexDirection: "column",
                    gap: 12,
                    color: "#cc0c39",
                }}
            >
                <span style={{ fontSize: 40 }}>⚠️</span>
                <p style={{ fontWeight: 700, fontSize: 16 }}>Failed to load orders</p>
                <p style={{ fontSize: 13, color: "#888" }}>{error.message}</p>
            </div>
        );
    }

    return <AdminDashboardClient initialOrders={(orders as Order[]) ?? []} initialUsers={(users as User[]) ?? []} />;
}