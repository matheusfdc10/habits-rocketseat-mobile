import { useState } from "react";
import { ScrollView, View, Text, TextInput, TouchableOpacity, Alert} from "react-native";
import { BackButton } from "../components/BackButton";
import { CheckBox } from "../components/CheckBox";
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'
import { api } from "../lib/axios";

const avalibleWeekDays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']

export function New() {
    const [title, setTitle] = useState('')
    const [weekDays, setWeekDays] = useState<number[]>([]);

    const handleToggleWeekDay = (weekDayIndex: number) => {
        if (weekDays.includes(weekDayIndex)){
            setWeekDays(preveState => preveState.filter(weekDay => weekDay !== weekDayIndex))
        } else {
            setWeekDays(preveState => [...preveState, weekDayIndex])
        }
    }

    const handleCreateNewHabit = async () => {
        try{
            if(!title.trim() || weekDays.length === 0){
                Alert.alert('Novo Hábito', 'Informe o nome do hábito e escolha a periodicidade')
            }

            await api.post('/habits', { title, weekDays })

            setTitle('');
            setWeekDays([]);
            
            Alert.alert('Novo hábito', 'Hábito criado com sucesso!')
        } catch(err) {
            console.log(err)
            Alert.alert('Ops', 'Não foi possível criar o novo hábito.')
        }
    }

    return (
        <View className="flex-1 bg-background px-8 pt-16">
            <BackButton />
            <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 50}}
            >

                <Text className="mt-6 text-white font-extrabold text-3xl">
                    Criar hábito
                </Text>

                <Text className="mt-6 text-white font-semibold text-base">
                    Qual seu comprometimento
                </Text>

                <TextInput 
                    className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-800 focus:border-green-600"
                    placeholder="ex.: Exercícios, dormir bem, etc..."
                    placeholderTextColor={colors.zinc[400]}
                    onChangeText={setTitle}
                    value={title}
                />

                <Text className="mt-4 mb-3 text-white font-semibold text-base">
                    Qual seu comprometimento
                </Text>

                {
                    avalibleWeekDays.map((weekDay, index) => (
                        <CheckBox
                            key={weekDay}
                            title={weekDay}
                            checked={weekDays.includes(index)}
                            onPress={() => handleToggleWeekDay(index)}
                        />
                    ))
                }

                <TouchableOpacity 
                    className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6"
                    activeOpacity={0.7}
                    onPress={handleCreateNewHabit}
                >
                    <Feather
                        name="check"
                        size={20}
                        color={colors.white}
                    />
                    <Text className="font-semibold text-base text-white ml-2">
                        Confirmar
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}