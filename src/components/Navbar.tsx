import React from "react";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink} from  "@/components/ui/navigation-menu";
import Link from "next/link";



const Navbar = () => {
    return (
        <header className="bg-slate-800 p-4"> 
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild >
                        <Link href="/dashboard" className="text-white hover:text-gray-300 cursor-pointer " >DASHBOARD</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                     <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link href="/invoices" className="text-white hover:text-gray-300 cursor-pointer">INVOICES</Link>
                            </NavigationMenuLink>
                    </NavigationMenuItem>  
                    
                </NavigationMenuList>
                      </NavigationMenu>
        </header>
    );
};
export default Navbar;