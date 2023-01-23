import { Dimensions, Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { generateProgressPercentage } from "../utils/generate-progress-porcentage";
import clsx from "clsx";
import dayjs from "dayjs";

const WEEK_DAYS = 7;
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5;

export const DAY_MARGIN_BETWEEN = 8;
export const DAY_SIZE = Dimensions.get('screen').width / WEEK_DAYS - (SCREEN_HORIZONTAL_PADDING + 5);

interface Props extends TouchableOpacityProps {
    amountOfHabits?: number;
    amountCompleted?: number;
    date: Date;
};

export function HabitDay({ amountOfHabits = 0, amountCompleted = 0, date, ...rest}: Props) {
    const amountAccomplishePercentage = amountOfHabits > 0 ? generateProgressPercentage(amountOfHabits, amountCompleted) : 0
    const today = dayjs().startOf('day').toDate();
    const isCurrentDay = dayjs(date).isSame(today);
    const dayAndMonth = dayjs(date).format('DD')
    return (
        <TouchableOpacity 
            className={clsx("rounded-lg border-2 m-1", {
                'bg-zinc-900 border-2 border-zinc-800': amountAccomplishePercentage === 0,
                'bg-violet-900 border-violet-800': amountAccomplishePercentage > 0 && amountAccomplishePercentage < 20,
                'bg-violet-800 border-violet-700': amountAccomplishePercentage >= 20 && amountAccomplishePercentage < 40,
                'bg-violet-700 border-violet-600': amountAccomplishePercentage >= 40 && amountAccomplishePercentage < 60,
                'bg-violet-600 border-violet-500': amountAccomplishePercentage >= 60 && amountAccomplishePercentage < 80,
                'bg-violet-500 border-violet-400': amountAccomplishePercentage >= 80,
                'border-white border-3': isCurrentDay
            })}
            style={{ width: DAY_SIZE, height: DAY_SIZE }}
            activeOpacity={0.7}
            {...rest}
        >
            <Text className="text-zinc-400 text-center mt-1">{dayAndMonth}</Text>
        </TouchableOpacity>
    )
}