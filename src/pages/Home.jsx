import Hero from '../components/Hero';
import StatsStrip from '../components/StatsStrip';
import VirtualTour from '../components/VirtualTour';
import Amenities from '../components/Amenities';
import Gallery from '../components/Gallery';
import Location from '../components/Location';
import Booking from '../components/Booking';

export default function Home() {
    return (
        <>
            <Hero />
            <StatsStrip />
            <VirtualTour />
            <Amenities />
            <Gallery />
            <Location />
            <Booking />
        </>
    );
}
