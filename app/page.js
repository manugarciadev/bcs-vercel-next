'use client'; // Marca este componente para ser renderizado no lado do cliente
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import jwt from 'jsonwebtoken';
import MainContentPage from './components/MainContentPage';
import Header from './components/Header';
import "./main.css";
import "./output.css";


export default function Main() {

  const [menuOpen, setMenuOpen] = useState(false);

  const tours = [
    {
      title: 'Maldives Tour',
      price: '$2.500 / per person',
      description:
        'Travel non lorem ac erat susce bibendum nulla facilisi. Sedeuter nunc voluat miss conse viventa amet vestibulum.',
      duration: '12 Days',
      location: 'Maldives',
      ageGroup: '12+',
      rating: '9.8 Superb',
      image: '/img/maldives1.jpg',
    },
    {
      title: 'Roma',
      price: '$1.300 / per person',
      description:
        'Travel non lorem ac erat susce bibendum nulla facilisi. Sedeuter nunc voluat miss conse viventa amet vestibulum.',
      duration: '6 Days',
      location: 'Italy',
      ageGroup: '10+',
      rating: '9.5 Superb',
      image: '/img/2.jpg',
    },
    {
      title: 'France',
      price: '$400 / per person',
      description:
        'Travel non lorem ac erat susce bibendum nulla facilisi. Sedeuter nunc voluat miss conse viventa amet vestibulum.',
      duration: '10 Days',
      location: 'France',
      ageGroup: '6+',
      rating: '9.5 Superb',
      image: '/img/france1.jpg',
    },
    // Add more tours as needed
  ];

  const stats = [
    {
      icon: 'bi-airplane',
      count: '600',
      label: 'Flight Booking',
    },
    {
      icon: 'bi-house-heart',
      count: '250',
      label: 'Amazing Tour',
    },
    {
      icon: 'bi-rocket',
      count: '100',
      label: 'Cruises Booking',
    },
    {
      icon: 'bi-postage-heart',
      count: '100',
      label: 'Hotel Booking',
    },
  ];

  const places = [
    { city: "Roma", country: "Italy" },
    { city: "Venise", country: "Italy" },
    { city: "Milano", country: "Italy" },
    { city: "Perugia", country: "Italy" },
    { city: "Parma", country: "Italy" },
  ];

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <main class="w-full">
        <section class="w-full h-[100vh]  bg-header  bg-cover bg-no-repeat bg-center bg-color1 bg-blend-multiply bg-opacity-60 " >
        <section className="w-full flex flex-wrap justify-center">
      {/* Header for desktop */}
      <header className="w-[85%] xl:w-[73%] container hidden lg:flex justify-between h-[60px] items-center py-[45px] border-b-[1px] border-white border-opacity-40">
  <figure className="w-[80px]">
    <img src="https://i.postimg.cc/yxJyBnsy/logo.png" alt="Logo" className="w-[100%]" />
  </figure>
  <nav className="h-[100%] md:w-[70%]">
    <ul className="h-[100%] flex items-center gap-8 justify-end">
      {[
        { name: "Home", link: "/" },
        { name: "About", link: "/about" },
        { name: "Tours", link: "/tours" },
        { name: "Destination", link: "/destination" },
        { name: "Blog", link: "/blog" },
        { name: "Gallery", link: "/gallery" },
        { name: "Login", link: "/login" },
      ].map((item) => (
        <li key={item.name} className="list-none">
          <a
            className="decoration-none text-white hover:text-color3 transition-all duration-500"
            href={item.link}
          >
            {item.name}
          </a>
        </li>
      ))}
    </ul>
  </nav>
</header>


      {/* Header for mobile */}
      <header className="w-[95%] sm:w-[70%] md:w-[80%] container flex h-[60px] justify-between items-center lg:hidden py-[45px] relative border-b-[1px] border-white border-opacity-40">
        <figure className="w-[70px]">
          <img src="https://i.postimg.cc/yxJyBnsy/logo.png" alt="Logo" className="w-[100%]" />
        </figure>
        <div className="w-1/2 h-full flex justify-end items-center">
          <i
            className="bi bi-list text-3xl text-white cursor-pointer ham-menu-icon"
            onClick={toggleMenu}
          ></i>
        </div>
        <nav
          className={`menu ${menuOpen ? 'block' : 'hidden'} h-[400px] w-full absolute bg-white left-0 top-[90px] z-30`}
        >
          <ul className="h-full w-full flex flex-col justify-center ms-6">
            {["Home", "About", "Tours", "Destination", "Blog", "Gallery", "Contact"].map((item) => (
              <li key={item} className="list-none my-3">
                <a
                  className="decoration-none text-color2 flex hover:text-color4 transition-all duration-600"
                  href={`#${item.toLowerCase()}`}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </section>

    <section className="w-full flex justify-center mt-[110px] mb-[70px]">
      <div className="w-[700px] md:w-[900px] container h-auto mb-12">
        <p className="w-full text-center uppercase text-white tracking-widest [word-spacing:8px] mb-4">
          Lets travel the world with us
        </p>
        <h1 className="w-full text-center text-white text-5xl md:text-7xl font-secondary uppercase tracking-widest">
          Explore The World With <span className="travol">Travol</span>
        </h1>
      </div>
    </section>

    <section className="w-full justify-center mt-[20px] hidden lg:flex relative">
    <div className="bg-white bg-opacity-40 container absolute w-[1000px] xl:w-[1200px] h-[80px] flex justify-center items-center backdrop-blur-lg rounded-lg top-[-40px]">
      <div className="w-[950px] xl:w-[1100px] container h-auto absolute m-[10px]">
        <form className="flex font-primary">
          <input
            type="text"
            placeholder="Where to?"
            className="py-[15px] ps-5 w-[25%] outline-none focus:outline-none bg-white text-stone-800 rounded-l-lg"
          />
          <select name="destination" className="w-[25%] py-[15px] bg-white ps-5 text-stone-800 outline-none focus:outline-none">
            <option value="dest" selected className="bg-color1 text-white">
              Destination
            </option>
            <option value="it" className="text-stone-600">
              Italy
            </option>
            <option value="fr" className="text-stone-600">
              France
            </option>
            <option value="mal" className="text-stone-600">
              Maldives
            </option>
            <option value="gr" className="text-stone-600">
              Greece
            </option>
            <option value="ca" className="text-stone-600">
              Canada
            </option>
            <option value="du" className="text-stone-600">
              Dubai
            </option>
          </select>
          <select name="duration" className="w-[25%] py-[15px] bg-white ps-5 text-stone-800 outline-none focus:outline-none">
            <option value="du" selected className="bg-color1 text-white">
              Duration
            </option>
            <option value="1-day" className="text-stone-600">
              1 Day Tour
            </option>
            <option value="2-4-days" className="text-stone-600">
              2-4 Days Tour
            </option>
            <option value="5-7-days" className="text-stone-600">
              5-7 Days Tour
            </option>
            <option value="7-plus-days" className="text-stone-600">
              7+ Days Tour
            </option>
          </select>
          <a
            href="#"
            role="button"
            className="bg-color1 w-[25%] text-white flex items-center justify-center text-[18px] hover:bg-color3 transition-all duration-500 rounded-r-lg"
          >
            <i className="bi bi-search me-2"></i>Find Now
          </a>
        </form>
      </div>
    </div>
</section>



    <section className="w-full flex justify-center bg-color5 h-auto mt-4">
      <div className="w-full container flex justify-between flex-wrap px-0 2xl:px-36 h-auto py-16">
        {/* Left Section */}
        <div className="w-full lg:w-[50%] bg-color px-5">
          <p className="text-color4 uppercase">The best travel agency</p>
          <p className="text-color3 text-5xl font-bold uppercase font-secondary my-4">
            Discover the <span className="text-color1">world</span> with our guide
          </p>
          <p className="text-color6">
            You can choose any country with good tourism. Agency elementum sesue
            the aucan vestibulum aliquam justo in sapien rutrum volutpat. Donec
            in quis the pellentesque velit. Donec id velit ac arcu posuere
            blane.
          </p>
          <p className="text-color6 my-4">
            Hotel ut nisl quam nestibulum ac quam nec odio elementum ceisue the
            miss varius natoque penatibus et magnis dis parturient monte.
          </p>
          <div className="flex items-center">
            <i className="bi bi-check text-white bg-color4 rounded-[50%] px-2 py-1 me-3"></i>
            <p className="text-color6">20 Years of Experience</p>
          </div>
          <div className="flex items-center my-4">
            <i className="bi bi-check text-white bg-color4 rounded-[50%] px-2 py-1 me-3"></i>
            <p className="text-color6">150+ Tour Destinations</p>
          </div>
          <div className="flex items-center">
            <i className="bi bi-telephone-forward text-color1 text-2xl me-3"></i>
            <div>
              <p className="text-color6">For information</p>
              <p className="text-color6 text-2xl">09188085590</p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-[50%] flex flex-col justify-center items-center bg-color5 h-auto pb-8 lg:pb-0 mt-10 lg:mt-0">
          <figure className="w-[70%] h-[500px] relative">
            <div className="w-[100%] h-[100%] bg-color4 absolute left-8 top-8"></div>
            <img
              src="https://www.voltaaomundo.pt/files/2018/11/shutterstock_363111110.jpg"
              alt="About"
              className="w-[100%] h-[100%] absolute z-10 object-cover hover:scale-[.95] transition-all duration-500"
            />
          </figure>
        </div>
      </div>
    </section>

    <section className="w-full flex justify-center bg-color7 py-8">
  <div className="w-full container 2xl:px-36">
    <div>
      <p className="text-color4 uppercase px-5">Choose your place</p>
      
      {/* Aqui está a transição de rotação aplicada apenas no título */}
      <p className="text-5xl font-secondary text-color3 px-5 transition-transform duration-500 hover:rotate-[-5deg]">
        Popular <span className="text-color1">Tours</span>
      </p>
      
      <div className="flex flex-wrap md:justify-between gap-10 px-6 xl:px-0 py-8 lg:px-3">
        {tours.map((tour, index) => (
          <figure
            key={index}
            className="w-full md:w-[45%] xl:w-[30%] h-[450px] relative overflow-hidden group"
          >
            {/* Informações que aparecem no hover */}
            <div className="w-[100%] h-[100%] absolute bottom-photo bg-white flex flex-col justify-center px-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <p className="text-3xl text-color3 capitalize font-secondary">
                {tour.title}
              </p>
              <p className="text-color1 mb-4">{tour.price}</p>
              <p className="text-color6">{tour.description}</p>
              <div className="flex flex-wrap my-4">
                <div className="w-[50%] flex">
                  <i className="bi bi-clock text-color4"></i>
                  <p className="text-color6 ms-2">{tour.duration}</p>
                </div>
                <div className="w-[50%] flex">
                  <i className="bi bi-geo-alt text-color4"></i>
                  <p className="text-color6 ms-2">{tour.location}</p>
                </div>
                <div className="w-[50%] flex">
                  <i className="bi bi-person text-color4"></i>
                  <p className="text-color6 ms-2">{tour.ageGroup}</p>
                </div>
                <div className="w-[50%] flex">
                  <i className="bi bi-emoji-smile text-color4"></i>
                  <p className="text-color6 ms-2">{tour.rating}</p>
                </div>
              </div>
              <a
                href="#"
                className="underline decoration-color1 text-color6 flex mb-2"
              >
                Tour details
              </a>
            </div>

            {/* Imagem e local fixos */}
            <Image
              src={tour.image}
              alt={tour.title}
              className="w-[100%] h-[100%] object-cover brightness-75 absolute"
              layout="fill"
            />
            <p className="absolute uppercase text-white bg-color3 px-4 py-1 right-1 top-12 rotate-[-90deg]">
              {tour.location}
            </p>
            <figcaption className="absolute text-white bottom-8 right-10 transition-opacity duration-500 opacity-100 group-hover:opacity-0">
              <p className="capitalize font-secondary text-3xl">
                {tour.title}
              </p>
              <p className="text-right">{tour.price}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  </div>
</section>


    <section className="w-full bg-sea py-32 relative bg-cover bg-fixed flex justify-center after:content-[''] after:absolute after:w-[100%] after:h-[100%] after:bg-black after:bg-opacity-50 after:top-0">
      <div className="w-full container 2xl:px-36 flex flex-wrap relative z-10 justify-center md:justify-between">
        {stats.map((stat, index) => (
          <div key={index} className="w-full md:w-[20%] my-5">
            <figure className="flex flex-col items-center group">
              <div className="bg-white bg-opacity-50 rounded-[50%] p-5 flex items-center relative overflow-hidden outline outline-8 outline-offset-8 out">
                {/* Moving Icon Effect */}
                <i
                  className={`bi ${stat.icon} text-5xl text-white absolute ms-[-100%] group-hover:ms-[0%] transition-all duration-300`}
                ></i>
                <i
                  className={`bi ${stat.icon} text-5xl text-white group-hover:ms-[200%] transition-all duration-300`}
                ></i>
              </div>
              <figcaption className="text-center text-white font-secondary mt-10">
                <p className="text-3xl">{stat.count}</p>
                <p className="text-xl">{stat.label}</p>
              </figcaption>
            </figure>
          </div>
        ))}
      </div>
    </section>

    <section className="w-full flex justify-center bg-color7 lg:h-[800px]">
      <div className="w-full container 2xl:px-36 py-16 bg-color7">
        <p className="text-color4 uppercase px-5">TOP DESTINATION</p>
        <p className="text-3xl sm:text-5xl font-secondary text-color1 px-5">
          Travel <span className=" text-color3">Countries</span>
        </p>
        <div className="w-full flex lg:relative py-10 flex-wrap lg:px-3 xl:px-0 px-6">
          <figure className="w-full lg:w-[70%] lg:absolute">
            <img src="img/2.jpg" alt="Destination" className="w-[100%]" />
          </figure>
          <div className="w-full lg:w-[50%] lg:absolute lg:h-[400px] bg-map bg-no-repeat bg-center z-10 lg:right-0 xl:top-[170%] md:top-20 px-10 py-16 bg-white">
            <p className="uppercase text-color1">Travel Countries</p>
            <p className="uppercase text-3xl font-secondary text-color3 pb-4">
              ITALY, Europe
            </p>
            <p className="text-color6">
              You can choose any country with good tourism. Agency elementum
              sesue the aucan vestibulum aliquam justo in sapien rutrum
              volutpat. Donec in quis the pellentesque velit. Donec id velit ac
              arcu posuere blane.
            </p>
            <div className="flex flex-wrap py-4">
              {places.map((place, index) => (
                <div key={index} className="flex w-[33%]">
                  <i className="bi bi-geo-alt text-color1"></i>
                  <p className="text-color6">{place.city}</p>
                </div>
              ))}
            </div>
            <a
              href="#"
              className="capitalize flex py-4 relative text-color1 before:content-[''] before:h-[1px] before:absolute before:w-[100%] before:bg-color6 before:bg-opacity-50 before:top-0"
            >
              <p>view all places</p>
              <i className="bi bi-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    </section>

    <section className="w-full bg-boat bg-cover bg-bottom bg-no-repeat h-[50vh] flex justify-center bg-color2 bg-blend-multiply bg-opacity-50">
      <div className="w-full container flex justify-center items-center flex-col">
        <p className="text-white font-secondary text-3xl 2xl:text-6xl">
          Costa Victoria Cochin
        </p>
        <div className="flex mt-5 gap-5">
          <div className="flex items-center">
            <i className="bi bi-geo-alt text-white text-2xl me-2"></i>
            <p className="text-white">Maldives</p>
          </div>
          <div className="flex items-center">
            <i className="bi bi-clock text-white text-2xl me-2"></i>
            <p className="text-white">4 Days + 3 Nights</p>
          </div>
        </div>
      </div>
    </section>

    <section className="w-full flex justify-center bg-color7 py-8">
      <div className="w-full container 2xl:px-36">
        <div>
          <p className="text-color4 uppercase px-5">MOST POPULAR</p>
          <p className="text-5xl font-secondary text-color3 px-5">
            Popular <span className="text-color1">Destination</span>
          </p>
          <div className="flex flex-wrap justify-center xl:justify-between gap-10 px-6 xl:px-0 py-8 lg:px-3">
            {/* Destination Card 1 */}
            <figure className="w-full md:w-[45%] xl:w-[30%] h-[450px] relative transition-all duration-1000 overflow-hidden group">
              <img
                src="img/canada1-1.jpeg"
                alt="Canada"
                className="w-[100%] h-[100%] object-cover group-hover:brightness-75 group-hover:scale-[1.2] absolute transition-all duration-1000"
              />
              <p className="absolute uppercase text-white bg-color1 px-4 py-1 right-1 top-12 rotate-[-90deg]">
                2 Tours
              </p>
              <figcaption className="absolute text-white bottom-[20px] left-5 group-hover:bottom-[50px] transition-all duration-700 w-full">
                <div className="flex after:content-[''] after:h-[1px] after:bg-opacity-50 after:w-[20%] after:bg-white after:absolute after:bottom-[-8px] group-hover:after:w-[90%] after:transition-all after:duration-1000">
                  <i className="bi bi-geo-alt text-2xl text-white me-2"></i>
                  <p className="capitalize font-secondary text-3xl">Canada</p>
                </div>
                <div className="flex justify-between absolute mt-5 w-full">
                  <p>2 Tours Package</p>
                  <a href="" className="flex me-9">
                    Explore
                    <i className="bi bi-arrow-right"></i>
                  </a>
                </div>
              </figcaption>
            </figure>

            {/* Destination Card 2 */}
            <figure className="w-full md:w-[45%] xl:w-[30%] h-[450px] relative transition-all duration-1000 overflow-hidden group">
              <img
                src="img/maldives1-1.jpeg"
                alt="Maldives"
                className="w-[100%] h-[100%] object-cover group-hover:brightness-75 group-hover:scale-[1.2] absolute transition-all duration-1000"
              />
              <p className="absolute uppercase text-white bg-color1 px-4 py-1 right-1 top-12 rotate-[-90deg]">
                2 Tours
              </p>
              <figcaption className="absolute text-white bottom-[20px] left-5 group-hover:bottom-[50px] transition-all duration-700 w-full">
                <div className="flex after:content-[''] after:h-[1px] after:bg-opacity-50 after:w-[20%] after:bg-white after:absolute after:bottom-[-8px] group-hover:after:w-[90%] after:transition-all after:duration-1000">
                  <i className="bi bi-geo-alt text-2xl text-white me-2"></i>
                  <p className="capitalize font-secondary text-3xl">Maldives</p>
                </div>
                <div className="flex justify-between absolute mt-5 w-full">
                  <p>2 Tours Package</p>
                  <a href="" className="flex me-9">
                    Explore
                    <i className="bi bi-arrow-right"></i>
                  </a>
                </div>
              </figcaption>
            </figure>

            {/* Destination Card 3 */}
            <figure className="w-full md:w-[45%] xl:w-[30%] h-[450px] relative transition-all duration-1000 overflow-hidden group">
              <img
                src="img/italy1.jpeg"
                alt="Italy"
                className="w-[100%] h-[100%] object-cover group-hover:brightness-75 group-hover:scale-[1.2] absolute transition-all duration-1000"
              />
              <p className="absolute uppercase text-white bg-color1 px-4 py-1 right-1 top-12 rotate-[-90deg]">
                6 Tours
              </p>
              <figcaption className="absolute text-white bottom-[20px] left-5 group-hover:bottom-[50px] transition-all duration-700 w-full">
                <div className="flex after:content-[''] after:h-[1px] after:bg-opacity-50 after:w-[20%] after:bg-white after:absolute after:bottom-[-8px] group-hover:after:w-[90%] after:transition-all after:duration-1000">
                  <i className="bi bi-geo-alt text-2xl text-white me-2"></i>
                  <p className="capitalize font-secondary text-3xl">Italy</p>
                </div>
                <div className="flex justify-between absolute mt-5 w-full">
                  <p>6 Tours Package</p>
                  <a href="" className="flex me-9">
                    Explore
                    <i className="bi bi-arrow-right"></i>
                  </a>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>

    <section className="w-full flex justify-center bg-color3 py-8 h-auto">
      <div className="w-full container 2xl:px-36 h-auto">
        <div>
          <p className="text-color4 uppercase px-5">TRAVEL BLOG</p>
          <p className="text-5xl font-secondary text-color4 px-5">
            Travel<span className="text-white"> Experience</span>
          </p>
          <div className="flex flex-wrap justify-center xl:justify-between gap-10 px-6 xl:px-0 py-8 lg:px-3">
            {/* Blog Card 1 */}
            <figure className="w-full md:w-[45%] xl:w-[30%] h-[450px] relative transition-all duration-1000 group mb-20">
              <div className="w-[100%] h-[100%] overflow-hidden group transition-all duration-1000 relative">
                <img
                  src="img/22.jpeg"
                  alt="Blog Post 1"
                  className="w-[100%] h-[100%] object-cover group-hover:brightness-75 group-hover:scale-[1.2] absolute transition-all duration-1000"
                />
              </div>
              <div className="absolute uppercase text-white bg-color1 px-2 left-3 top-12 flex flex-col items-center">
                <p>Aug</p>
                <p className="font-bold">02</p>
              </div>
              <figcaption className="absolute h-[150px] w-[85%] bg-white bottom-[-80px] left-[8%] flex flex-col justify-center px-8 group-hover:bottom-10 transition-all duration-1000">
                <p className="uppercase text-color4">Tours</p>
                <p className="capitalize text-color3 font-secondary text-2xl">
                  most popular yacht charter routes
                </p>
              </figcaption>
            </figure>

            {/* Blog Card 2 */}
            <figure className="w-full md:w-[45%] xl:w-[30%] h-[450px] relative transition-all duration-1000 group mb-20">
              <div className="w-[100%] h-[100%] overflow-hidden group transition-all duration-1000 relative">
                <img
                  src="img/11.jpeg"
                  alt="Blog Post 2"
                  className="w-[100%] h-[100%] object-cover group-hover:brightness-75 group-hover:scale-[1.2] absolute transition-all duration-1000"
                />
              </div>
              <div className="absolute uppercase text-white bg-color1 px-2 left-3 top-12 flex flex-col items-center">
                <p>Aug</p>
                <p className="font-bold">07</p>
              </div>
              <figcaption className="absolute h-[150px] w-[85%] bg-white bottom-[-80px] left-[8%] flex flex-col justify-center px-3 group-hover:bottom-10 transition-all duration-1000">
                <p className="uppercase text-color4">Travel</p>
                <p className="capitalize text-color3 font-secondary text-2xl">
                  practical information for travelling to egypt
                </p>
              </figcaption>
            </figure>

            {/* Blog Card 3 */}
            <figure className="w-full md:w-[45%] xl:w-[30%] h-[450px] relative transition-all duration-1000 group mb-20">
              <div className="w-[100%] h-[100%] overflow-hidden group transition-all duration-1000 relative">
                <img
                  src="img/18-1.jpeg"
                  alt="Blog Post 3"
                  className="w-[100%] h-[100%] object-cover group-hover:brightness-75 group-hover:scale-[1.2] absolute transition-all duration-1000"
                />
              </div>
              <div className="absolute uppercase text-white bg-color1 px-2 left-3 top-12 flex flex-col items-center">
                <p>Aug</p>
                <p className="font-bold">02</p>
              </div>
              <figcaption className="absolute h-[150px] w-[85%] bg-white bottom-[-80px] left-[8%] flex flex-col justify-center px-5 group-hover:bottom-10 transition-all duration-1000">
                <p className="uppercase text-color4">Destinations</p>
                <p className="capitalize text-color3 font-secondary text-2xl">
                  tips towards a flawless honeymoon
                </p>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>

    <section className="w-full flex justify-center bg-color7 overflow-hidden">
      <div className="w-full container flex whitespace-nowrap overflow-hidden group">
        <div className="flex logos-slide animate-anime w-full flex-wrap whitespace-nowrap group-hover:pause">
          <figure className="w-[25%]">
            <img src="img/1.png" alt="Logo 1" className="w-[100%]" />
          </figure>
          <figure className="w-[25%]">
            <img src="img/2.png" alt="Logo 2" className="w-[100%]" />
          </figure>
          <figure className="w-[25%]">
            <img src="img/3.png" alt="Logo 3" className="w-[100%]" />
          </figure>
          <figure className="w-[25%]">
            <img src="img/4.png" alt="Logo 4" className="w-[100%]" />
          </figure>
        </div>
        <div className="flex logos-slide w-full flex-wrap whitespace-nowrap -ms-[200%] animate-anime group-hover:pause">
          <figure className="w-[25%]">
            <img src="img/1.png" alt="Logo 1" className="w-[100%]" />
          </figure>
          <figure className="w-[25%]">
            <img src="img/2.png" alt="Logo 2" className="w-[100%]" />
          </figure>
          <figure className="w-[25%]">
            <img src="img/3.png" alt="Logo 3" className="w-[100%]" />
          </figure>
          <figure className="w-[25%]">
            <img src="img/4.png" alt="Logo 4" className="w-[100%]" />
          </figure>
        </div>
      </div>
    </section>

    <section className="w-full flex justify-center h-auto">
      <div className="w-full container h-auto flex flex-wrap 2xl:px-36 py-16 justify-between">
        <div className="w-full lg:w-[50%] bg-color px-5 py-5">
          <h2 className="text-3xl font-bold">Travel Agency Inc.</h2>
          <p className="my-5">
            Travel duru nisl quam nestibulum ac quam nec odio elementum sceisue
            the aucan ligula.Orci varius natoque penatibus et magins dis
            parturient monte nascete ridiculus mun nellentesque habitant morbine.
          </p>
          <div className="flex items-center w-full">
            <i className="bi bi-telephone-outbound me-4 text-color4 text-xl"></i>
            <div>
              <p>Phone</p>
              <p className="text-color4 text-xl">09188085590</p>
            </div>
          </div>
          <div className="flex items-center w-full my-5">
            <i className="bi bi-envelope-paper me-4 text-color4 text-xl"></i>
            <div>
              <p>e-Mail Address</p>
              <p className="text-color4 text-xl">l.hazrati78@yahoo.com</p>
            </div>
          </div>
          <div className="flex items-center w-full">
            <i className="bi bi-geo-alt me-4 text-color4 text-xl"></i>
            <div>
              <p>Location</p>
              <p>Tehran, Iran</p>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-[50%] bg-color px-5 py-5">
          <form action="" className="w-full text-gray-100">
            <p className="bg-color1 w-full text-center text-white py-5 text-xl font-bold">
              Get in touch
            </p>
            <div className="px-5 py-8 bg-color7">
              <div className="flex justify-between mx-5">
                <input
                  type="text"
                  placeholder="Your Name *"
                  required
                  className="w-[50%] py-2 px-4 me-3 focus:outline-none"
                />
                <input
                  type="email"
                  placeholder="Your Email *"
                  required
                  className="w-[50%] py-2 px-4 focus:outline-none"
                />
              </div>
              <input
                type="text"
                placeholder="Subject *"
                className="w-[100%] py-2 my-5 px-4 focus:outline-none"
                required
              />
              <textarea
                placeholder="Message *"
                required
                className="w-[100%] h-[200px] py-4 px-4 focus:outline-none"
              ></textarea>
              <button className="bg-color1 text-white py-2 px-4 my-5">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>

    <section className="w-full flex justify-center h-auto bg-color3">
      <footer className="w-full container h-auto flex flex-col 2xl:px-36">
        <div className="flex justify-center border items-center border-1 border-color5 my-10 flex-wrap mx-6">
          <div className="w-full lg:w-[30%] flex items-center py-2 lg:border-r-2 lg:border-r-color5 my-5 ps-8 lg:ps-0">
            <i className="bi bi-telephone-outbound text-4xl me-4 text-white bg-color1 p-3"></i>
            <div className="w-full text-white">
              <p className="font-secondary">Call me</p>
              <p>09188085590</p>
            </div>
          </div>
          <div className="w-full lg:w-[35%] flex items-center py-2 lg:border-r-2 lg:border-r-color5 my-5 ps-8">
            <i className="bi bi-envelope-paper text-4xl me-4 text-white bg-color1 p-3"></i>
            <div className="w-full text-white">
              <p className="font-secondary">Write to me</p>
              <p>l.hazrati78@yahoo.com</p>
            </div>
          </div>
          <div className="w-full lg:w-[30%] flex items-center py-2 my-5 ps-8">
            <i className="bi bi-map text-4xl me-4 text-white bg-color1 p-3"></i>
            <div className="w-full text-white">
              <p className="font-secondary">Address</p>
              <p>Tehran, Iran</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between my-10 flex-wrap">
          <div className="w-full md:w-[30%] flex flex-col py-2 my-5 px-6">
            <figure className="w-[80%]">
              <img src="img/logo-light.png" alt="Logo" className="w-[100%]" />
            </figure>
            <p className="text-color6 my-5">
              Quisque imperdiet sapien porttitor the bibendum sellentesque the
              commodo erat acar accumsa lobortis, enim diam the nesuen.
            </p>
            <ul className="flex">
              <li className="me-5">
                <a href="">
                  <i className="bi bi-instagram text-white bg-color1 p-3 rounded-[50%]"></i>
                </a>
              </li>
              <li className="me-5">
                <a href="">
                  <i className="bi bi-github text-white bg-color1 p-3 rounded-[50%]"></i>
                </a>
              </li>
              <li className="me-5">
                <a href="">
                  <i className="bi bi-linkedin text-white bg-color1 p-3 rounded-[50%]"></i>
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-[30%] flex flex-col py-2 my-5 md:ps-20 px-6">
            <p className="font-secondary text-white text-xl xl:text-2xl">Quick Links</p>
            <ul className="mt-7 px-6">
              <li className="my-2 list-disc marker:text-color1">
                <a href="" className="text-color6">
                  About
                </a>
              </li>
              <li className="list-disc marker:text-color1">
                <a href="" className="text-color6">
                  Tours
                </a>
              </li>
              <li className="my-2 list-disc marker:text-color1">
                <a href="" className="text-color6">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-[28%] flex flex-col py-2 my-5 px-6 md:px-0">
            <p className="font-secondary text-2xl text-white">Subscribe</p>
            <p className="text-color6 mt-5">
              Sign up for our monthly blogletter to stay informed about travel and tours
            </p>
            <form action="" className="mt-5 flex w-full flex-wrap">
              <input
                type="email"
                placeholder="Email Address"
                className="px-2 py-5"
              />
              <a
                href=""
                className="text-white bg-color4 py-5 px-3 flex mt-0 md:mt-2 lg:mt-0"
              >
                Send
              </a>
            </form>
          </div>
        </div>
        <p className="text-stone-300 text-left py-5 text-[14px] relative before:content-[''] before:h-[3px] before:w-[100%] before:bg-stone-400 before:absolute before:top-0 before:bg-opacity-50">
          © 2024 Bu Country Tours, Lda - All rights reserved.
        </p>
      </footer>
    </section>

    </section>
    </main>
  );
}
