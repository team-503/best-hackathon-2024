import { urlConfig } from '@/config/url.config'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <header className="flex min-h-28 justify-center border-b-2 border-solid">
            <div className="flex w-[80%] items-center justify-between">
                <Link to={urlConfig.pages.main.url}>
                    <img src="/images/logo.svg" alt="logo" />
                </Link>
                <Link to="">
                    <img src="/images/profile-icon.svg" alt="icon" />
                </Link>
            </div>
        </header>
    )
}

export default Header
