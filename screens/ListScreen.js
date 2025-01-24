import { Box } from '@/components/ui/box';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import React, { useLayoutEffect } from 'react';
import { FlatList, View } from 'react-native';
import { useSelector } from 'react-redux';

const ListScreen = ({ navigation, route }) => {
    const lists = useSelector(state => state.lists.lists);
    const cards = useSelector(state => state.cards.cards);
    const boardName = route.params?.boardName
    const headerColor = route.params?.headerColor
    const bodyColor = route.params?.bodyColor
    // console.log(lists, boardName)
    console.log(cards)

    const modifiedLists = [...lists, { id: 'default', name: 'Add list' }]

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
                keyExtractor={(item, index) => item.id}
                renderItem={({ item: list }) => {
                    // console.log(list)
                    const isDefault = list.id === 'default'
                    // console.log(isDefault)
                    const filteredCards = cards.filter((card) => card.idList === list.id)
                    return (
                        <Box className={`bg-slate-200 rounded-lg p-2 mx-4 w-80 ${isDefault ? 'justify-center items-center' : ''}`}>
                            <Heading className={`mx-3 ${isDefault ? 'text-blue-700 text-center' : ''}`}>{list.name}</Heading>
                            {!isDefault && (
                                <FlatList
                                    data={filteredCards}
                                    keyExtractor={(card) => card.id}
                                    renderItem={({ item: card }) => (
                                        <Card size="md" variant="filled" className="m-3">
                                            <Text size="md" className="mb-1">{card.name}</Text>
                                        </Card>
                                    )}
                                />)
                            }
                        </Box>
                    )
                }}
            />
        </View >
    );
};

export default ListScreen;
