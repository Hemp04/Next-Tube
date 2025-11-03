// import { Button } from "@/components/ui/button";
import Image from "next/image";
// import {  }
import logo from "../logo.png";
  
export default function Home() {
  return (
    <div>
      <Image src={logo} alt="Logo" width={50} height={50}/>
      {/* width and height are mandatory */}
      <p className="text-xl font-semibold tracking-tight">Next-Tube</p>
    </div>
  );
}
