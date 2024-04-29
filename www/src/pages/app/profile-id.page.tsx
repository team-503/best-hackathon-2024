import { UserTypeEnum, useProfileQuery } from '@/__generated__/graphql'
import { FullPageLoader } from '@/components/full-page-loader'
import { PageWrapper } from '@/components/page-wrapper'
import { Show } from '@/components/show-when'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { urlConfig } from '@/config/url.config'
import { memo } from 'react'
import { Navigate, useParams } from 'react-router-dom'

type ProfileIdPageProps = unknown
export const ProfileIdPage: React.FC<ProfileIdPageProps> = memo(() => {
    const { id } = useParams()
    const { data, loading } = useProfileQuery({
        variables: {
            profileId: id || '',
        },
    })

    if (!id) {
        return <Navigate to={urlConfig.pages.app.url} />
    }

    return (
        <>
            <FullPageLoader isLoading={loading} />
            <PageWrapper
                breadcrumbs={[
                    urlConfig.pages.main,
                    urlConfig.pages.app,
                    {
                        ...urlConfig.pages.profile.id,
                        url: window.location.pathname,
                    },
                ]}
                className="flex items-center justify-center"
            >
                <Card className="w-[450px]">
                    <CardHeader>
                        <CardTitle>{urlConfig.pages.profile.id.label}</CardTitle>
                        <CardDescription>Ви можете переглянути дані особи</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="space-y-1">
                            <Label>Імʼя</Label>
                            <Input readOnly value={data?.profile.fullName} className="cursor-default" />
                        </div>
                        <div className="space-y-1">
                            <Label>E-mail</Label>
                            <Input readOnly value={data?.profile.email} className="cursor-default" />
                        </div>
                        <Show>
                            <Show.When
                                isTrue={data?.profile.userType === UserTypeEnum.Provider && data?.profile.provider != null}
                            >
                                <div className="space-y-1">
                                    <Label>Локація</Label>
                                    <Input readOnly value={data?.profile.provider?.location} className="cursor-default" />
                                </div>
                                <div className="space-y-1">
                                    <Label>Сфера володінь</Label>
                                    <Input readOnly value={data?.profile.provider?.field} className="cursor-default" />
                                </div>
                            </Show.When>
                            <Show.When
                                isTrue={data?.profile.userType === UserTypeEnum.Receiver && data?.profile.receiver != null}
                            >
                                <div className="space-y-1">
                                    <Label>Локація</Label>
                                    <Input readOnly value={data?.profile.receiver?.location} className="cursor-default" />
                                </div>
                                <div className="space-y-1">
                                    <Label>Номер телефону</Label>
                                    <Input readOnly value={data?.profile.receiver?.phone} className="cursor-default" />
                                </div>
                            </Show.When>
                        </Show>
                    </CardContent>
                </Card>
            </PageWrapper>
        </>
    )
})
ProfileIdPage.displayName = 'ProfileIdPage'
