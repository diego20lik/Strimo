import React, { useState, useEffect } from "react";
import firebase from "../../utils/firebase"
import ConciertosRow from "../conciertos-row/conciertosPendientes";
function PeticionConcierto() {
    const [conciertos, setConciertos] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        const unsubscriber = firebase.firestore().collection("Conciertos").where("estatus", "==", "pendiente").onSnapshot(data=>{
            if(data.empty)return setConciertos([])
                setConciertos([])
                data.docs.map(concierto=>{
                    setConciertos(conciertos => conciertos.concat({info:concierto.data(), id:concierto.id}))
                })
            })
        setLoading(false)
        return unsubscriber
    }, [])
    return (
        <div className="degradado">
            {loading||
                <>
                    {conciertos.length>0?
                    <ConciertosRow data={conciertos}/>
                    :
                    <h1 className="text-center blanco p-5">No hay ningun concierto pendiente para aprobar/denegar</h1>
                }
                </>
            }
        </div>
    )
}
export default PeticionConcierto;