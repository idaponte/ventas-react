import { useState } from "react";
import { RefreshControl } from "react-native";

export const useRefresh = (onRefreshCallback) => {
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        try {
            await onRefreshCallback();
        } finally {
            setRefreshing(false);
        }
    };

    const Control = (props) => (
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} {...props} />
    );

    return [Control];
};
