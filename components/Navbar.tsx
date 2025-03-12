import { Button } from "./ui/button";
import { Download, FilePenIcon } from "lucide-react";

export default function Navbar(){
    
    return(
        <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold flex items-center gap-1"><FilePenIcon className="text-primary h-8 w-8"></FilePenIcon> Resume Builder</h1>
          {/* <Button>
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button> */}
        </div>
      </header>
    );
}