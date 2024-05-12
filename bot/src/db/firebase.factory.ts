import admin from 'firebase-admin'
import { FieldPath, OrderByDirection, WriteResult } from 'firebase-admin/firestore'

interface ObjectWithId {
    id: string
}

type Collection = string

type GetAll<T> = (orderBy?: string | FieldPath, orderDirection?: OrderByDirection) => Promise<T[]>
type GetById<T> = (id: string) => Promise<T | undefined>
type Create<T> = (data: Omit<T, 'id'>) => Promise<T>
type CreateMany<T> = (data: Omit<T, 'id'>[]) => Promise<T[]>
type Update<T> = (data: Partial<T> & ObjectWithId) => Promise<WriteResult>
type Delete<T extends { id: string }> = (id: T['id']) => Promise<WriteResult>
type Ref = FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>
type Query<T> = (queryCb: (ref: Ref) => FirebaseFirestore.Query<FirebaseFirestore.DocumentData>) => Promise<T[]>

export class FirebaseFactory<T extends ObjectWithId> {
    constructor(
        private readonly firestore: admin.firestore.Firestore,
        private readonly collection: Collection,
    ) {
        this.collection = collection
    }

    private getOneDocWithId = (doc: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>) => {
        return {
            ...doc.data(),
            id: doc.id,
        } as T
    }

    private getDocsWithId = (docs: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>[]) => {
        return docs.map(
            doc =>
                ({
                    ...doc.data(),
                    id: doc.id,
                }) as T,
        )
    }

    getAll: GetAll<T> = async () => {
        const ref = this.firestore.collection(this.collection)
        const snapshot = await ref.get()
        return this.getDocsWithId(snapshot.docs)
    }

    get: GetById<T> = async id => {
        const ref = this.firestore.collection(this.collection).doc(id)
        const doc = await ref.get()
        if (!doc.exists) {
            return
        }
        return this.getOneDocWithId(doc)
    }

    create: Create<T> = async data => {
        const created = await this.firestore.collection(this.collection).add(data)
        const doc = await created.get()
        return this.getOneDocWithId(doc)
    }

    update: Update<T> = async data => {
        const { id, ...rest } = data
        return await this.firestore.collection(this.collection).doc(id).update(rest)
    }

    delete: Delete<T> = async id => {
        return this.firestore.collection(this.collection).doc(id).delete()
    }

    query: Query<T> = async queryCb => {
        const ref = this.firestore.collection(this.collection)
        const snapshot = await queryCb(ref).get()
        return this.getDocsWithId(snapshot.docs)
    }
}
