// import React, { useState, useEffect, useRef } from 'react';
// import StringeeClient from 'stringee-client'; // Import your StringeeClient

const VideoCallApp = () => {
//     const [accessToken, setAccessToken] = useState('');
//     const [callTo, setCallTo] = useState('');
//     const [call, setCall] = useState(null);
//     const [callStatus, setCallStatus] = useState('Not started');
//     const [loggedUserId, setLoggedUserId] = useState('Have not joined yet!');
//     const [screenStream, setScreenStream] = useState(null);
//     const localVideoRef = useRef(null);
//     const remoteVideoRef = useRef(null);
//     const screenVideoRef = useRef(null);
//     const stringeeClient = useRef(new StringeeClient());

//     useEffect(() => {
//         // Setting up the client events
//         const client = stringeeClient.current;

//         client.on('connect', (res) => {
//             if (res) {
//                 setLoggedUserId('Connected');
//             }
//         });

//         client.on('disconnect', () => {
//             setLoggedUserId('Disconnected');
//         });

//         client.on('onIncomingCall', (incomingCall) => {
//             setCall(incomingCall);
//             // Show incoming call UI
//         });

//         return () => {
//             // Cleanup on component unmount
//             client.disconnect();
//         };
//     }, []);

//     const handleLogin = () => {
//         stringeeClient.current.connect(accessToken);
//     };

//     const copyToClipboard = (elementId) => {
//         const copyText = document.getElementById(elementId).textContent;
//         navigator.clipboard.writeText(copyText).then(() => {
//             alert('Token copied to clipboard!');
//         });
//     };

//     const startScreenShare = async () => {
//         try {
//             const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
//             screenVideoRef.current.srcObject = stream;
//             screenVideoRef.current.style.display = 'block';
//             screenVideoRef.current.play();
//         } catch (error) {
//             console.error('Error accessing screen:', error);
//         }
//     };

//     const makeCall = (isVideoCall) => {
//         const newCall = new StringeeCall(stringeeClient.current, fromNumber, callTo, isVideoCall);
//         setCall(newCall);
//         newCall.makeCall((res) => {
//             console.log('make call callback: ', res);
//         });
//         settingCallEvents(newCall);
//     };

//     const settingCallEvents = (callInstance) => {
//         callInstance.on('addremotestream', (stream) => {
//             remoteVideoRef.current.srcObject = stream;
//             remoteVideoRef.current.play();
//         });

//         callInstance.on('otherdevice', (data) => {
//             if (data.type === 'CALL_END') {
//                 callEnded();
//             }
//         });
//     };

//     const callEnded = () => {
//         setCall(null);
//         setCallStatus('Call ended');
//     };

//     const testHangupCall = () => {
//         call.hangup((res) => {
//             console.log('hangup res', res);
//             callEnded();
//         });
//     };

//     return (
//         <div className="container">
//             <div className="d-flex justify-content-center">
//                 <div className="frame">
//                     <div className="d-flex justify-content-center flex-column align-items-center">
//                         <h5>Access token for Recruiter role:</h5>
//                         <div className="token-container">
//                             <div className="copy-icon" onClick={() => copyToClipboard('enterpriseAccessToken')}>&#128203;</div>
//                             <p id="enterpriseAccessToken" className="token">YOUR_ACCESS_TOKEN_HERE</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div className="d-flex justify-content-center flex-column align-items-center">
//                 <textarea
//                     id="accessTokenArea"
//                     rows="6"
//                     cols="50"
//                     placeholder="Enter your access token here:"
//                     value={accessToken}
//                     onChange={(e) => setAccessToken(e.target.value)}
//                 />
//                 <br />
//                 <button id="loginBtn" onClick={handleLogin}>Join room</button>
//                 <span className="text-center" style={{ color: 'red' }}>Status: <span id="loggedUserId">{loggedUserId}</span></span>
//             </div>

//             <div className="d-flex justify-content-center flex-column align-items-center">
//                 <div>
//                     <br /> <br />
//                     Call to:
//                     <input
//                         id="callTo"
//                         type="text"
//                         name="toUsername"
//                         style={{ width: '200px' }}
//                         placeholder="Enter your partner ID:"
//                         value={callTo}
//                         onChange={(e) => setCallTo(e.target.value)}
//                     />
//                     <button disabled={!callTo} onClick={() => makeCall(true)}>Video call</button>
//                     <button disabled={!call} onClick={testHangupCall}>End call</button>
//                     <button disabled={!call} onClick={() => call.mute(!call.muted)}>Mute</button>
//                     <button disabled={!call} onClick={() => call.enableLocalVideo(!call.localVideoEnabled)}>Enable/Disable video</button>
//                     <button id="startScreenShare" onClick={startScreenShare}>Start Screen Share</button>
//                 </div>

//                 <div>
//                     Call status: <span id="callStatus" style={{ color: 'red' }}>{callStatus}</span>
//                 </div>

//                 <div id="incoming-call-div">
//                     <br />
//                     <button id="answerBtn" onClick={() => call.answer()}>Answer</button>
//                     <button id="rejectBtn" onClick={() => call.reject()}>Reject</button>
//                 </div>

//                 <div>
//                     <video ref={localVideoRef} playsInline autoPlay muted style={{ width: '600px', background: 'white', borderRadius: '20px' }}></video>
//                     <video ref={remoteVideoRef} playsInline autoPlay style={{ width: '600px', background: 'white', borderRadius: '20px' }}></video>
//                 </div>

//                 <div className="d-flex justify-content-center flex-column align-items-center">
//                     <video ref={screenVideoRef} playsInline autoPlay style={{ display: 'none' }}></video>
//                 </div>
//             </div>
//         </div>
//     );
};

export default VideoCallApp;
