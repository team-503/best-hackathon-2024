import { UserTypeEnum, useMeQuery } from '@/__generated__/graphql'
import { FullPageLoader } from '@/components/full-page-loader'
import { PageWrapper } from '@/components/page-wrapper'
import { Show } from '@/components/show-when'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { urlConfig } from '@/config/url.config'
import { useUserStore } from '@/modules/user/stores/user.store'
import { memo, useCallback } from 'react'
import useSignOut from 'react-auth-kit/hooks/useSignOut'

type ProfileMePageProps = unknown
export const ProfileMePage: React.FC<ProfileMePageProps> = memo(() => {
    const setUser = useUserStore(state => state.setUser)
    const signOut = useSignOut()
    const { data, loading } = useMeQuery()

    const handleSignOut = useCallback(() => {
        signOut()
        setUser(null)
    }, [setUser, signOut])

    return (
        <>
            <FullPageLoader isLoading={loading} />
            <PageWrapper
                breadcrumbs={[urlConfig.pages.main, urlConfig.pages.app, urlConfig.pages.profile.me]}
                className="flex items-center justify-center"
            >
                <Card className="w-[450px]">
                    <CardHeader>
                        <CardTitle>{urlConfig.pages.profile.me.label}</CardTitle>
                        <CardDescription>Ви можете переглянути та змінити (в майбутньому) свої особисті дані</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="space-y-1">
                            <Label>Імʼя</Label>
                            <Input readOnly value={data?.me.fullName} className="cursor-default" />
                        </div>
                        <div className="space-y-1">
                            <Label>E-mail</Label>
                            <Input readOnly value={data?.me.email} className="cursor-default" />
                        </div>
                        <Show>
                            <Show.When isTrue={data?.me.userType === UserTypeEnum.Provider && data?.me.provider != null}>
                                <div className="space-y-1">
                                    <Label>Локація</Label>
                                    <Input readOnly value={data?.me.provider?.location} className="cursor-default" />
                                </div>
                                <div className="space-y-1">
                                    <Label>Сфера володінь</Label>
                                    <Input readOnly value={data?.me.provider?.field} className="cursor-default" />
                                </div>
                            </Show.When>
                            <Show.When isTrue={data?.me.userType === UserTypeEnum.Receiver && data?.me.receiver != null}>
                                <div className="space-y-1">
                                    <Label>Локація</Label>
                                    <Input readOnly value={data?.me.receiver?.location} className="cursor-default" />
                                </div>
                                <div className="space-y-1">
                                    <Label>Номер телефону</Label>
                                    <Input readOnly value={data?.me.receiver?.phone} className="cursor-default" />
                                </div>
                            </Show.When>
                        </Show>
                    </CardContent>
                    <CardFooter>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive">Вийти з облікового запису</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Ви впевнені, що хочете вийти з облікового запису?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Якщо ви вийдете з облікового запису, вам доведеться знову вводити свої дані для входу.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Скасувати</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleSignOut}>Вийти</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </CardFooter>
                </Card>
            </PageWrapper>
        </>
    )
})
ProfileMePage.displayName = 'ProfileMePage'
