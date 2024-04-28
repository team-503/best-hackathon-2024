import 'firebase/app-check'
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { firebaseStorage, firebaseStorageDirectories } from '../config/firebase.config'

type UploadImageToStorage = (file: File, name: string) => Promise<string>
export const uploadImageToStorage: UploadImageToStorage = async (file, name) => {
    const imageRef = ref(firebaseStorage, `${firebaseStorageDirectories.posts}/${name}`)
    await uploadBytes(imageRef, file)
    return getDownloadURL(imageRef)
}

type DeleteImageFromStorage = (refString: string) => Promise<ReturnType<typeof deleteObject> | void>
export const deleteImageFromStorage: DeleteImageFromStorage = async refString => {
    try {
        const fileRef = ref(firebaseStorage, refString)
        return deleteObject(fileRef)
    } catch (error) {
        console.log(error)
    }
}
