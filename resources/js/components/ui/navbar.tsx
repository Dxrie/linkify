export default function Navbar() {
    return <div className="w-[95%] bg-background fixed top-5 left-1/2 -translate-x-1/2 rounded-xl py-5 px-6">
        <div className="flex gap-2">
            <img draggable={false} width={35} src="./logo.png" />
            <h1 className="text-3xl font-bold">Linkify</h1>
        </div>
    </div>
}
