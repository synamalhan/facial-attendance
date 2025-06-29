import React, { useState, useEffect, useRef } from 'react';
import { Camera, CameraOff, User, CheckCircle, AlertCircle, Scan, Zap, Activity, Shield, Eye } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const FaceRecognition: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [detectedUser, setDetectedUser] = useState<any>(null);
  const [confidence, setConfidence] = useState(0);
  const [attendanceMarked, setAttendanceMarked] = useState(false);
  const [scanCount, setScanCount] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { user } = useAuth();

  // Mock users for face recognition demo
  const mockUsers = [
    {
      id: '1',
      name: 'Alex Morgan',
      employeeId: 'EMP001',
      department: 'IT',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
    },
    {
      id: '2',
      name: 'Sarah Chen',
      employeeId: 'EMP002',
      department: 'HR',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
    },
    {
      id: '3',
      name: 'Michael Rodriguez',
      employeeId: 'EMP003',
      department: 'Engineering',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
    }
  ];

  useEffect(() => {
    if (isActive) {
      startCamera();
      simulateDetection();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isActive]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 640, height: 480 } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      // Fallback to demo mode without actual camera
      simulateCameraFeed();
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const simulateCameraFeed = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.width = 640;
        canvas.height = 480;
        
        // Create a sophisticated gradient background
        const gradient = ctx.createRadialGradient(320, 240, 0, 320, 240, 400);
        gradient.addColorStop(0, '#1E1B4B');
        gradient.addColorStop(0.5, '#312E81');
        gradient.addColorStop(1, '#1F2937');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 640, 480);
        
        // Add scanning lines effect
        for (let i = 0; i < 480; i += 4) {
          ctx.fillStyle = `rgba(139, 92, 246, ${0.1 + Math.sin(Date.now() * 0.01 + i * 0.1) * 0.05})`;
          ctx.fillRect(0, i, 640, 2);
        }
        
        // Add corner brackets
        ctx.strokeStyle = '#8B5CF6';
        ctx.lineWidth = 3;
        const cornerSize = 40;
        
        // Top-left
        ctx.beginPath();
        ctx.moveTo(50, 50 + cornerSize);
        ctx.lineTo(50, 50);
        ctx.lineTo(50 + cornerSize, 50);
        ctx.stroke();
        
        // Top-right
        ctx.beginPath();
        ctx.moveTo(590 - cornerSize, 50);
        ctx.lineTo(590, 50);
        ctx.lineTo(590, 50 + cornerSize);
        ctx.stroke();
        
        // Bottom-left
        ctx.beginPath();
        ctx.moveTo(50, 430 - cornerSize);
        ctx.lineTo(50, 430);
        ctx.lineTo(50 + cornerSize, 430);
        ctx.stroke();
        
        // Bottom-right
        ctx.beginPath();
        ctx.moveTo(590 - cornerSize, 430);
        ctx.lineTo(590, 430);
        ctx.lineTo(590, 430 - cornerSize);
        ctx.stroke();
        
        // Add "DEMO MODE" text with better styling
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('DEMO MODE', 320, 240);
        
        ctx.fillStyle = 'rgba(139, 92, 246, 0.8)';
        ctx.font = '16px Arial';
        ctx.fillText('Camera Simulation Active', 320, 270);
        
        // Add scan count
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.font = '14px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(`Scans: ${scanCount}`, 60, 400);
      }
    }
  };

  const simulateDetection = () => {
    const interval = setInterval(() => {
      if (!isActive) {
        clearInterval(interval);
        return;
      }

      setIsProcessing(true);
      setScanCount(prev => prev + 1);
      
      // Simulate face detection with random confidence
      setTimeout(() => {
        const randomUser = mockUsers[Math.floor(Math.random() * mockUsers.length)];
        const randomConfidence = 85 + Math.random() * 15; // 85-100%
        
        setDetectedUser(randomUser);
        setConfidence(randomConfidence);
        setIsProcessing(false);
        
        // Clear detection after 4 seconds
        setTimeout(() => {
          setDetectedUser(null);
          setConfidence(0);
        }, 4000);
      }, 2000);
    }, 10000);

    return () => clearInterval(interval);
  };

  const markAttendance = () => {
    if (detectedUser) {
      setAttendanceMarked(true);
      setTimeout(() => {
        setAttendanceMarked(false);
        setDetectedUser(null);
      }, 3000);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 relative overflow-hidden">
        {/* Header with enhanced styling */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg shadow-purple-500/25">
                <Scan className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">AI Face Recognition Scanner</h3>
                <p className="text-purple-200/70 flex items-center mt-1">
                  <Eye className="w-4 h-4 mr-2" />
                  Advanced biometric identification system
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsActive(!isActive)}
              className={`flex items-center px-6 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-lg ${
                isActive
                  ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-red-500/25'
                  : 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-emerald-500/25'
              } transform hover:scale-105 active:scale-95`}
            >
              {isActive ? (
                <>
                  <CameraOff className="w-5 h-5 mr-2" />
                  Stop Scanner
                </>
              ) : (
                <>
                  <Camera className="w-5 h-5 mr-2" />
                  Start Scanner
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Camera Feed - Takes up 2 columns */}
            <div className="xl:col-span-2">
              <div className="relative">
                <div className="aspect-video bg-black/50 rounded-2xl overflow-hidden relative border border-white/20 shadow-2xl">
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                    style={{ display: isActive ? 'block' : 'none' }}
                  />
                  <canvas
                    ref={canvasRef}
                    className="w-full h-full object-cover"
                    style={{ display: isActive && !videoRef.current?.srcObject ? 'block' : 'none' }}
                  />
                  
                  {!isActive && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-900/50 to-indigo-900/50">
                      <div className="text-center">
                        <div className="w-20 h-20 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-purple-500/30">
                          <Camera className="w-10 h-10 text-purple-400" />
                        </div>
                        <p className="text-purple-200 text-lg font-medium">Camera Scanner Inactive</p>
                        <p className="text-purple-300/70 text-sm mt-2">Click "Start Scanner" to begin face detection</p>
                      </div>
                    </div>
                  )}

                  {/* Enhanced Scanning Animation */}
                  {isActive && isProcessing && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <div className="relative">
                        <div className="w-32 h-32 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
                        <div className="absolute inset-4 border-2 border-indigo-500/30 border-b-indigo-500 rounded-full animate-spin animate-reverse"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Scan className="w-8 h-8 text-purple-400 animate-pulse" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Enhanced Detection Overlay */}
                  {detectedUser && (
                    <div className="absolute top-6 left-6 right-6">
                      <div className="bg-gradient-to-r from-emerald-500/90 via-green-500/90 to-emerald-600/90 backdrop-blur-xl rounded-2xl p-6 border border-emerald-400/30 shadow-2xl shadow-emerald-500/25 animate-slideDown">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                            <CheckCircle className="w-7 h-7 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="text-white font-bold text-lg">Face Detected Successfully!</p>
                            <div className="flex items-center mt-1">
                              <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                              <p className="text-emerald-100 text-sm">Confidence: {confidence.toFixed(1)}% • High Accuracy</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Enhanced Scanning Indicator */}
                  {isActive && (
                    <div className="absolute bottom-6 left-6">
                      <div className="flex items-center bg-purple-500/90 backdrop-blur-xl rounded-xl px-4 py-3 border border-purple-400/30 shadow-lg">
                        <div className="relative mr-3">
                          <Scan className="w-5 h-5 text-white animate-pulse" />
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                        </div>
                        <div>
                          <span className="text-white text-sm font-medium">AI Scanning Active</span>
                          <p className="text-purple-100 text-xs">Neural network processing...</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Scan counter */}
                  {isActive && (
                    <div className="absolute bottom-6 right-6">
                      <div className="bg-black/50 backdrop-blur-xl rounded-xl px-4 py-2 border border-white/20">
                        <p className="text-white text-sm">Scans: <span className="font-bold text-purple-300">{scanCount}</span></p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Enhanced Detection Results Panel */}
            <div className="space-y-6">
              {/* System Status */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-xl">
                <h4 className="text-white font-bold mb-4 flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-purple-400" />
                  System Status
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-purple-200">Scanner</span>
                    <div className={`flex items-center text-sm ${isActive ? 'text-emerald-400' : 'text-gray-400'}`}>
                      <div className={`w-2 h-2 rounded-full mr-2 ${isActive ? 'bg-emerald-400 animate-pulse' : 'bg-gray-400'}`}></div>
                      {isActive ? 'Online' : 'Offline'}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-purple-200">AI Processing</span>
                    <div className={`flex items-center text-sm ${isProcessing ? 'text-yellow-400' : 'text-gray-400'}`}>
                      <Zap className={`w-3 h-3 mr-2 ${isProcessing ? 'animate-pulse' : ''}`} />
                      {isProcessing ? 'Analyzing' : 'Idle'}
                    </div>
                  </div>
                  {confidence > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-purple-200">Confidence</span>
                      <span className="text-emerald-400 text-sm font-bold">{confidence.toFixed(1)}%</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-purple-200">Total Scans</span>
                    <span className="text-purple-100 text-sm font-medium">{scanCount}</span>
                  </div>
                </div>
              </div>

              {/* Enhanced Detected Employee Card */}
              {detectedUser && (
                <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 border border-emerald-500/30 backdrop-blur-xl shadow-lg shadow-emerald-500/10 animate-slideUp">
                  <h4 className="text-white font-bold mb-4 flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-emerald-400" />
                    Employee Identified
                  </h4>
                  <div className="flex items-center mb-6">
                    <div className="relative">
                      <img
                        src={detectedUser.avatar}
                        alt={detectedUser.name}
                        className="w-16 h-16 rounded-2xl mr-4 border-2 border-emerald-400/50"
                      />
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-emerald-400 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <div>
                      <p className="text-white font-bold text-lg">{detectedUser.name}</p>
                      <p className="text-emerald-200 text-sm">{detectedUser.employeeId}</p>
                      <p className="text-purple-300 text-sm">{detectedUser.department}</p>
                    </div>
                  </div>
                  
                  {!attendanceMarked ? (
                    <button
                      onClick={markAttendance}
                      className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/25"
                    >
                      <div className="flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Mark Attendance
                      </div>
                    </button>
                  ) : (
                    <div className="w-full bg-gradient-to-r from-emerald-500/20 to-green-500/20 border-2 border-emerald-500/40 text-emerald-300 font-bold py-4 px-6 rounded-2xl text-center backdrop-blur-sm">
                      <div className="flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        ✓ Attendance Marked Successfully
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Enhanced Instructions */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-xl">
                <h4 className="text-white font-bold mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2 text-purple-400" />
                  Quick Start Guide
                </h4>
                <ul className="text-purple-200 text-sm space-y-3">
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <span className="text-purple-300 text-xs font-bold">1</span>
                    </div>
                    <span>Click "Start Scanner" to activate the AI face detection system</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <span className="text-purple-300 text-xs font-bold">2</span>
                    </div>
                    <span>Position your face clearly within the camera frame</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <span className="text-purple-300 text-xs font-bold">3</span>
                    </div>
                    <span>Wait for the AI to process and recognize your identity</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <span className="text-purple-300 text-xs font-bold">4</span>
                    </div>
                    <span>Confirm attendance when prompted by the system</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaceRecognition;