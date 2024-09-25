import {ReviewItem} from "./ReviewItem";
import {Text, View} from "react-native";
import {useSelector} from "react-redux";
import {useMemo, useState} from "react";

export const ReviewList = ({workerUid}) => {
    const { workers } = useSelector(state => state.workers)

    const workerData = useMemo(() => {
            if (workers) {
                return workers.find(worker => worker.uid === workerUid)
            }
        },
        [workerUid, workers])

    return (
        <View>
            {
                workerData && workerData.reviews
                    ? workerData.reviews.map(el => {
                        return (
                            <ReviewItem key={el.id} reviewData={el} workerId={workerData.id} />
                        )
                    })
                    : <Text>There are no reviews.</Text>
            }
        </View>
    )
}