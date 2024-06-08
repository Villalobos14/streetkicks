import { Link, useNavigate } from "react-router-dom";
import Page404 from "./404";
import Notificacion from "../ui/Notificacion";
import { useState, useEffect } from "react";

export default function Confirmation() {
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [notificaciones, setNotificaciones] = useState([]);
    const [show, setShow] = useState(false);
    const [total, setTotal] = useState(0)

    useEffect(() => {
        let newProduct = JSON.parse(localStorage.getItem('cart') || []);
        setProduct(newProduct);

        let newTotal = newProduct.reduce((acc, item) => {
            return acc + (item.price * item.quantity);
        }, 0);

        setTotal(newTotal);
    }, []);

    if (!product) {
        return <Page404 />;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mostrar notificación de éxito
        setShow(true);
        localStorage.setItem("cart",JSON.stringify([]))
        setNotificaciones(prevNotificaciones => [...prevNotificaciones, {
            title: "Apartado creado con éxito",
            subtitle: "Gracias por realizar un apartado, espere a que el vendedor la acepte.",
            icon: true
        }]);
        
        // Redirigir al home después de 2 segundos
        setTimeout(() => {
            navigate('/');
            localStorage.removeItem('productReserved');
        }, 2000);
    }

    return (
        <div className="bg-white">
            {notificaciones.map((notificacion, index) => (
                <Notificacion
                    key={index}
                    isActive={show}
                    title={notificacion.title}
                    subtitle={notificacion.subtitle}
                    icon={notificacion.icon}
                />
            ))}
            <div className="fixed top-0 left-0 hidden h-full w-1/2 bg-white lg:block" aria-hidden="true" />
            <div className="fixed top-0 right-0 hidden h-full w-1/2 bg-[#2d2d2d]  lg:block" aria-hidden="true" />
            <main className="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8">
                
                <section aria-labelledby="summary-heading " className="bg-[#2d2d2d] pt-6 pb-2 text-[#919193] md:px-10 lg:col-start-2 lg:row-start-1 lg:mx-auto lg:w-full lg:max-w-lg lg:bg-transparent lg:px-0 lg:pt-32 lg:pb-24 overflow-y-scroll ">
                    <h1 className="text-4xl text-white ">
                        Productos
                    </h1>
                    <div className="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0 divide-y divide-white divide-opacity-10 ">
                        {product?.map((product, index) => (
                            <div key={index}>
                                <ul role="list" className=" text-sm font-medium  ">
                                <div className="flex items-center justify-between mt-2">
                                        <dt>Precio</dt>
                                        <dd>{(product.price).toLocaleString('es-MX', {
                                            style: 'currency',
                                            currency: 'MXN'
                                        })}</dd>
                                    </div>
                                    <li className="flex items-start space-x-4 py-6 ">
                                        <img
                                            src={`${product.brand}`}
                                            alt={product.name}
                                            className="h-20 w-auto flex-none rounded-md object-cover object-center"
                                        />
                                        <div className="flex-auto space-y-1 ">
                                            <h3 className="text-white">{product.name}<span className="text-white">  x  {product.quantity}</span></h3>
                                            <p>Talla: {product.size} MX</p>
                                        </div>
                                        <p className="flex-none text-base font-medium text-white ">{(product.price * product.quantity).toLocaleString('es-MX', {
                                            style: 'currency',
                                            currency: 'MXN'
                                        })}</p>
                                        
                                    </li>
                                </ul>

                                
                            </div>
                        ))}
                        <div className="flex items-center justify-between border-t border-white border-opacity-10 pt-6 text-white ">
                            <dt className="text-base">Total</dt>
                            <dd className="text-base">{(total).toLocaleString('es-MX', {
                                style: 'currency',
                                currency: 'MXN'
                            })}</dd>
                        </div>
                    </div>
                </section>

                <section className="py-16 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:w-full lg:max-w-lg lg:pt-0 lg:pb-24 fixed">
                    <header className="relative mx-auto max-w-7xl bg-[#2d2d2d]  py-6 lg:grid lg:grid-cols-2 lg:gap-x-16 lg:bg-transparent lg:px-8 lg:pt-16 lg:pb-10 ml-40">
                        <div className="justify-center flex px-4 lg:w-full items-center lg:px-0">
                            <Link to="/">
                                <img
                                    src="/logo-white.png"
                                    alt=""
                                    className="h-20 w-auto lg:hidden "
                                />
                                <img
                                    src="/logo-black.png"
                                    alt=""
                                    className="hidden h-20 w-auto lg:block"
                                />
                            </Link>
                        </div>
                    </header>
                    <form>
                        <div className="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
                            <div>
                                <h1 className="text-4xl font-medium text-gray-900 mb-16">
                                    Resumen de tu pedido
                                </h1>
                                <h3 id="contact-info-heading" className="text-lg font-medium text-gray-900">
                                    Información de contacto
                                </h3>
                                <div className="mt-6">
                                    <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 ">
                                        Correo electrónico
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            autoComplete="off"
                                            required
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#25589f] focus:ring-[#25589f] sm:text-sm border rounded-s px-2 py-2 border-gray-400 border-light '
                                            placeholder='Cantidad'"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10">
                                
                            </div>

                            <div className="mt-10 flex  border-t border-gray-200 pt-6">
                                <button
                                    onClick={handleSubmit}
                                    type="submit"
                                    className="rounded-md border border-transparent bg-[#25589f] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-[#3f6395] focus:outline-none focus:ring-2 focus:ring-[#2e8667] focus:ring-offset-2 focus:ring-offset-gray-50 duration-300"
                                >
                                    Confirmar
                                </button>
                            </div>
                        </div>
                    </form>
                </section>
            </main>
        </div>
    )
}
