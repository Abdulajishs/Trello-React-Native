import React from 'react'
import Octicons from '@expo/vector-icons/Octicons'
import { Icon, AddIcon } from "@/components/ui/icon"

import { FlatList, Text, View } from 'react-native'
import { Box } from '@/components/ui/box'
import { Pressable } from '@/components/ui/pressable'
import { useDispatch, useSelector } from 'react-redux'
import { creatingChecklist } from '@/store/checkListAction'
import ListChecklist from '@/components/common/ListChecklist'

const CardScreen = ({ route }) => {
    const checkLists = useSelector((state) => state.checkLists.checkLists)
    const cardId = route.params?.cardId

    // console.log(checkLists)

    const dispatch = useDispatch()

    const handleAddChecklistPress = (name) => {
        console.log(cardId, name)
        dispatch(creatingChecklist(cardId, { name }))
        // console.log('checklist pressed!')
    }

    return (
        <>
            <Pressable onPress={() => handleAddChecklistPress('Checklist')}>
                <View className='flex flex-row justify-between  p-6 bg-slate-200'>
                    <Box className='flex flex-row gap-3 '>
                        <Octicons name="checklist" size={24} color="gray" />
                        <Text className=' text-xl'>Checklists</Text>
                    </Box>
                    <Icon as={AddIcon} size="xl" color='blue' />
                </View>
            </Pressable>

            <FlatList
                data={checkLists}
                keyExtractor={(checkList) => checkList.id}
                renderItem={({ item: checkList }) => <ListChecklist checkList={checkList} />}
            />
        </>
    )
}

export default CardScreen

