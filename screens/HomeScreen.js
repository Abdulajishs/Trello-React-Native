import { Box } from '@/components/ui/box';
import { Fab, FabIcon, FabLabel } from '@/components/ui/fab';
import { AddIcon, CloseIcon, Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import {
    Modal,
    ModalBackdrop,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
} from "@/components/ui/modal"
import { View, Pressable, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Heading } from '@/components/ui/heading';
import { Button, ButtonText } from '@/components/ui/button';
import { deletingBoard } from '@/store/boardAction';
import { fetchLists } from '@/store/listAction';
import { fetchCards } from '@/store/cardAction';


const HomeScreen = ({ navigation }) => {
    const [selectedBoard, setSelectedBoard] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const boards = useSelector(state => state.boards.boards);
    const dispatch = useDispatch()

    const handleLongPress = (item) => {
        setShowModal(true)
        setSelectedBoard(item)
    }

    const handleDeletePress = (id) => {
        dispatch(deletingBoard(id))
        setShowModal(false)
    }

    const handleListsPress = (item) => {
        dispatch(fetchLists(item.id))
        dispatch(fetchCards(item.id))
        navigation.navigate('ListScreen', { boardName: item.name, headerColor: item.prefs.background, bodyColor: item.prefs.backgroundColor, boardId: item.id })
    }

    return (
        <>
            <View className='flex-1' >
                <FlatList
                    data={boards}
                    renderItem={({ item }) => {
                        // console.log(item)
                        return (
                            <Pressable
                                onPress={() => handleListsPress(item)}
                                onLongPress={() => handleLongPress(item)
                                }
                            >
                                <View className={`flex flex-row gap-5 p-5 `}>
                                    <Box className={`justify-center items-center  w-24 h-14  rounded-lg`}
                                        style={{ backgroundColor: item.prefs.background }}></Box>
                                    <Text className=' self-center text-lg'>{item.name}</Text>
                                </View>
                            </Pressable>
                        )
                    }}
                    keyExtractor={(item, index) => item.id}
                />

                {selectedBoard && (
                    <Modal
                        isOpen={showModal}
                        onClose={() => {
                            setShowModal(false)
                        }}
                        size="md"
                    >
                        <ModalBackdrop />
                        <ModalContent>
                            <ModalHeader>
                                <Heading size="xl" className="text-typography-950">
                                    {selectedBoard.name}
                                </Heading>
                                <ModalCloseButton>
                                    <Icon
                                        as={CloseIcon}
                                        size="xl"
                                        className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"
                                    />
                                </ModalCloseButton>
                            </ModalHeader>
                            <ModalBody>
                                <Pressable onPress={() => handleDeletePress(selectedBoard.id)} >
                                    <Text size="xl" className="text-typography-500 mt-5">Close Board</Text>
                                </Pressable>
                            </ModalBody>
                        </ModalContent>
                    </Modal>
                )}



                <Fab
                    size="lg"
                    placement="bottom right"
                    isHovered={false}
                    isDisabled={false}
                    isPressed={false}
                    className=' bg-purple-900'
                    onPress={() => navigation.navigate('CreateBoard')}
                >
                    <FabIcon as={AddIcon} />
                    <FabLabel>Create board</FabLabel>
                </Fab>
            </View>

        </>
    );
};
export default HomeScreen;