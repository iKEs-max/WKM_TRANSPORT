import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, ArrowLeft, Bus, CheckCircle2, User, CreditCard } from "lucide-react";

const steps = ["Route & Time", "Select Seat", "Review & Pay"];

export function Booking() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedSeat, setSelectedSeat] = useState<number | null>(null);

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  return (
    <div className="flex-grow bg-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          {/* Header Progress */}
          <div className="bg-blue-950 px-8 py-6 text-white">
            <div className="flex items-center justify-between mb-8 relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-white/10 z-0 hidden md:block rounded-full"></div>
              <div 
                className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-orange-500 z-0 hidden md:block rounded-full transition-all duration-500"
                style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
              ></div>
              
              {steps.map((step, idx) => (
                <div key={idx} className="relative z-10 flex flex-col items-center gap-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500 ${
                    idx < currentStep ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/40' :
                    idx === currentStep ? 'bg-white text-blue-950 border-4 border-orange-500 scale-110' :
                    'bg-slate-800 text-slate-400 border-2 border-slate-700'
                  }`}>
                    {idx < currentStep ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                  </div>
                  <span className={`text-xs md:text-sm font-medium ${
                    idx <= currentStep ? 'text-white' : 'text-slate-400'
                  }`}>
                    {step}
                  </span>
                </div>
              ))}
            </div>
            
            <h2 className="text-3xl font-display font-bold">
              {currentStep === 0 && "Where to?"}
              {currentStep === 1 && "Pick your spot"}
              {currentStep === 2 && "Almost there!"}
            </h2>
          </div>

          <div className="p-8 min-h-[400px]">
            <AnimatePresence mode="wait">
              {currentStep === 0 && (
                <motion.div
                  key="step-0"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Pickup Location</label>
                      <select className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500">
                        <option>Accra Mall</option>
                        <option>Madina Zongo</option>
                        <option>Circle</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Drop-off Campus</label>
                      <select className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Legon Campus</option>
                        <option>UPSA</option>
                        <option>Ashesi University</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2 pt-4">
                    <label className="text-sm font-semibold text-slate-700">Select Date & Time</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {["07:00 AM", "08:30 AM", "12:00 PM", "05:00 PM"].map((time, i) => (
                        <div key={i} className={`border rounded-xl p-4 text-center cursor-pointer transition-all ${
                          i === 1 ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-md shadow-orange-500/10' : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                        }`}>
                          <div className="font-bold">{time}</div>
                          <div className="text-xs text-slate-500 mt-1">GHS 15</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex flex-col items-center"
                >
                  <div className="bg-slate-100 rounded-3xl p-8 border border-slate-200 w-full max-w-sm relative">
                    <div className="w-20 h-6 bg-slate-300 rounded-full mx-auto mb-10 opacity-50 flex items-center justify-center">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Driver</span>
                    </div>

                    <div className="grid grid-cols-4 gap-x-4 gap-y-6">
                      {Array.from({ length: 16 }).map((_, i) => {
                        // Create an aisle by skipping column 2
                        if (i % 4 === 2) return <div key={`aisle-${i}`}></div>;
                        
                        const isBooked = [0, 1, 4, 11].includes(i);
                        const isSelected = selectedSeat === i;
                        
                        return (
                          <motion.button
                            whileHover={!isBooked && !isSelected ? { scale: 1.1 } : {}}
                            whileTap={!isBooked ? { scale: 0.9 } : {}}
                            key={`seat-${i}`}
                            disabled={isBooked}
                            onClick={() => setSelectedSeat(i)}
                            className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center transition-all ${
                              isBooked ? 'bg-slate-300 text-slate-400 cursor-not-allowed' :
                              isSelected ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/40 ring-4 ring-orange-200' :
                              'bg-white text-blue-900 border-2 border-slate-200 hover:border-orange-300 shadow-sm'
                            }`}
                          >
                            <span className="text-xs font-bold">{i + 1}</span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex gap-6 mt-8 text-sm">
                    <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-md bg-white border-2 border-slate-200"></div> Available</div>
                    <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-md bg-orange-500"></div> Selected</div>
                    <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-md bg-slate-300"></div> Booked</div>
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6 max-w-xl mx-auto"
                >
                  <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-6">
                    <h3 className="font-display font-bold text-xl text-blue-950 mb-4 flex items-center gap-2">
                      <Bus className="w-5 h-5 text-blue-600" /> Trip Summary
                    </h3>
                    <div className="space-y-3 text-slate-700">
                      <div className="flex justify-between border-b border-blue-100 pb-2">
                        <span>Route</span>
                        <span className="font-semibold">Accra Mall to Legon Campus</span>
                      </div>
                      <div className="flex justify-between border-b border-blue-100 pb-2">
                        <span>Date & Time</span>
                        <span className="font-semibold">Today, 08:30 AM</span>
                      </div>
                      <div className="flex justify-between border-b border-blue-100 pb-2">
                        <span>Seat Number</span>
                        <span className="font-semibold text-orange-600">{selectedSeat !== null ? selectedSeat + 1 : 'Not selected'}</span>
                      </div>
                      <div className="flex justify-between pt-2 text-lg">
                        <span className="font-bold">Total Amount</span>
                        <span className="font-bold text-blue-900">GHS 15.00</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-bold text-slate-800">Payment Method</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <label className="border-2 border-orange-500 bg-orange-50 rounded-xl p-4 flex items-center gap-3 cursor-pointer">
                        <input type="radio" name="payment" className="text-orange-500 focus:ring-orange-500" defaultChecked />
                        <span className="font-semibold text-blue-950">Mobile Money</span>
                      </label>
                      <label className="border-2 border-slate-200 rounded-xl p-4 flex items-center gap-3 cursor-pointer hover:border-blue-300">
                        <input type="radio" name="payment" className="text-blue-500 focus:ring-blue-500" />
                        <span className="font-semibold text-blue-950">Card</span>
                      </label>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="px-8 py-6 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
            <button
              onClick={handlePrev}
              className={`flex items-center gap-2 px-6 py-3 font-semibold rounded-xl transition-colors ${
                currentStep === 0 ? 'opacity-0 pointer-events-none' : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              <ArrowLeft className="w-5 h-5" /> Back
            </button>
            
            <button
              onClick={handleNext}
              disabled={currentStep === 1 && selectedSeat === null}
              className={`flex items-center gap-2 px-8 py-3 font-bold rounded-xl transition-all shadow-md ${
                (currentStep === 1 && selectedSeat === null) 
                  ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20 hover:shadow-lg hover:-translate-y-0.5'
              }`}
            >
              {currentStep === steps.length - 1 ? 'Confirm Booking' : 'Continue'} 
              {currentStep !== steps.length - 1 && <ChevronRight className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
