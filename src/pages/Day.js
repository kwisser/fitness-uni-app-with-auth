import { useLocation } from 'react-router-dom';

const Day = () => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const date = searchParams.get('date');

    return (
        <div>
        <h1>Day {date}</h1>
        </div>
    );
    }

export default Day;