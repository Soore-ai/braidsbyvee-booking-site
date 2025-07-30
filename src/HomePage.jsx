import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import Gallery from './Gallery';
import ServiceCard from './components/ServiceCard'; // adjust path if needed

function HomePage() {
  return (
    <div className="home">
      <section className="hero">
        <h1>Braids by Vee</h1>
        <p>Expert braiding services in Mississauga — feel confident and beautiful.</p>
        <Link to="/book" className="cta-button">Book Now</Link>
      </section>

      <section className="gallery">
        <Gallery />
      </section>

     <section id="services" className="services">
  <h2>Our Services</h2>
  <div className="service-list">
    {[
      {
        title: 'Knotless Braids',
        description: 'Lightweight, protective, and beautiful.',
        file: 'braids.jpg',
        alt: 'Braids',
      },
      {
        title: 'Passion Twists',
        description: 'Soft, romantic twist styles.',
        file: 'passion-twist.mp4',
        alt: 'Passion Twists',
      },
      {
        title: 'Cornrows',
        description: 'Stitched Cornrows.',
        file: 'stitched-cornrows.jpeg',
        alt: 'Cornrows',
      },
      {
        title: 'Box Braids',
        description: 'Nice and Clean.',
        file: 'box-braids.jpeg',
        alt: 'Box Braids',
      },
    ].map((service, index) => (
      <ServiceCard key={index} {...service} />
    ))}
  </div>
</section>
    </div>
  );
}

export default HomePage;
