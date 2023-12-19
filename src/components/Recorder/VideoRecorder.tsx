import { useState, useRef } from "react";

const mimeType = 'video/webm; codecs="opus,vp8"';

const VideoRecorder: React.FC = () => {
	const [permission, setPermission] = useState<boolean>(false);

	const mediaRecorder = useRef<MediaRecorder | null>(null);

	const liveVideoFeed = useRef<HTMLVideoElement | null>(null);

	const [recordingStatus, setRecordingStatus] = useState<string>("inactive");

	const [stream, setStream] = useState<MediaStream | null>(null);

	const [recordedVideo, setRecordedVideo] = useState<string | null>(null);

	const [videoChunks, setVideoChunks] = useState<Blob[]>([]);

	const getCameraPermission = async (): Promise<void> => {
		setRecordedVideo(null);

		if ("MediaRecorder" in window) {
			try {
				const videoConstraints: MediaStreamConstraints = {
					audio: false,
					video: true,
				};
				const audioConstraints: MediaStreamConstraints = { audio: true };

				const audioStream = await navigator.mediaDevices.getUserMedia(audioConstraints);
				const videoStream = await navigator.mediaDevices.getUserMedia(videoConstraints);

				setPermission(true);

				const combinedStream = new MediaStream([
					...videoStream.getVideoTracks(),
					...audioStream.getAudioTracks(),
				]);

				setStream(combinedStream);

				if (liveVideoFeed.current) {
					liveVideoFeed.current.srcObject = videoStream;
				}
			} catch (err) {
				alert(err);
			}
		} else {
			alert("The MediaRecorder API is not supported in your browser.");
		}
	};

	const startRecording = async (): Promise<void> => {
		setRecordingStatus("recording");

		if (stream) {
			const media = new MediaRecorder(stream, { mimeType });

			mediaRecorder.current = media;

			mediaRecorder.current.start();

			// eslint-disable-next-line prefer-const
			let localVideoChunks: Blob[] = [];

			mediaRecorder.current.ondataavailable = (event) => {
				if (typeof event.data === "undefined") return;
				if (event.data.size === 0) return;
				localVideoChunks.push(event.data);
			};

			setVideoChunks(localVideoChunks);
		}
	};

	const stopRecording = (): void => {
		setPermission(false);
		setRecordingStatus("inactive");

		if (mediaRecorder.current) {
			mediaRecorder.current.stop();

			mediaRecorder.current.onstop = () => {
				const videoBlob = new Blob(videoChunks, { type: mimeType });
				const videoUrl = URL.createObjectURL(videoBlob);

				setRecordedVideo(videoUrl);

				setVideoChunks([]);
			};
		}
	};

	return (
		<div>
			<h2>Video Recorder</h2>
			<main>
				<div className="video-controls">
					{!permission ? (
						<button onClick={getCameraPermission} type="button" style={{background: 'red', color:'white'}}>
							Record Live Video
						</button>
					) : null}
					{permission && recordingStatus === "inactive" ? (
						<button onClick={startRecording} type="button" style={{background: 'green', color:'white'}}>
							Start Recording
						</button>
					) : null}
					
					{recordingStatus === "recording" ? (
						<button onClick={stopRecording} type="button" style={{background: 'red', color:'white'}}>
							Stop Recording
						</button>
					) : null}
					{permission && recordingStatus === "recording" ? (
						<h3 style={{color:'red'}}>
							Recording...
						</h3>
					) : null}
				</div>
			</main>

			<div className="video-player">
				{!recordedVideo ? (
					<video ref={liveVideoFeed} autoPlay className="live-player"></video>
				) : null}
				{recordedVideo ? (
					<div className="recorded-player">
						<video className="recorded" src={recordedVideo} controls></video>
						<a download href={recordedVideo}>
							Download Recording
						</a>
					</div>
				) : null}
			</div>
		</div>
	);
};

export default VideoRecorder;
