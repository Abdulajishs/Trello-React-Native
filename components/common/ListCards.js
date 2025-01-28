import React, { useState } from 'react'
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogBody,
    AlertDialogBackdrop,
} from "@/components/ui/alert-dialog"
import { Card } from '../ui/card'
import { Text } from '../ui/text'
import { Pressable } from '../ui/pressable'
import { Button, ButtonText } from '../ui/button'
import { Icon, TrashIcon } from '../ui/icon'
import { useDispatch } from 'react-redux'
import { DeletingCard } from '@/store/cardAction'
import { Box } from '../ui/box'
import { fetchCheckList } from '@/store/checkListAction'
import { useNavigation } from '@react-navigation/native'

const ListCards = ({ card }) => {
    const [showAlertDialog, setShowAlertDialog] = useState(false)
    const navigation = useNavigation()

    const handleClose = () => setShowAlertDialog(false)

    // console.log(card)
    const dispatch = useDispatch()

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
            <Pressable onPress={() => handleCardPress(card.id)}
                onLongPress={() => {
                    setShowAlertDialog(true)
                }}
            >
                <Card size="sm" variant="filled" className="m-3">
                    <Text size="md" className="mb-1">{card.name}</Text>
                </Card>
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