import React , {useEffect , useState} from 'react'

function CountdownTimer({ targetDate }) {
    const calculateTimeLeft = () => {
        const difference = new Date(targetDate) - new Date();
        let timeLeft = {};
    
        if (difference > 0) {
          timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
          };
        }
    
        return timeLeft;
      };
    
      const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    
      useEffect(() => {
        const timer = setTimeout(() => {
          setTimeLeft(calculateTimeLeft());
        }, 1000);
    
        return () => clearTimeout(timer);
      });
    
      const formatTime = (time) => {
        return time < 10 ? `0${time}` : time;
      };
    
      return (
        <div>
          {timeLeft.days > 0 && (
            <span>
              {timeLeft.days} day&nbsp;
            </span>
          )}
          {timeLeft.days < 0 && timeLeft.hours < 0 && timeLeft.minutes < 0 && timeLeft.seconds < 0 ? (
            "Out of time"
          ) : (
            <>
              {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:
              {formatTime(timeLeft.seconds)} 
            </>
          )}
        </div>
      );
}

export default CountdownTimer

