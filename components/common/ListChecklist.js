import React, { useEffect, useState } from 'react'
import { Icon, ChevronUpIcon, ChevronDownIcon, TrashIcon, CheckIcon, AddIcon } from "@/components/ui/icon"
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogBackdrop,
} from "@/components/ui/alert-dialog"
import { Progress, ProgressFilledTrack } from '@/components/ui/progress'
import { Button, ButtonText } from '@/components/ui/button'
import { Pressable } from '../ui/pressable'
import { FlatList, View } from 'react-native'
import { Box } from '../ui/box'
import { Text } from '../ui/text'
import { useDispatch } from 'react-redux'
import { addingCheckItemToChecklist, DeletingChecklist, updatingCheckList } from '@/store/checkListAction'
import { Checkbox, CheckboxIcon, CheckboxIndicator } from '../ui/checkbox'
import { Input, InputField } from '../ui/input'


const ListChecklist = ({ checkList }) => {
    const [progressValue, setProgressValue] = useState(0);
    const [checklistName, setChecklistName] = useState('')
    const [showCheckItems, setShowCheckItems] = useState(false)
    const [showAlertDialog, setShowAlertDialog] = useState(false)
    const handleClose = () => setShowAlertDialog(false)


    useEffect(() => {
        if (checkList?.checkItems?.length) {
            setProgressValue(
                (checkList.checkItems.filter((item) => item.state === "complete").length / checkList.checkItems.length) * 100
            );
        }
    }, [checkList.checkItems]);

    const dispatch = useDispatch()
    // console.log(checkList)

    const handleDeleteChecklist = (cardId, checkListId) => {
        dispatch(DeletingChecklist(cardId, checkListId))
        setShowAlertDialog(false)
    }

    const handleShowCheckItems = () => {
        setShowCheckItems((prev) => !prev)
    }

    const handleAddCheckItem = (idChecklist, name) => {
        if (name.trim().length === 0) return
        dispatch(addingCheckItemToChecklist(idChecklist, name))
        setChecklistName('')
        // console.log(idChecklist, name)
    }

    const handleToggleCheckItem = (checkItemId, currentState) => {
        const newStatus = currentState === 'complete' ? 'incomplete' : 'complete'
        console.log(checkList)

        const updated = checkList.checkItems.map((checkItem) => checkItem.id === checkItemId ? { ...checkItem, state: newStatus } : checkItem)
        dispatch(updatingCheckList(checkList.idCard, checkItemId, newStatus, checkList.id, updated))
        // console.log(checkList.idCard, checkItemId, newStatus)
    }

    return (
        <>
            <Pressable onLongPress={() => setShowAlertDialog(true)}
            >
                <View className='flex flex-row justify-between  p-6'>
                    <Box className='flex flex-row gap-3 '>
                        <Text className='text-gray-500 text-lg'>{checkList.name}</Text>
                    </Box>
                    <Pressable onPress={() => handleShowCheckItems()}>
                        {!showCheckItems ?
                            <Icon as={ChevronDownIcon} size="xl" /> :
                            <Icon as={ChevronUpIcon} size="xl" />
                        }
                    </Pressable>
                </View>
                <Progress value={progressValue} size="xs" orientation="horizontal">
                    <ProgressFilledTrack className=' bg-blue-600' />
                </Progress>
            </Pressable>

            {showCheckItems && (
                <FlatList
                    data={checkList.checkItems}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item: checkItem }) => {
                        const isChecked = checkItem.state === "complete";
                        return (

                            <View className='p-5 flex flex-row gap-5'>
                                <Checkbox size="md" isChecked={isChecked} onChange={() => handleToggleCheckItem(checkItem.id, checkItem.state)} >
                                    <CheckboxIndicator >
                                        <CheckboxIcon as={CheckIcon} color='white' className='bg-green-500' />
                                    </CheckboxIndicator>
                                </Checkbox>
                                <Text>{checkItem.name}</Text>
                            </View>
                        )
                    }}
                    ListFooterComponent={() => (
                        <View className='flex flex-row items-center p-5 pt-0'>
                            <Input
                                variant="underlined"
                                size="md"
                                className='w-4/5'
                            >
                                <InputField
                                    placeholder="Add check item..."
                                    value={checklistName}
                                    onChangeText={(text) => setChecklistName(text)}
                                />
                            </Input>
                            <Button className='p-0 bg-transparent' action="positive" onPress={() => handleAddCheckItem(checkList.id, checklistName)}>
                                <Icon as={CheckIcon} size="md" className='w-1/4 text-blue-500' />
                            </Button>
                        </View>
                    )}
                />
            )}

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
                            onPress={() => handleDeleteChecklist(checkList.idCard, checkList.id)}
                            className="px-[30px]"
                        >
                            <ButtonText>Delete Checklist</ButtonText>
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

export default ListChecklist