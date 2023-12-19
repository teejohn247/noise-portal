/* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useState } from 'react';
// import AudioTimer from '@/components/Recorder/AudioTimer';
// import { ReactMic } from 'react-mic';

// const ReactRecorder: React.FC = () => {
//     const [isRunning, setIsRunning] = useState<boolean>(false);
//     const [elapsedTime, setElapsedTime] = useState<number>(0);
//     const [voice, setVoice] = useState<boolean>(false);
//     const [recordBlobLink, setRecordBlobLink] = useState<string | null>(null);

//     
//     const onStop = (recordedBlob: any) => {
//         setRecordBlobLink(recordedBlob?.blobURL);
//         setIsRunning(false);
//     };

//     const startHandle = () => {
//         setElapsedTime(0);
//         setIsRunning(true);
//         setVoice(true);
//     };

//     const stopHandle = () => {
//         setIsRunning(false);
//         setVoice(false);
//     };

//     const clearHandle = () => {
//         setIsRunning(false);
//         setVoice(false);
//         setRecordBlobLink(null);
//         setElapsedTime(0);
//     };

//     return (
//         <div>
//             <div className="max-w-sm border py-4 px-6 mx-auto bg-black">
//                 <h2 className="text-[22px] font-semibold">Audio Recorder</h2>
//                 <AudioTimer isRunning={isRunning} elapsedTime={elapsedTime} setElapsedTime={setElapsedTime} />

//                 <ReactMic
//                     record={voice}
//                     className="sound-wave w-full"
//                     onStop={onStop}
//                     strokeColor="#000000"
//                     mimeType="audio/wav" 
//                     // backgroundColor="#FF4081"
//                 />
//                 <div className="">
//                     {recordBlobLink ? (
//                         <button onClick={clearHandle} className="text-[#fff] font-medium text-[16px]">
//                             Clear
//                         </button>
//                     ) : (
//                         ''
//                     )}
//                 </div>
//                 <div className="mt-2">
//                     {!voice ? (
//                         <button onClick={startHandle} className="bg-[#fff] text-[#111] rounded-md py-1 px-3 font-semibold text-[16px]">
//                             Start
//                         </button>
//                     ) : (
//                         <button onClick={stopHandle} className="bg-[#fff] text-[#111] rounded-md py-1 px-3 font-semibold text-[16px]">
//                             Stop
//                         </button>
//                     )}
//                 </div>
//                 <div className="">
//                     {recordBlobLink ? <audio controls src={recordBlobLink} className="mt-6" /> : ''}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ReactRecorder;

// eslint-disable-next-line @typescript-eslint/no-explicit-any

import React, { useState, useEffect, useRef  } from 'react';
import AudioTimer from '@/components/Recorder/AudioTimer';
import { ReactMic } from 'react-mic';

const ReactRecorder: React.FC = () => {
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [voice, setVoice] = useState<boolean>(false);
    const [maxDecibel, setMaxDecibel] = useState<number>(0);
    const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null);
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    const [recordBlobLink, setRecordBlobLink] = useState<string | null>(null);

  
    const startHandle = () => {
        setIsRunning(true);
        setVoice(true);
       setElapsedTime(0);


        audioContextRef.current = new AudioContext();
        analyserRef.current = audioContextRef.current.createAnalyser();
        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
            const microphone = audioContextRef.current!.createMediaStreamSource(stream);
            microphone.connect(analyserRef.current!);
            analyserRef.current!.connect(audioContextRef.current!.destination);
            microphoneRef.current = microphone;
            intervalIdRef.current = setInterval(calculateDecibel, 100); // Start calculating decibel levels
            console.log('rer', intervalIdRef.current)
            if (microphoneRef.current) {
                microphoneRef.current.disconnect();
            }
        });
    };


    const stopHandle = () => {
        setIsRunning(false);
        setVoice(false);

        if (microphoneRef.current) {
            microphoneRef.current.disconnect();
        }

        if (audioContextRef.current) {
            audioContextRef.current.close();
        }

        if (intervalIdRef.current) {
            clearInterval(intervalIdRef.current); // Stop calculating decibel levels
        }

        setIsRunning(false);
        setVoice(false);
    };


      
    const onStop = (recordedBlob: any) => {
        setRecordBlobLink(recordedBlob?.blobURL);
        setIsRunning(false);
    };

   

    const clearHandle = () => {
        setIsRunning(false);
        setVoice(false);
        setRecordBlobLink(null);
        setElapsedTime(0);
    };

    const calculateDecibel = () => {
        const dataArray = new Uint8Array(analyserRef.current!.frequencyBinCount);
        analyserRef.current!.getByteFrequencyData(dataArray);

        let sum = 0;
        dataArray.forEach((value) => {
            sum += value * value;
        });

        const rms = Math.sqrt(sum / dataArray.length);
        console.log({rms})
        if (maxDecibel == 0) {
            setMaxDecibel(rms)
        }


        const decibel = 20 * Math.log10(rms / 120); // Assuming 8-bit audio, adjust accordingly if necessary
        console.log({decibel})
        console.log({maxDecibel})
        if (rms > maxDecibel) {
            // setMaxDecibel(rms)
            setMaxDecibel((prevMaxDecibel) => (rms > prevMaxDecibel ? rms : prevMaxDecibel));
        }

        console.log({maxDecibel})

    };
   
    return (
        <div>
            <div className="max-w-sm border py-4 px-6 mx-auto bg-black">
                <h2 className="text-[22px] font-semibold">Audio Recorder</h2>
                <AudioTimer isRunning={isRunning} elapsedTime={elapsedTime} maxDecibel={maxDecibel} setElapsedTime={setElapsedTime} />

                <ReactMic
                    record={voice}
                    className="sound-wave w-full"
                    onStop={onStop}
                    // onStop={() => {}}
                    strokeColor="#000000"
                    mimeType="audio/wav" 
                />

                <div className="">
                    {recordBlobLink ? (
                        <button onClick={clearHandle} className="text-[#fff] font-medium text-[16px]">
                            Clear
                        </button>
                    ) : (
                        ''
                    )}
                </div>

                <div className="mt-2">
                    {!voice ? (
                        <button onClick={startHandle} className="bg-[#fff] text-[#111] rounded-md py-1 px-3 font-semibold text-[16px]">
                            Start
                        </button>
                    ) : (
                        <button onClick={stopHandle} className="bg-[#fff] text-[#111] rounded-md py-1 px-3 font-semibold text-[16px]">
                            Stop
                        </button>
                    )}
                </div>

                <div className="">
                    {recordBlobLink ? <audio controls src={recordBlobLink} className="mt-6" /> : ''}
                </div>
            </div>
        </div>
    );
};

export default ReactRecorder;
