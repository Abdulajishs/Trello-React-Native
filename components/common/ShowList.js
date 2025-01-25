import React, { useState } from 'react'
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogBody,
    AlertDialogBackdrop,
} from "@/components/ui/alert-dialog"
import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { Input, InputField } from '@/components/ui/input';
import { Pressable } from '@/components/ui/pressable';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList } from 'react-native';
import ListCards from './ListCards';
import { View } from 'react-native';
import { CheckIcon, Icon, TrashIcon } from '../ui/icon';
import { Button, ButtonText } from '../ui/button';
import { ArchivingList, creatingList, updatingList } from '@/store/listAction';
import { Text } from '../ui/text';

const ShowList = ({ list }) => {
    const cards = useSelector(state => state.cards.cards);
    const [editList, setEditList] = useState(false)
    const [listName, setListName] = useState(list.name)
    const [showAlertDialog, setShowAlertDialog] = useState(false)
    const dispatch = useDispatch()

    const handleClose = () => setShowAlertDialog(false)

    // console.log(list)
    const isDefaultList = list.id === 'defaultList'
    // console.log(isDefault)
    const filteredCards = cards.filter((card) => card.idList === list.id)
    const modifiedCards = [...filteredCards, { id: 'defaultCard', name: '+ Add card', idList: list.id }]

    const handleOKPress = (id, boardId, name) => {
        if (listName.length > 0 && id !== 'defaultList') {
            setEditList(false)
            dispatch(updatingList(id, { name: name }))
        } else if (id === 'defaultList') {
            // console.log(id, boardId, name)
            dispatch(creatingList(boardId, name))
            setEditList(false)
            setListName('')
        }
    }

    const handleArchiveList = (id) => {
        dispatch(ArchivingList(id))
        setShowAlertDialog(false)
    }

    return (
        <Pressable onLongPress={() => setShowAlertDialog(true)}>

            <Box
                className={`bg-slate-200 rounded-lg p-2 mx-4 w-80 ${isDefaultList ? 'justify-center items-center' : ''}`}>

                <Pressable onPress={() => setEditList(true)}>
                    {/* {console.log(editList)} */}
                    {!editList ?
                        <Heading size='md' className={`mx-3 ${isDefaultList ? 'text-blue-700 text-center' : ''}`}>{list.name}</Heading>
                        : (
                            <View className='flex flex-row items-center'>
                                <Input
                                    variant="underlined"
                                    size="md"
                                    isInvalid={listName.length === 0}
                                    className='w-3/4'
                                >
                                    <InputField
                                        placeholder="Enter List here..."
                                        value={listName}
                                        onChangeText={(text) => setListName(text)}
                                    />
                                </Input>
                                <Button className='p-0 bg-transparent' action="positive" onPress={() => handleOKPress(list.id, list.idBoard, listName)}>
                                    {/* {console.log('edit', list)} */}
                                    <Icon as={CheckIcon} size="md" className='w-1/4 text-blue-500' />
                                </Button>
                            </View>
                        )}
                </Pressable>

                <AlertDialog isOpen={showAlertDialog} onClose={handleClose} >
                    <AlertDialogBackdrop />
                    <AlertDialogContent className="w-full  gap-4 items-center">
                        <Box className="rounded-full  bg-background-error items-center justify-center">
                            <Icon as={TrashIcon} size="lg" className="stroke-error-500" />
                        </Box>
                        <AlertDialogFooter className="mt-5">
                            <Button
                                size="sm"
                                action="negative"
                                onPress={() => handleArchiveList(list.id)}
                                className="px-[30px]"
                            >
                                <ButtonText>Archive List</ButtonText>
                            </Button>
                            <Button
                                variant="outline"
                                action="secondary"
                                onPress={handleClose}
                                size="sm"
                                className="px-[30px]"
                            >
                                <ButtonText>Cancel</ButtonText>
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

                {!isDefaultList && (
                    <FlatList
                        data={modifiedCards}
                        keyExtractor={(card) => card.id}
                        renderItem={({ item: card }) => <ListCards card={card} />}
                    />)
                }
            </Box>
        </Pressable>
    )
}

export default ShowList