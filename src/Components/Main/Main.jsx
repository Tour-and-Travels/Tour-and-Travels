import React from 'react'
import './main.css'
import { HiOutlineClipboardCheck, HiOutlineLocationMarker } from 'react-icons/hi'
import img from '../../Assets/img.jpg'
import img2 from '../../Assets/img2.jpg'
import img3 from '../../Assets/img3.jpg'
import img4 from '../../Assets/img4.jpg'
import img5 from '../../Assets/img5.jpg'
import img6 from '../../Assets/img6.jpg'
import img7 from '../../Assets/img7.jpg'
import img8 from '../../Assets/img8.jpg'
import img9 from '../../Assets/img9.jpg'


const Data =[

  {
    id:1,
    imgSrc: img,
    destTitle: 'Bora Bora',
    location: 'New Zealand',
    grade: 'CULTURAL RELAX',
    fees: '$700',
    description: 'The epitome of romance , Bora Bora is one of the best travel destinations in the Worlds. This place is known for its luxurious stays and addventurous activities .'
  } , 
  {
    id: 2,
    imgSrc: img2,
    destTitle: "Machu Picchu",
    location: "Peru",
    grade: "HISTORICAL ADVENTURE",
    fees: "$800",
    description: "Machu Picchu, the ancient Incan city, is nestled high in the Andes and offers a breathtaking blend of history and adventure."
},
{
    id: 3,
    imgSrc: img3,
    destTitle: "The Great Barrier Reef",
    location: "Australia",
    grade: "MARINE EXPLORATION",
    fees: "$900",
    description: "Explore the wonders of the underwater world at The Great Barrier Reef, a UNESCO World Heritage site known for its vibrant coral reefs and diverse marine life."
},
{
    id: 4,
    imgSrc: img4,
    destTitle: "Cappadocia",
    location: "Turkey",
    grade: "SCENIC ADVENTURE",
    fees: "$600",
    description: "Experience the unique landscapes of Cappadocia, known for its fairy-tale-like rock formations, cave dwellings, and hot air balloon rides."
},
{
    id: 5,
    imgSrc: img5,
    destTitle: "Guanajuato",
    location: "Mexico",
    grade: "CULTURAL DISCOVERY",
    fees: "$750",
    description: "Guanajuato, a charming Mexican town, boasts colorful architecture, narrow streets, and a rich cultural heritage waiting to be explored."
},
{
    id: 6,
    imgSrc: img6,
    destTitle: "Cinque Terre",
    location: "Italy",
    grade: "COASTAL DELIGHT",
    fees: "$850",
    description: "Cinque Terre, a collection of picturesque seaside villages, offers stunning coastal views, hiking trails, and a taste of authentic Italian life."
},
{
    id: 7,
    imgSrc: img7,
    destTitle: "Angkor Wat",
    location: "Cambodia",
    grade: "HISTORICAL WONDER",
    fees: "$700",
    description: "Angkor Wat, the largest religious monument in the world, is a captivating archaeological site that showcases the grandeur of ancient Khmer architecture."
},
{
    id: 8,
    imgSrc: img8,
    destTitle: "Taj Mahal",
    location: "India",
    grade: "ARCHITECTURAL SPLENDOR",
    fees: "$1000",
    description: "Visit the iconic Taj Mahal, a symbol of eternal love, and marvel at its exquisite white marble architecture set against the backdrop of the Yamuna River."
},
{
    id: 9,
    imgSrc: img9,
    destTitle: "Bali Island",
    location: "Indonesia",
    grade: "TROPICAL PARADISE",
    fees: "$1200",
    description: "Escape to Bali Island, a tropical paradise known for its lush landscapes, vibrant culture, and pristine beaches, offering a perfect blend of relaxation and adventure."
}
]



const Main = () => {
  return (
    <section className='main container section'>
      <div className="secTitle">
        <h3 className="title">
          Most visited destinations
        </h3>
      </div>

      <div className="secContent grid">
        {Data.map(({ id, imgSrc, destTitle, location, grade, fees, description }) => {
          return (
            <div key={id} className="singleDestination">

              <div className="imageDiv">
                <img src={imgSrc} alt={destTitle} />
              </div>

              <div className="cardInfo">
                <h4 className="destTitle">{destTitle}</h4>
                <span className="continent flex">
                  <HiOutlineLocationMarker className='icon' />
                  <span className="name">{location}</span>
                </span>

                <div className="fees flex">
                  <div className="grade">
                    <span>{grade}<small>+1</small></span>
                  </div>
                  <div className="price">
                    <h5>{fees}</h5>
                  </div>
                </div>

                <div className="desc">
                  <p>{description}</p>
                </div>

                <button className="btn flex">
                  DETAILS <HiOutlineClipboardCheck className="icon" />
                </button>

              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Main