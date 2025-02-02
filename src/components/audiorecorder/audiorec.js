import React, { useState, useRef, useEffect } from 'react';
// import { Pause, Play, Send, Square } from 'lucide-react';

const AudioRecorder = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);

    const mediaRecorder = useRef(null);
    const audioChunks = useRef([]);

    useEffect(() => {
        // Cleanup function
        return () => {
            if (mediaRecorder.current && mediaRecorder.current.state !== 'inactive') {
                mediaRecorder.current.stop();
            }
        };
    }, []);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder.current = new MediaRecorder(stream);
            audioChunks.current = []; // Reset chunks when starting new recording

            mediaRecorder.current.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunks.current.push(event.data);
                }
            };

            mediaRecorder.current.onstop = () => {
                const blob = new Blob(audioChunks.current, { type: 'audio/webm' });
                setAudioBlob({
                    blob: blob,
                    blobURL: URL.createObjectURL(blob)
                });

                // Stop all tracks
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorder.current.start(200); // Collect data every 200ms
            setIsRecording(true);
            setIsPaused(false);
        } catch (err) {
            console.error('Error accessing microphone:', err);
        }
    };

    const pauseRecording = () => {
        if (mediaRecorder.current && mediaRecorder.current.state === 'recording') {
            mediaRecorder.current.pause();
            setIsPaused(true);
            setIsRecording(false);
        }
    };

    const resumeRecording = () => {
        if (mediaRecorder.current && mediaRecorder.current.state === 'paused') {
            mediaRecorder.current.resume();
            setIsPaused(false);
            setIsRecording(true);
        }
    };

    const stopRecording = () => {
        if (mediaRecorder.current && mediaRecorder.current.state !== 'inactive') {
            mediaRecorder.current.stop();
            setIsRecording(false);
            setIsPaused(false);
        }
    };

    const sendRecording = () => {
        if (audioBlob) {
            console.log('Sending audio blob:', audioBlob);
        }
    };

    return (
        <div className="card w-100 mx-auto" style={{ maxWidth: '500px' }}>
            <div className="card-header">
                <h5 className="card-title mb-0">Audio Recorder</h5>
            </div>
            <div className="card-body">
                <div className="bg-light rounded p-3 mb-4 text-center">
                    {isRecording && (
                        <div className="pulsing-dot"></div>
                    )}
                    {isPaused && (
                        <div className="text-warning">Recording Paused</div>
                    )}
                    {!isRecording && !isPaused && (
                        <div className="text-muted">Ready to Record</div>
                    )}
                </div>

                <div className="d-flex justify-content-center gap-3">
                    {!isRecording && !isPaused ? (
                        <button
                            onClick={startRecording}
                            className="btn btn-success d-flex align-items-center"
                        >
                            {/* <Play className="me-2" size={16} /> */}
                            Start
                        </button>
                    ) : (
                        <>
                            {isPaused ? (
                                <button
                                    onClick={resumeRecording}
                                    className="btn btn-success d-flex align-items-center"
                                >
                                    {/* <Play className="me-2" size={16} /> */}
                                    Resume
                                </button>
                            ) : (
                                <button
                                    onClick={pauseRecording}
                                    className="btn btn-warning d-flex align-items-center"
                                >
                                    {/* <Pause className="me-2" size={16} /> */}
                                    Pause
                                </button>
                            )}

                            <button
                                onClick={stopRecording}
                                className="btn btn-danger d-flex align-items-center"
                            >
                                {/* <Square className="me-2" size={16} /> */}
                                Stop
                            </button>
                        </>
                    )}

                    {audioBlob && !isRecording && (
                        <button
                            onClick={sendRecording}
                            className="btn btn-primary d-flex align-items-center"
                        >
                            {/* <Send className="me-2" size={16} /> */}
                            Send
                        </button>
                    )}
                </div>

                {audioBlob && (
                    <div className="mt-4">
                        <audio
                            src={audioBlob.blobURL}
                            controls
                            className="w-100"
                        />
                    </div>
                )}
            </div>

            <style jsx>{`
        .pulsing-dot {
          width: 10px;
          height: 10px;
          background-color: red;
          border-radius: 50%;
          margin: 0 auto;
          animation: pulse 1s infinite;
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.5);
            opacity: 0.7;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
        </div>
    );
};

export default AudioRecorder;