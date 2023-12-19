import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars

interface AudioTimerProps {
    isRunning: boolean;
    setElapsedTime: React.Dispatch<React.SetStateAction<number>>;
    elapsedTime: number;
    maxDecibel: number;
}

// const AudioTimer = ({ 
//     isRunning: boolean,
//     // setIsRunning,
//     elapsedTime: number,
//     setElapsedTime: number  }) => {


const AudioTimer: React.FC<AudioTimerProps> = ({ isRunning, setElapsedTime, elapsedTime, maxDecibel }) => {

    React.useEffect(() => {
        let intervalId: string | number | NodeJS.Timeout | undefined;
        if (isRunning) {
            // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
            intervalId = setInterval(() => setElapsedTime(elapsedTime + 1), 10);
        }
        return () => clearInterval(intervalId);
    }, [isRunning, elapsedTime]);

    //  calculation
    const hours = Math.floor(elapsedTime / 360000);
    const minutes = Math.floor((elapsedTime % 360000) / 6000);
    const seconds = Math.floor((elapsedTime % 6000) / 100);
    const milliseconds = elapsedTime % 100;

    return (
        <div className="  mt-4 font-semibold " style={{display: 'flex', justifyContent: 'space-between'}}>
            <div className="time" style={{color: 'white'}}>
                {hours}:{minutes.toString().padStart(2, "0")}:
                <span className="  inline-block " style={{width: '30px'}}> {seconds.toString().padStart(2, "0")}:</span>
                <span className=" inline-block ml-3" style={{width: '30px'}}>{milliseconds.toString().padStart(2, "0")}</span>
            </div>
            <div className="time" style={{color: 'white'}}>
                <span className=" inline-block ml-3" style={{width: '100px'}}>{maxDecibel.toFixed(2)} DB</span>
            </div>
        </div>
    );
};

export default AudioTimer;