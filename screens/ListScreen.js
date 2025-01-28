import ShowList from '@/components/common/ShowList';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { CheckIcon, Icon } from '@/components/ui/icon';
import { Input, InputField } from '@/components/ui/input';
import { creatingList } from '@/store/listAction';

import React, { useState, useLayoutEffect } from 'react';
import { FlatList, Pressable, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const ListScreen = ({ navigation, route }) => {
    const [addList, setAddList] = useState(false)
    const [listName, setListName] = useState('')
    const lists = useSelector(state => state.lists.lists);
    const boardName = route.params?.boardName
    const headerColor = route.params?.headerColor
    const bodyColor = route.params?.bodyColor
    const idBoard = route.params?.boardId
    // console.log(lists, boardName)
    // console.log(cards)

    const dispatch = useDispatch()


    const handleOKPress = (name) => {
        if (listName.length === 0) return
        dispatch(creatingList(idBoard, name))
        setAddList(false)
        setListName('')
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            title: boardName,
            headerStyle: {
                backgroundColor: headerColor
            },
        })
    }, [navigation, boardName])

    return (
        <View style={{ flex: 1, backgroundColor: bodyColor }}>
            < FlatList
                data={lists}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ padding: 16, alignItems: 'flex-start' }}
                keyExtractor={(item, index) => {
                    // console.log(item.id)
                    return item.id
                }}
                renderItem={({ item: list }) => <ShowList list={list} />}
                ListFooterComponent={() => {
                    return (
                        <View className={`bg-slate-200 rounded-lg p-2 gap-6 mx-4 w-80 justify-center items-center`}>
                            <Pressable onPress={() => setAddList(true)}>
                                {!addList ?
                                    <Heading size='md' className={`mx-3 text-blue-700 text-center`}>Add list</Heading>
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
                                            <Button className='p-0 bg-transparent' action="positive" onPress={() => handleOKPress(listName)}>
                                                <Icon as={CheckIcon} size="md" className='w-1/4 text-blue-500' />
                                            </Button>
                                        </View>
                                    )}
                            </Pressable>

                        </View>
                    )
                }}
            />
        </View >
    );
};

export default ListScreen;
