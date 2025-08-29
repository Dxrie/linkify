import Navbar from "@/components/ui/navbar";
import Waves from "@/components/waves";

export default function Welcome() {

    return (
        <div className="min-h-dvh px-10 bg-gradient-to-br from-primary from-10% via-secondary via-30% to-blue-400 to-90% text-white animate-gradient-x relative">
            <Navbar />
            <div className="text-center pt-40 text-shadow-md">
                <h1 className="text-4xl font-bold">Make every link simple</h1>
                <h2 className="text-2xl">Easily turn long URLs into short, memorable links. Clean, simple, and perfect for sharing anywhere.</h2>
            </div>
            <div className="flex-col w-[80%] m-auto bg-background text-foreground rounded-xl py-10 mt-8">   
                <div className="w-full">
                    <p className=""></p>
                </div>
            </div>
          
            <Waves />
        </div>

    );
}
