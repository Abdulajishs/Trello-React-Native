import ShowList from '@/components/common/ShowList';

import React, { useLayoutEffect } from 'react';
import { FlatList, View } from 'react-native';
import { useSelector } from 'react-redux';

const ListScreen = ({ navigation, route }) => {
    const lists = useSelector(state => state.lists.lists);
    const boardName = route.params?.boardName
    const headerColor = route.params?.headerColor
    const bodyColor = route.params?.bodyColor
    const idBoard = route.params?.boardId
    // console.log(lists, boardName)
    // console.log(cards)

    const modifiedLists = [...lists, { id: 'defaultList', name: 'Add list', idBoard }]

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
                data={modifiedLists}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ padding: 16, alignItems: 'flex-start' }}
                keyExtractor={(item, index) => {
                    // console.log(item.id)
                    return item.id
                }}
                renderItem={({ item: list }) => <ShowList list={list} />}
            />
        </View >
    );
};

export default ListScreen;
