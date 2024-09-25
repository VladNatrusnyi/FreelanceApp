import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

export const getImageFromFirebaseStore = (fileUrl, userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const storageInstance = getStorage();
            const userStorageRef = ref(storageInstance, userId);

            const blobData = await new Promise((blobResolve, blobReject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    blobResolve(xhr.response);
                };
                xhr.onerror = function (e) {
                    console.log(e);
                    blobReject(new TypeError("Network request failed"));
                };
                xhr.responseType = "blob";
                xhr.open("GET", fileUrl, true);
                xhr.send(null);
            });


            if (blobData) {
                await uploadBytes(userStorageRef, blobData);

                const imageUrl = await downloadImageURL(userId);

                // Checking that the blobData is not null before closing
                if (blobData.close) {
                    await blobData.close();
                }

                resolve(imageUrl);
            } else {
                reject(new Error("Blob data is null"));
            }
        } catch (error) {
            console.error("Error uploading or downloading image:", error);
            reject(error);
        }
    });
};

const downloadImageURL = async (userId) => {
    try {
        const storageInstance = getStorage();
        const userStorageRef = ref(storageInstance, userId);

        const imageUrl = await getDownloadURL(userStorageRef);
        console.log('IMAGE URL LOADED', imageUrl);
        return imageUrl;
    } catch (error) {
        console.error("Error downloading image:", error);
        throw error;
    }
};
