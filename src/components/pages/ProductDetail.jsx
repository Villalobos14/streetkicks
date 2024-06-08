import { Link, useParams } from 'react-router-dom';
import Navbar from '../ui/Navbar/Navbar';
import { HeartIcon, ArrowUpOnSquareIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import Footer from '../ui/Footer/Footer';
import TallasMenu from '../ui/TallasMenu';
import { useState } from 'react';
import Notificacion from '../ui/Notificacion';
import Page404 from './404';
import { useNavigate } from "react-router-dom";
import { sneakers } from '../../utilities/sneakers';

export default function ProductDetail() {
    const [clicked, setClicked] = useState(false);
    const handleClick = () => {
        setClicked(!clicked);
    }
    const navigate = useNavigate();
    const { id } = useParams();
    const product = sneakers.find(sneaker => sneaker.id == id);
    const [notificaciones, setNotificaciones] = useState([]);
    const [show, setShow] = useState(false);
    const [selectedSize, setSelectedSize] = useState(null);

    const handleSelectSize = (size) => {
        setSelectedSize(size);
    };
    const [data, setData] = useState({
        nombre: "",
        precio: "",
        marca: "",
        talla: "27.5",
        cantidad: 1,
        descripcion: "",
        userId: "",
        productId: id,
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const addToCart = (product, size, quantity) => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const newItem = {
            productId: product.id,
            name: product.name,
            price: product.price,
            size: size,
            quantity: quantity,
            brand: product.brand
        };
        cart.push(newItem);
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedSize === null) {
            setShow(true);
            setNotificaciones(prevNotificaciones => [...prevNotificaciones, {
                title: "Seleccione una talla",
                subtitle: "Por favor seleccione una talla para continuar",
                icon: false
            }]);
            return;
        } else {
            addToCart(product, selectedSize, data.cantidad);
            setShow(true);
            setNotificaciones(prevNotificaciones => [...prevNotificaciones, {
                title: "Producto agregado al carrito",
                subtitle: "El producto ha sido agregado al carrito exitosamente",
                icon: true
            }]);
        }
    };

    if (!product) {
        return <Page404 />;
    }

    return (
        <>
            <Navbar />
            <main className='pt-32 px-3 sm:px-14 lg:px-20 xl:px-40' onLoad={() => window.scrollTo(0, 0)}>
                {notificaciones.map((notificacion, index) => (
                    <Notificacion
                        key={index}
                        isActive={show}
                        title={notificacion.title}
                        subtitle={notificacion.subtitle}
                        icon={notificacion.icon}
                    />
                ))}
                <div className='flex justify-between w-full'>
                    <div className='pl-16 w-1/2 flex flex-col'>
                        <div className='flex justify-start flex-row-reverse items-center'>
                            <button className='p-2 active:bg-gray-200 active:scale-75 duration-300 ease-in-out '>
                                {clicked ? <HeartIconSolid className='h-6 w-auto text-red-500 transform duration-300 ease-in-out' onClick={handleClick} /> : <HeartIcon className='h-6 w-auto text-black transform duration-300 ease-in-out' onClick={handleClick} />}
                            </button>
                            <button className='p-2 active:bg-gray-200 active:scale-75 duration-300 ease-in-out '>
                                <ArrowUpOnSquareIcon className='h-6 w-auto text-black transform duration-300 ease-in-out' />
                            </button>
                        </div>
                        <div className='bg-[#25589f] p-2  mt-16 flex justify-start gap-x-4'>
                            <ShoppingBagIcon className='ml-3 h-7 w-auto text-white' />
                            <p className='font-medium text-lg text-gray-50 '>Compra ahora mismo</p>
                        </div>
                        <form className='mt-4 px-8 border border-gray-300 flex flex-col  pb-8 ' onSubmit={handleSubmit}>
                            <div className='text-center'>
                                <h1 className='text-3xl font-bold text-[#25589f] mt-12 my-4'>{product.name}</h1>
                            </div>
                            <div className='flex justify-center items-center mt-6'>
                                <TallasMenu onSelectSize={handleSelectSize} />
                            </div>
                            <div className='flex justify-between mt-6'>
                                <div className="w-full flex justify-between">
                                    <input
                                        required
                                        type="number"
                                        className='w-full mr-2 mb-4 focus:border-[#2d2d2d] focus:outline-none focus:ring-[#2d2d2d] '
                                        placeholder='Cantidad'
                                        id='cantidad'
                                        name='cantidad'
                                        autoComplete='off'
                                        min="1"
                                        max="100"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className='flex justify-around items-center mt-4 gap-x-4 mb-8'>
                                <div className='w-full flex flex-col gap-y-3'>
                                    <button
                                        className="text-center items-center  border border-transparent bg-[#25589f] px-4 py-2 text-lg  justify-center font-medium text-white shadow-sm hover:bg-[#353e8f] focus:outline-none focus:ring-2 focus:ring-[#353e8f] focus:ring-offset-2 duration-500"
                                    >
                                        {"Agregar al carrito " + product.price.toLocaleString('es-MX', {
                                            style: 'currency',
                                            currency: 'MXN'
                                        })}
                                    </button>
                                </div>
                            </div>
                        </form>

                    </div>
                    <div className='flex flex-col mt-14 w-1/2'>
                        <img className='w-full h-auto mt-24 pl-12' src={`${product.brand}`} alt={product.name} />
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
