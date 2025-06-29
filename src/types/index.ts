export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'employee';
  department: string;
  avatar?: string;
  employeeId: string;
  isActive: boolean;
  createdAt: string;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  checkIn?: string;
  checkOut?: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'early_leave';
  workingHours: number;
  department: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface FaceRecognitionState {
  isActive: boolean;
  isProcessing: boolean;
  confidence: number;
  detectedUser: User | null;
  error: string | null;
}