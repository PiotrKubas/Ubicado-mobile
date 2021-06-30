import React, { useEffect, useState } from "react";
import { sendPosition, getFriendsPositions } from "./models/profile/actionCreators";
import Geolocation from "@react-native-community/geolocation";
import { useAppDispatch } from "./hooks";

const PositionManager = () => {
    const dispatch = useAppDispatch();
    const [positionData, setPositionData] = useState({
        latitude: 0,
        longitude: 0,
    });

    useEffect(() => {
        const interval = setInterval(async () => {
            await Geolocation.getCurrentPosition((position) => {
                dispatch(
                    sendPosition({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    })
                );
            });
            dispatch(getFriendsPositions());
        }, 20000);
        return () => clearInterval(interval);
    }, []);

    return null;
};

export default PositionManager;
