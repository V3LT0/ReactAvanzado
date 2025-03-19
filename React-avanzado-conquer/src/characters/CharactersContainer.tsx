import { useAxios } from "../shared/hooks/useAxios"
import { Character } from "./models"
import { CharacterList } from "./components/CharacterList"
import { characterService } from "./services"
import { useCallback, useContext } from "react"
import { ModalContext } from "../shared/components/Modal/context/ModalContext"
import { Modal } from "../shared/components/Modal/Modal"

export const CharacterContainer = () => {
    const serviceCall = useCallback(() => characterService.getCharacters(),[])
    const { setState } = useContext(ModalContext)

    const {isLoading, data: characters, error} = useAxios<void, Character[]>({
        serviceCall,
        trigger: true,
    })

    const triggerChange = () => {
        //setTrigger((prev) => !prev)
    }

    const openModal = () => {
        setState(true)
    }

    if(isLoading) return <p>Cargando personajes...</p>
    if(error) return <p>Error: {error}</p>

    return (
        <>
            {characters && characters?.length > 0 ? 
                <CharacterList characters={characters} onDelete={triggerChange}>
                </CharacterList>
                :
                (
                    <div>No hay personajes</div>
                )
            }
            <button onClick={openModal}>Crear Personaje</button>
            <Modal>
                <div></div>
            </Modal>
        </>
    )
}