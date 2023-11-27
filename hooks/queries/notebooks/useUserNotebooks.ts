import {useCallback, useEffect} from "react";

import useContainerData from "@/hooks/queries/utilities/useContainerData";
import {
    subscribeToNotebooksChangedEvent,
    unsubscribeFromNotebooksChangedEvent
} from "@/azure/cosmos/eventEmitters/notebooksEventEmitter";

import {Notebook} from "@/types/Notebook";


const useUserNotebooks = (userId: string) => {
    const [notebooks, loading, error, fetchNotebooks] = useContainerData<Notebook>(`/api/notebooks/user?userId=${userId}`);

    const handleNotesChanged = useCallback(async (changedUserId: string) => {
        if(changedUserId === userId) {
            await fetchNotebooks();
        }
    }, [fetchNotebooks, userId])

    useEffect(() => {
        subscribeToNotebooksChangedEvent(handleNotesChanged);
        return () => {
            unsubscribeFromNotebooksChangedEvent(handleNotesChanged)
        };
    }, [handleNotesChanged]);

    return {
        notebooks: notebooks || [],
        loading,
        error,
        fetchNotebooks
    }
}

export default useUserNotebooks;