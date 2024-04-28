import PostCard from '../components/post-card'

function ProvidePage() {
    return (
        <div className="flex flex-row flex-wrap justify-center">
            <h2 className="mt-9 w-[80%] text-center text-4xl font-bold">Кому потрібна допомога?</h2>
            <div className="mt-16 flex w-[80%] flex-col flex-wrap justify-start gap-4 md:flex-row md:pl-9">
                <PostCard date={'24.03.2024'} title="хаті пезда" disc={'Тут нема шо казати блять, балон вїбав пів хати розніс'} />
                <PostCard date={'22.06.2023'} title="вкрали сумку" disc={'На ровері хлоп їхав і вирвав сумку '} />
            </div>
        </div>
    )
}

export default ProvidePage
