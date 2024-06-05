import { AuxAreaInfo } from "../map/AreaInfo";

export const AreaInfo = ({ area }) => {
    return (
        <main className="w-full h-full min-w-fit">
            <header className="w-full h-full flex items-center">
                <p className="text-lg font-semibold">{area.name}</p>
            </header>
            <section className="w-full min-w-24 h-full flex flex-col gap-y-1">
                <AuxAreaInfo area={area}/>
            </section>
        </main>
    );
}