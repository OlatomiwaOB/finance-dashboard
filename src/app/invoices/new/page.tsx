"use client";  // so that we can use React hooks like useState 

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from  "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getAccount, getDatabases } from "@/lib/appwrite";


export default function NewInvoicePage() {
    
    const VAT_RATE = 0.095 // 9.5% VAT RATE
    
    // form fields
    const [clientName, setClientName] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState(0);

    // auto calculations
    const vat = amount * VAT_RATE;
    const total = amount + vat;

    // save Invoice Function 
    async function handleSaveInvoice() {
      
        // Step one  for Get the logged-in user 
  const user = await getAccount().get();
  const userId = user.$id;

        try {
            // SAVE TO Appwrite
      await getDatabases().createDocument(
        "auto-generated",
        "invoices",
        "unique()",
        {
           clientName, 
           totalAmount: amount + vat, 
          isPaid: false,
          issueDate: new Date().toISOString(),
          dueDate: new Date(new Date().setDate(new Date().getDate() + 30)).toISOString()
        }
      );
            alert("Invoice saved successfully:");
        } catch (err: any) {
            console.error(err);
            alert("Failed to save invoice: " + err.message);
        }
    }

    return (
        <div className="max-w-xl mx-auto mt-12"> 
            <Card>
                <CardHeader>
                    <CardTitle>Create New Invoice</CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* For Client Name */}
                  <div className="space-y-2">
                    <Label>Client Name</Label>
                    <Input placeholder="Enter client name" value={clientName} onChange={(e) => setClientName(e.target.value)}/>
                  </div>
                  {/* Description */}
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Input placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)}/>
                  </div>

                  {/* Amount */}
                  <div className="space-y-2">
                    <Label>Amount</Label>
                    <Input type="number" placeholder="Enter amount"  value={amount} onChange={(e) => setAmount(Number(e.target.value))}/>
                  </div>
                  {/* Auto Calculated VAT */}
                  <div className="space-y-2">
                    <Label>VAT (9.5%)</Label>
                    <Input value={vat.toFixed(2)} disabled/>
                  </div>

                  {/* Auto Calculated Total */}
                  <div className="space-y-2">
                    <Label>Total</Label>
                    <Input value={total.toFixed(2)} disabled/>
                  </div>

                  {/* Submit Button */}
                  <Button className="w-full bg-slate-800 text-white hover:bg-slate-700" onClick={handleSaveInvoice}>Save Invoice</Button>
                </CardContent>
            </Card>
        </div>
    )


}