import Image from "next/image";

export default function IconeStatus( { status }: { status:string} ) {

    if (status == "DONE") {
        return (
            <div>
               <Image 
                    src="/iconeStatusDone.svg"
                    alt="Icone Status"
                    width={20}
                    height={20}
               /> 
            </div>
        );
    } else if (status == "CANCELLED") {
        return (
            <div>
               <Image 
                    src="/iconeStatusCANCELLED.svg"
                    alt="Icone Status"
                    width={20}
                    height={20}
               /> 
            </div>
        );
    } else if (status == "LATE") {
        return (
            <div>
               <Image 
                    src="/iconeStatusLATE.svg"
                    alt="Icone Status"
                    width={20}
                    height={20}
               /> 
            </div>
        );
    } else if (status == "IN PROGRESS") {
        return (
            <div>
               <Image 
                    src="/iconeStatusIN PROGRESS.svg"
                    alt="Icone Status"
                    width={20}
                    height={20}
               /> 
            </div>
        );
    } else {
        return (
            <div>
               <Image 
                    src="/iconeStatusToDo.svg"
                    alt="Icone Status"
                    width={20}
                    height={20}
               /> 
            </div>
        );
    }
 }