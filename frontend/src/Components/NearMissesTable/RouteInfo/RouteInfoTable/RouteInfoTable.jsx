import { useState } from "react";

function RouteInfoTable ( { path } ) {
    console.log(`in table`)
    return (
        <>
            {
                path.forEach(element => {
                    console.log(element)
                })
            }
            
        </>
    ) 
}

export default RouteInfoTable;