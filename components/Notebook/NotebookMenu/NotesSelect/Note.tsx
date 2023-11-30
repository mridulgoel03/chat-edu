import React from 'react';

import {
    Checkbox,
    HStack,
    IconButton, Text,
    useDisclosure
} from "@chakra-ui/react";

import {AiFillEye} from "react-icons/ai";

import NoteModal from "@/components/NotebookUtilities/NoteModal";

import {Note as NoteType} from "@/types/Note";
import {Notebook} from "@/types/Notebook";
import useAuth from "@/hooks/useAuth";

interface Props {
    notebook: Notebook
    note: NoteType,
    addNote: (note: NoteType) => void
    removeNote: (id: NoteType["id"]) => void
}

const Note: React.FC<Props> = ({ note, notebook, addNote, removeNote }) => {

    const { user } = useAuth();

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <HStack
                key={note.id}
                w={'100%'}
                justifyContent={'space-between'}
                maxW={'100%'}
            >
                {
                    user ? (
                        <Checkbox
                            key={note.id}
                            onChange={(e) => {
                                if(e.target.checked) {
                                    addNote(note);
                                } else {
                                    removeNote(note.id);
                                }
                            }}
                        >
                            {note.name}
                        </Checkbox>
                    ) : (
                        <Text>
                            {note.name}
                        </Text>
                    )
                }

                <HStack>
                    <IconButton
                        aria-label={"View Note"}
                        icon={<AiFillEye />}
                        onClick={onOpen}
                        size={'sm'}
                    />
                </HStack>
            </HStack>
            <NoteModal
                note={note}
                authorId={notebook.userId}
                isOpen={isOpen}
                onClose={onClose}
            />
        </>
    );
};

export default Note;
