import React, { useEffect, useState } from "react";
import { ChevronDownIcon } from "@/components/ui/icon";
import {
    Select,
    SelectIcon,
    SelectTrigger,
    SelectInput,
    SelectPortal,
    SelectBackdrop,
    SelectContent,
    SelectDragIndicatorWrapper,
    SelectDragIndicator,
    SelectItem,
} from "@/components/ui/select";
import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { useDispatch } from "react-redux";
import { creatingBoard } from "@/store/boardAction";

const CreateBoardScreen = ({ navigation }) => {
    const [isDisabled, setIsDisabled] = useState(true);
    const [boardName, setBoardName] = useState("");
    const [selectedColor, setSelectedColor] = useState("blue");
    const dispatch = useDispatch()

    const boardOptions = [
        { label: "Blue", value: "blue", bgColor: "bg-blue-800" },
        { label: "Orange", value: "orange", bgColor: "bg-orange-800" },
        { label: "Green", value: "green", bgColor: "bg-green-800" },
        { label: "Red", value: "red", bgColor: "bg-red-800" },
        { label: "Purple", value: "purple", bgColor: "bg-purple-700" },
        { label: "Pink", value: "pink", bgColor: "bg-pink-700" },
        { label: "Grey", value: "grey", bgColor: "bg-gray-700" },
    ];

    useEffect(() => {
        setIsDisabled(boardName.length === 0);
    }, [boardName]);

    const handleCreateBoard = () => {
        console.log("Board Created:", { boardName, selectedColor });
        dispatch(creatingBoard(boardName, { prefs_background: selectedColor }))
        navigation.goBack()
    };

    return (
        <VStack space="md" className="flex-1 w-full p-12">

            <Input className="my-1 border-0 border-b-2 border-b-blue-900">
                <InputField
                    type="text"
                    placeholder="Board name"
                    value={boardName}
                    onChangeText={setBoardName}
                />
            </Input>

            <Box className="flex flex-row justify-between w-full">
                <Select
                    className="w-3/4"
                    value={selectedColor}
                    onValueChange={(value) => setSelectedColor(value)}
                >
                    <SelectTrigger variant="underlined" size="md" className="flex flex-row justify-between ">
                        <SelectInput
                            placeholder="Board Background"
                            className="pt-0 px-3 "
                        />
                        <SelectIcon className="mr-3" as={ChevronDownIcon} />
                    </SelectTrigger>
                    <SelectPortal>
                        <SelectBackdrop />
                        <SelectContent>
                            <SelectDragIndicatorWrapper>
                                <SelectDragIndicator />
                            </SelectDragIndicatorWrapper>
                            {boardOptions.map((option) => (
                                <SelectItem
                                    key={option.value}
                                    label={option.label}
                                    value={option.value}
                                />
                            ))}
                        </SelectContent>
                    </SelectPortal>
                </Select>

                <Box
                    className={`w-12 h-12 ${boardOptions.find((opt) => opt.value === selectedColor)?.bgColor ||
                        "bg-gray-200"
                        } rounded-md mb-2`}
                ></Box>
            </Box>

            <Box className="flex-1 justify-end w-full">
                <Button
                    className={`${isDisabled ? "bg-gray-400" : "bg-blue-700"}`}
                    size="lg"
                    onPress={handleCreateBoard}
                    disabled={isDisabled}
                >
                    <ButtonText>Create board</ButtonText>
                </Button>
            </Box>
        </VStack>
    );
};

export default CreateBoardScreen;
