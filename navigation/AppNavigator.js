const Stack = createNativeStackNavigator()
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from '@/screens/HomeScreen';
import { Pressable, View } from "react-native";
import { CloseIcon, Icon, SearchIcon } from "@/components/ui/icon";
import { useDispatch } from "react-redux";
import { fetchBoards } from "@/store/boardAction";
import { useEffect } from "react";
import CreateBoardScreen from "@/screens/CreateBoardScreen";
import { useNavigation } from "@react-navigation/native";
import { Box } from "@/components/ui/box";
import ListScreen from "@/screens/ListScreen";

const AppNavigator = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchBoards());
    }, [dispatch]);

    return (
        <Stack.Navigator
            screenOptions={{
                headerTitleStyle: {
                    fontWeight: 'bold'
                },
                headerTintColor: 'white',
                headerStyle: {
                    backgroundColor: '#0C66E4'
                },
            }}
        >
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    title: 'Boards',
                    headerRight: () => (
                        <View style={{ paddingHorizontal: 10 }}>
                            <Pressable
                                onPress={() => console.log('Search icon pressed!')}
                            >
                                <Box className="h-20 w-20 bg-red-700">
                                    <Icon as={SearchIcon} size='xl' color="white" style={{ transform: [{ rotate: '90deg' }] }} />
                                </Box>
                            </Pressable>
                        </View>
                    )
                }}
            />
            <Stack.Screen
                name='CreateBoard'
                component={CreateBoardScreen}
                options={{
                    title: "Create board",
                }}
            />
            <Stack.Screen
                name='ListScreen'
                component={ListScreen}
            />
        </Stack.Navigator>
    )
}

export default AppNavigator