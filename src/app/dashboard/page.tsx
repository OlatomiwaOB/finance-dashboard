import React from 'react'; 
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const DashboardPage = () => {
  // Sample data
const totalRevenue = 15000;
const pendingInvoices = 5;
const vatCollected = 900;

   return (
    <div className='p-10 grid grid-cols-1 md:grid-cols-3 gap-8  '>
      <Card>
        <CardHeader>
         <CardTitle>Total Revenue</CardTitle>
        </CardHeader>
        <CardContent><p className='text-2xl font-bold'>${totalRevenue}</p></CardContent>
      </Card>

      <Card>
        <CardHeader>
         <CardTitle>Pending Invoices</CardTitle>
        </CardHeader>
        <CardContent><p className='text-2xl font-bold'>{pendingInvoices}</p></CardContent>
      </Card>

      <Card>
        <CardHeader>
         <CardTitle>VAT Collected</CardTitle>
        </CardHeader>
        <CardContent><p className='text-zxl font-bold'>${vatCollected}</p></CardContent>
      </Card>
      </div>
   );
};
export default DashboardPage;