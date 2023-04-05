import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export const Banner = (): JSX.Element => {
  return (
    <div className='relative '>
      <div className='absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20' />
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={3500}
      >
        <div>
          <img loading='lazy' src='https://links.papareact.com/gi1' alt='banner' />
        </div>
        <div>
          <img loading='lazy' src='https://links.papareact.com/6ff' alt='banner' />
        </div>
        <div>
          <img loading='lazy' src='https://links.papareact.com/7ma' alt='banner' />
        </div>
      </Carousel>
    </div>
  );
};
