import { useAxios } from "../shared/hooks/useAxios"
import { Character } from "./models"
import { CharacterList } from "./components/CharacterList"
import { characterService } from "./services"
import { useCallback, useContext, useEffect } from "react"
import { ModalContext } from "../shared/components/Modal/context/ModalContext"
import { Modal } from "../shared/components/Modal/Modal"
import { CharacterForm } from "./components/CharacterForm"
import { CharacterContext } from "./context/CharacterContext"
import { CharacterActionType } from "./models/CharacterState"

export const CharacterContainer = () => {
    const serviceCall = useCallback(() => characterService.getCharacters(),[])
    const { setState } = useContext(ModalContext)
    const { state, dispatch } = useContext(CharacterContext)

    const {isLoading, data: characters, error, executeFetch} = useAxios<void, Character[]>({
        serviceCall,
        trigger: true,
    })

    const fetchData = () => {
        executeFetch()
    }

    const openModal = () => {
        setState(true)
    }

    useEffect(() => {
        if(characters && characters.length > 0) {
            dispatch({type: CharacterActionType.NEW, payload: characters})
        }
    }, [characters, dispatch])

    if(isLoading) return <p>Cargando personajes...</p>
    if(error) return <p>Error: {error}</p>

    return (
        <>
            {state && state.characters.size > 0 ? 
                <CharacterList characters={Array.from(state.characters,([, value]) => value)} onDelete={fetchData}>
                </CharacterList>
                :
                (
                    <div>No hay personajes</div>
                )
            }
            <button onClick={openModal}>Crear Personaje</button>
            <Modal>
                <CharacterForm/>
            </Modal>
        </>
    )
}