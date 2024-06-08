import { CheckIcon } from '@heroicons/react/20/solid';
import Navbar from '../ui/Navbar/Navbar';
import Footer from '../ui/Footer/Footer';
import { Link, useNavigate } from 'react-router-dom';
import Notificacion from '../ui/Notificacion';
import { useEffect, useState } from 'react';
import { sneakers } from '../../utilities/sneakers';

export default function Cart() {
    const [notificaciones, setNotificaciones] = useState([]);
    const [show, setShow] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();  // Utiliza useNavigate para redirigir

    useEffect(() => {
        // Recupera los datos del carrito desde el localStorage
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(cart);
    }, []);

    const handleDelete = (id) => {
        const updatedCartItems = cartItems.filter(item => item.productId !== id);
        setCartItems(updatedCartItems);
        localStorage.setItem('cart', JSON.stringify(updatedCartItems));
        
        setShow(true);
        setNotificaciones(prevNotificaciones => [...prevNotificaciones, {
            title: "Producto eliminado del carrito",
            subtitle: "El producto ha sido eliminado exitosamente",
            icon: true
        }]);
    };

    const handleCheckout = () => {
        navigate('/sneakers/confirmation');  // Redirige a la página de confirmación
    };

    if (cartItems.length === 0) {
        return (
            <div onLoad={() => window.scrollTo(0, 0)}>
                <Navbar />
                <main className='h-screen flex items-center justify-center'>
                    <h3>Lo sentimos, aún no tienes nada en el carrito.</h3>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <main className="bg-white h-full min-h-screen">
                {notificaciones.map((notificacion, index) => (
                    <Notificacion
                        key={index}
                        isActive={show}
                        title={notificacion.title}
                        subtitle={notificacion.subtitle}
                        icon={notificacion.icon}
                    />
                ))}
                <div className="mx-32 px-4 sm:pt-32 sm:px-6 lg:px-0">
                    <h1 className="text-start text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Productos apartados</h1>
                    <div className="mt-12">
                        <section>
                            <ul role="list" className="divide-y divide-gray-200 border-t border-b border-gray-200">
                                {cartItems.map((product) => {
                                    const sneaker = sneakers.find(sneaker => sneaker.id === product.productId);
                                    const imageUrl = sneaker ? `/images/sneakers/${sneaker.brand}` : '';
                                    return (
                                        <li key={product.productId} className="flex py-6">
                                            <div className="flex-shrink-0">
                                                <img src={sneaker.brand} alt={sneaker?.name || 'tenis'} className='h-24 rounded-md object-cover object-center sm:h-28 w-auto' />
                                            </div>

                                            <div className="ml-4 flex flex-1 flex-col sm:ml-6">
                                                <div>
                                                    <div className="flex justify-between">
                                                        <h4 className="text-sm">
                                                            <Link to={`/sneaker/${product.productId}`} className="font-medium text-gray-700 hover:text-gray-800">
                                                                {product.name}  x {product.quantity}
                                                            </Link>
                                                        </h4>
                                                        <p className="ml-4 text-sm font-medium text-gray-900">{product.price}</p>
                                                    </div>
                                                    <p className="mt-1 text-sm text-gray-500">{product.price.toLocaleString('es-MX', {
                                                        style: 'currency',
                                                        currency: 'MXN'
                                                    })}</p>
                                                    <p className="mt-1 text-sm text-gray-500">Talla: {product.size}</p>
                                                </div>

                                                <div className="mt-4 flex flex-1 items-end justify-between">
                                                    <p className="flex items-center space-x-2 text-sm text-gray-700">
                                                        <CheckIcon className="h-5 w-5 flex-shrink-0 text-[#25589f]" aria-hidden="true" />
                                                        <span>In stock</span>
                                                    </p>
                                                    <div className="ml-4">
                                                        <button onClick={() => handleDelete(product.productId)} type="button" className="text-sm font-medium text-[#25589f] hover:text-indigo-500">
                                                            <span>Remove</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </section>
                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={handleCheckout}
                                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#25589f] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Pagar
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
