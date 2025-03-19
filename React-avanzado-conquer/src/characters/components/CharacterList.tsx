import { useNavigate } from "react-router-dom";
import { CharacterContext } from "../context/CharacterContext";
import { Character } from "../models";
import { characterService } from "../services";
import { CharacterItem } from "./CharacterItem";
import { useCallback, useContext } from "react";
import { useAxios } from "../../shared/hooks/useAxios";
import { CharacterActionType } from "../models/CharacterState";

interface Props {
    characters: Character[],
    onDelete: () => void,
}

export const CharacterList = ({ characters, onDelete}: Props) => {
    const {dispatch} = useContext(CharacterContext)
    const navigate = useNavigate();

    const deleteCharachterServiceCall = useCallback((id: number) => characterService.deleteCharacter(id),[])

    const {error: deleteError, executeFetch: executeDeleteCharacterFetch} = useAxios<number, void>({
        serviceCall: deleteCharachterServiceCall
    })

    const handleDelete = async (id:number) => {
        executeDeleteCharacterFetch(id)
        if(!deleteError) {
            dispatch({
                type: CharacterActionType.DELETE,
                payload: id
            })
            onDelete()
        }
    }

    const handleEdit = (id:number) => {
        navigate(`/character/${id}`)
    }
    
    return(
        <ul>
            {characters.map((character) => (
                <CharacterItem key={character.id} character={character}>                    
                    <button onClick={() => handleDelete(character.id)}>Eliminar</button>
                    <button onClick={() => handleEdit(character.id)}>Editar</button>
                </CharacterItem>
            ))}
        </ul>
    )
}