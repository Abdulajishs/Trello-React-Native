import React, { useState } from 'react'
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogFooter,
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
import { ArchivingList, updatingList } from '@/store/listAction';
import { creatingCard } from '@/store/cardAction';

const ShowList = ({ list }) => {
    const cards = useSelector(state => state.cards.cards);
    const [editList, setEditList] = useState(false)
    const [listName, setListName] = useState(list.name)
    const [addCard, setAddCard] = useState(false);
    const [cardName, setCardName] = useState('');

    const [showAlertDialog, setShowAlertDialog] = useState(false)
    const dispatch = useDispatch()

    const handleClose = () => setShowAlertDialog(false)

    // console.log(list)
    const filteredCards = cards.filter((card) => card.idList === list.id)
    // const modifiedCards = [...filteredCards, { id: 'defaultCard', name: '+ Add card', idList: list.id }]

    const handleOKPress = (id, name) => {
        if (listName.length === 0) return
        setEditList(false)
        dispatch(updatingList(id, { name: name }))
    }

    const handleArchiveList = (id) => {
        dispatch(ArchivingList(id))
        setShowAlertDialog(false)
    }

    const handleAddCardPress = (listId, body) => {
        if (cardName.length > 0) {
            dispatch(creatingCard(listId, body))
            setAddCard(false)
            setCardName('')
        }
    }

    return (
        <Pressable onLongPress={() => setShowAlertDialog(true)}>

            <Box className={`bg-slate-200 rounded-lg p-2 gap-6 mx-4 w-80 `}>

                <Pressable onPress={() => setEditList(true)}>
                    {/* {console.log(editList)} */}
                    {!editList ?
                        <Heading size='md' className={`mx-3 `}>{list.name}</Heading>
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
                                <Button className='p-0 bg-transparent' action="positive" onPress={() => handleOKPress(list.id, listName)}>
                                    {/* {console.log('edit', list)} */}
                                    <Icon as={CheckIcon} size="md" className='w-1/4 text-blue-500' />
                                </Button>
                            </View>
                        )}
                </Pressable>

                <FlatList
                    data={filteredCards}
                    keyExtractor={(card) => card.id}
                    renderItem={({ item: card }) => <ListCards card={card} />}
                    ListFooterComponent={() => {
                        return (
                            <Pressable onPress={() => setAddCard(true)}>
                                {!addCard ?
                                    <Heading size="md" className="mx-3 mb-1.5 text-blue-700">+ Add card</Heading>
                                    : (
                                        <View className='flex flex-row items-center'>
                                            <Input
                                                variant="underlined"
                                                size="md"
                                                isInvalid={cardName.length === 0}
                                                className='w-3/4'
                                            >
                                                <InputField
                                                    placeholder="Enter Card here..."
                                                    value={cardName}
                                                    onChangeText={(text) => setCardName(text)}
                                                />
                                            </Input>
                                            <Button className='p-0 bg-transparent' action="positive" onPress={() => handleAddCardPress(list.id, { name: cardName })}>
                                                <Icon as={CheckIcon} size="md" className='w-1/4 text-blue-500' />
                                            </Button>
                                        </View>
                                    )}
                            </Pressable>
                        )
                    }}
                />

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

            </Box>
        </Pressable>
    )
}

export default ShowList