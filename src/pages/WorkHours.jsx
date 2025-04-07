import { useState, useEffect } from 'react';
import { Clock, Play, Square, History } from 'lucide-react';

export default function WorkHours() {
  const [isTracking, setIsTracking] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timeHistory, setTimeHistory] = useState([]);

  useEffect(() => {
    let interval;
    if (isTracking) {
      interval = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTracking, startTime]);

  const formatTime = (ms) => {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor(ms / (1000 * 60 * 60));
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleStartTracking = () => {
    setIsTracking(true);
    setStartTime(Date.now());
  };

  const handleStopTracking = () => {
    setIsTracking(false);
    const duration = Date.now() - startTime;
    const session = {
      date: new Date().toLocaleDateString(),
      duration: formatTime(duration),
      startTime: new Date(startTime).toLocaleTimeString(),
      endTime: new Date().toLocaleTimeString()
    };
    setTimeHistory([session, ...timeHistory]);
    setElapsedTime(0);
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Clock className="text-blue-600" />
          Time Tracking
        </h2>
        
        <div className="text-4xl font-mono text-center py-8">
          {formatTime(elapsedTime)}
        </div>

        <div className="flex justify-center gap-4">
          {!isTracking ? (
            <button
              onClick={handleStartTracking}
              className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
            >
              <Play size={20} />
              Start
            </button>
          ) : (
            <button
              onClick={handleStopTracking}
              className="flex items-center gap-2 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
            >
              <Square size={20} />
              Stop
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <History className="text-blue-600" />
          Recent Sessions
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Date</th>
                <th className="text-left py-2">Start Time</th>
                <th className="text-left py-2">End Time</th>
                <th className="text-left py-2">Duration</th>
              </tr>
            </thead>
            <tbody>
              {timeHistory.map((session, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-2">{session.date}</td>
                  <td className="py-2">{session.startTime}</td>
                  <td className="py-2">{session.endTime}</td>
                  <td className="py-2">{session.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}