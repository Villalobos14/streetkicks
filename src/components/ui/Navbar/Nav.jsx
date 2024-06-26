import { Popover } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/outline'
import { navigation } from '../../../utilities/navigation'
import { Link } from 'react-router-dom'
import ShoppingBag from '../ShoppingBagButton'
import LogoApp from '../LogoApp'
import SearchInput from './SearchInput'

export default function Nav(props) {
    const logged = localStorage.getItem("loggedIn");
    const adminLogged = localStorage.getItem('adminLogged')
    const handleLogout = () => {
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("adminLogged");
        window.location.reload();
    };
    const { open } = props
    return (
        <div className="fixed z-40 bg-white border-b-2 w-full px-12">
            <div className="relative flex justify-between lg:gap-12 xl:grid xl:grid-cols-12">
                <LogoApp />
                <SearchInput />
                <div className="flex items-center md:absolute md:inset-y-0 md:right-0 lg:hidden">
                    <Popover.Button className="-mx-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                        {open ? (<XMarkIcon className="block h-6 w-6" aria-hidden="true" />) : (<Bars3Icon className="block h-6 w-6" aria-hidden="true" />)}
                    </Popover.Button>
                </div>
                <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-6">
                    {navigation.map((item, k) => {
                        return (
                            <Link
                                key={k}
                                to={item.href}
                                className="ml-5 flex-shrink-0 rounded-full bg-white p-1  text-[#2d2d2d] hover:text-gray-800"
                            >
                                {item.name}</Link>)
                    })}
                    <Link to="/Cart" className='mx-4'>
                        <ShoppingBag />
                    </Link>
                   
                        
                        
                        <></>
                </div>
            </div>
        </div>
    )
}