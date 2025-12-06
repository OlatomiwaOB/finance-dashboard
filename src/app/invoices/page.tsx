"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getDatabases } from "@/lib/appwrite";

export default function InvoicesPage() {
    // Sample invoice data
    const [invoices, setInvoices] = useState([
        { id: 1, client: "Tomiwa Idowu", amount: 250, status: "paid" },
        { id: 2, client: "famo ojo", amount: 500, status: "unpaid" },
    ]);

    // Toggle paid/unpaid status
    const handleStatusToggle = async (invoiceId: number) => {
        const invoiceIndex = invoices.findIndex((inv) => inv.id === invoiceId);
        if (invoiceIndex === -1) return;

        const currentInvoice = invoices[invoiceIndex];
        const newStatus = currentInvoice.status === "paid" ? "unpaid" : "paid";

        // Update local state
        const updatedInvoices = [...invoices];
        updatedInvoices[invoiceIndex].status = newStatus;
        setInvoices(updatedInvoices);

        // Optionally: Update in Appwrite (if invoices are stored there)
        // For now, we're just updating local state
        console.log(`Invoice ${invoiceId} status changed to ${newStatus}`);
    };

    return (
        <div className="p-4 space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">Invoices</h1>
                <Link href="/invoices/new">
                <button className="bg-slate-800 px-2 rounded-lg hover:bg-slate-700  text-white font-medium flex items-center  cursor-pointer transition">Create Invoice</button>
                </Link>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>All Invoices</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="divide-y">
                        {invoices.map((invoice) => (
                            <div key={invoice.id}  className="py-4 flex justify-between items-center">
                            <div>
                                <p className="font-medium">{invoice.client}</p>
                                <p className="text-sm text-gray-600">${invoice.amount}</p>
                            </div>
                            <button
                                onClick={() => handleStatusToggle(invoice.id)}
                                className="cursor-pointer transition hover:opacity-80"
                                title="Click to toggle paid/unpaid"
                            >
                                <Badge variant={invoice.status === "paid" ? "default" : "destructive"}>
                                    {invoice.status.toUpperCase()}
                                </Badge>
                            </button>
                        </div>
                     ))} 
                    </div>
                </CardContent>
            </Card> 
        </div>
    );
};