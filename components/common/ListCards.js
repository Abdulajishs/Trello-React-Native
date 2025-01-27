import React, { useState } from 'react'
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogBody,
    AlertDialogBackdrop,
} from "@/components/ui/alert-dialog"
import { Card } from '../ui/card'
import { Heading } from '../ui/heading'
import { Text } from '../ui/text'
import { Pressable } from '../ui/pressable'
import { Input, InputField } from '../ui/input'
import { Button, ButtonText } from '../ui/button'
import { CheckIcon, Icon, TrashIcon } from '../ui/icon'
import { View } from 'react-native'
import { useDispatch } from 'react-redux'
import { creatingCard, DeletingCard } from '@/store/cardAction'
import { Box } from '../ui/box'
import { fetchCheckList } from '@/store/checkListAction'
import { useNavigation } from '@react-navigation/native'

const ListCards = ({ card }) => {
    const [addCard, setAddCard] = useState(false);
    const [cardName, setCardName] = useState('');
    const [showAlertDialog, setShowAlertDialog] = useState(false)
    const navigation = useNavigation()

    const handleClose = () => setShowAlertDialog(false)


    // console.log(card)
    const dispatch = useDispatch()

    const isDefaultCard = card.id === 'defaultCard'
    // console.log(isDefaultCard, card.id)
    const handleOKPress = (listId, body) => {
        if (cardName.length > 0) {
            dispatch(creatingCard(listId, body))
            setAddCard(false)
        }
    }

    const handleDeleteList = (cardId) => {
        dispatch(DeletingCard(cardId))
        setShowAlertDialog(false)
    }

    const handleCardPress = (id) => {
        // console.log(id)
        dispatch(fetchCheckList(id))
        navigation.navigate('CardScreen', { cardId: id })
    }

    return (
        <>
            {!isDefaultCard ? (
                <Pressable onPress={() => handleCardPress(card.id)}
                    onLongPress={() => {
                        setShowAlertDialog(true)
                    }}
                >
                    <Card size="sm" variant="filled" className="m-3">
                        <Text size="md" className="mb-1">{card.name}</Text>
                    </Card>
                </Pressable>
            ) : (
                <Pressable onPress={() => setAddCard(true)}>
                    {!addCard ?
                        <Heading size="md" className="mx-3 mb-1.5 text-blue-700">{card.name}</Heading>
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
                                <Button className='p-0 bg-transparent' action="positive" onPress={() => handleOKPress(card.idList, { name: cardName })}>
                                    <Icon as={CheckIcon} size="md" className='w-1/4 text-blue-500' />
                                </Button>
                            </View>
                        )}
                </Pressable>
            )
            }

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
                            onPress={() => handleDeleteList(card.id)}
                            className="px-[30px]"
                        >
                            <ButtonText>Delete Card</ButtonText>
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
        </>
    )
}

export default ListCards