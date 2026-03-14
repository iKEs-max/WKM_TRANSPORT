import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router";
import { useState } from "react";
import { ChevronRight, ChevronLeft, CheckCircle2, User, Mail, Phone, CreditCard, ShieldCheck, Check } from "lucide-react";

export function Booking() {
  const [step, setStep] = useState(1);
  const [selectedSeat, setSelectedSeat] = useState<number | null>(null);

  const totalSteps = 4;
  const progressPercentage = (step / totalSteps) * 100;

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };
  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const renderSeatMap = () => {
    const seats = Array.from({ length: 40 }, (_, i) => i + 1);
    const bookedSeats = [3, 4, 7, 8, 12, 15, 16, 22, 23, 29, 30, 31, 32, 35, 36, 39, 40];

    return (
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 max-w-md mx-auto relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full border-l border-b border-slate-100 flex items-center justify-center -mr-16 -mt-16">
          <div className="w-10 h-10 rounded-full bg-slate-200 mt-12 mr-12 shadow-inner" title="Driver"></div>
        </div>

        <div className="mb-8 text-center font-heading font-bold text-slate-800">
          Front of Bus
        </div>

        <div className="grid grid-cols-4 gap-4 mt-12 relative z-10">
          {seats.map((seat) => {
            const isBooked = bookedSeats.includes(seat);
            const isSelected = selectedSeat === seat;
            const isAisle = seat % 4 === 2;

            return (
              <div key={seat} className={`flex flex-col items-center justify-center ${isAisle ? 'mr-6' : ''}`}>
                <button
                  disabled={isBooked}
                  onClick={() => setSelectedSeat(seat)}
                  className={`
                    w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center font-bold text-sm transition-all shadow-sm
                    ${isBooked 
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed border-2 border-slate-200 shadow-none' 
                      : isSelected 
                        ? 'bg-onukpa-orange text-white border-2 border-orange-600 scale-105 shadow-orange-500/30 ring-4 ring-orange-500/20' 
                        : 'bg-white text-onukpa-blue border-2 border-slate-200 hover:border-onukpa-orange hover:text-onukpa-orange cursor-pointer'}
                  `}
                >
                  {seat}
                </button>
              </div>
            );
          })}
        </div>
        
        <div className="mt-10 flex items-center justify-center gap-6 text-sm text-slate-600 font-medium">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-white border-2 border-slate-200"></div> Available
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-onukpa-orange border-2 border-orange-600"></div> Selected
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-slate-100 border-2 border-slate-200"></div> Booked
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full bg-[#F8FAFC] min-h-screen pt-8 pb-24">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        
        {/* Progress Bar */}
        <div className="mb-12 relative">
          <div className="flex justify-between mb-4">
            <div className={`font-semibold text-sm ${step >= 1 ? 'text-onukpa-blue' : 'text-slate-400'}`}>Trip Details</div>
            <div className={`font-semibold text-sm ${step >= 2 ? 'text-onukpa-blue' : 'text-slate-400'}`}>Select Seat</div>
            <div className={`font-semibold text-sm ${step >= 3 ? 'text-onukpa-blue' : 'text-slate-400'}`}>Passenger</div>
            <div className={`font-semibold text-sm ${step >= 4 ? 'text-onukpa-blue' : 'text-slate-400'}`}>Payment</div>
          </div>
          <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-onukpa-orange"
              initial={{ width: '0%' }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="relative">
          <AnimatePresence mode="wait">
            
            {/* Step 1: Trip Details */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-heading font-bold text-slate-900 mb-2">Select Your Route</h2>
                  <p className="text-slate-500 font-sans">Choose where you're traveling from and to.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
                    <label className="text-sm font-semibold text-slate-700">Leaving From</label>
                    <select className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-onukpa-blue/20 appearance-none font-medium text-slate-800" defaultValue="ug">
                      <option value="ug">University of Ghana (UG)</option>
                      <option value="knust">KNUST</option>
                      <option value="ucc">UCC</option>
                      <option value="upsa">UPSA</option>
                    </select>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
                    <label className="text-sm font-semibold text-slate-700">Going To</label>
                    <select className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-onukpa-orange/20 appearance-none font-medium text-slate-800" defaultValue="kumasi">
                      <option value="kumasi">Kumasi (Adum)</option>
                      <option value="accra">Accra (Circle)</option>
                      <option value="tamale">Tamale</option>
                      <option value="cape">Cape Coast</option>
                    </select>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-6 mt-6">
                  <label className="text-sm font-semibold text-slate-700">Available Schedules</label>
                  
                  <div className="space-y-3">
                    {[
                      { time: "08:00 AM", date: "Fri, Oct 12", price: "150 GHS", type: "VIP Coach", tag: "Fastest filling" },
                      { time: "14:00 PM", date: "Fri, Oct 12", price: "150 GHS", type: "Sprinter Plus" },
                      { time: "06:00 AM", date: "Sat, Oct 13", price: "150 GHS", type: "Executive Coach" }
                    ].map((schedule, i) => (
                      <label key={i} className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-colors ${i === 0 ? 'border-onukpa-blue bg-blue-50/50' : 'border-slate-100 hover:border-slate-300'}`}>
                        <div className="flex items-center gap-4">
                          <input type="radio" name="schedule" className="w-5 h-5 accent-onukpa-blue" defaultChecked={i === 0} />
                          <div>
                            <div className="font-bold text-slate-900 font-heading">{schedule.time}</div>
                            <div className="text-sm text-slate-500 font-medium">{schedule.date} • {schedule.type}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-onukpa-blue text-lg">{schedule.price}</div>
                          {schedule.tag && <div className="text-xs font-bold text-onukpa-orange bg-orange-100 px-2 py-0.5 rounded-full inline-block mt-1">{schedule.tag}</div>}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Seat Selection */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-heading font-bold text-slate-900 mb-2">Choose Your Seat</h2>
                  <p className="text-slate-500 font-sans">Click on an available seat to select it.</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 items-start">
                  <div className="flex-1 w-full">
                    {renderSeatMap()}
                  </div>

                  <div className="w-full lg:w-1/3 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 sticky top-24">
                    <h3 className="font-heading font-bold text-xl text-slate-900 mb-6">Booking Summary</h3>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Route</span>
                        <span className="font-medium text-slate-900 text-right">UG to Kumasi</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Date & Time</span>
                        <span className="font-medium text-slate-900 text-right">Fri, Oct 12, 08:00 AM</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Seat</span>
                        <span className="font-medium text-onukpa-orange text-right">
                          {selectedSeat ? `Seat ${selectedSeat}` : 'Not selected'}
                        </span>
                      </div>
                    </div>

                    <hr className="border-slate-100 mb-6" />

                    <div className="flex justify-between items-center mb-8">
                      <span className="font-bold text-slate-900">Total</span>
                      <span className="text-2xl font-bold font-heading text-onukpa-blue">150 GHS</span>
                    </div>

                    {!selectedSeat && (
                      <div className="text-sm text-red-500 bg-red-50 p-3 rounded-lg flex items-center gap-2 font-medium justify-center border border-red-100">
                        Please select a seat to continue
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Passenger Details */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-2xl mx-auto"
              >
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-heading font-bold text-slate-900 mb-2">Passenger Information</h2>
                  <p className="text-slate-500 font-sans">Tell us who's traveling.</p>
                </div>

                <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                        <User size={16} className="text-onukpa-blue" /> First Name
                      </label>
                      <input type="text" placeholder="Kwame" className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-onukpa-blue/20 text-slate-800" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                        <User size={16} className="text-onukpa-blue" /> Last Name
                      </label>
                      <input type="text" placeholder="Mensah" className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-onukpa-blue/20 text-slate-800" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <Mail size={16} className="text-onukpa-orange" /> Email Address
                    </label>
                    <input type="email" placeholder="kwame.mensah@st.ug.edu.gh" className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-onukpa-orange/20 text-slate-800" />
                    <p className="text-xs text-slate-500 mt-1">We'll send your ticket here.</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <Phone size={16} className="text-onukpa-blue" /> Phone Number (Mobile Money)
                    </label>
                    <div className="flex">
                      <div className="p-4 bg-slate-100 border border-r-0 border-slate-200 rounded-l-xl text-slate-600 font-medium">
                        +233
                      </div>
                      <input type="tel" placeholder="55 123 4567" className="w-full p-4 rounded-r-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-onukpa-blue/20 text-slate-800" />
                    </div>
                  </div>

                  <div className="pt-4 flex items-center gap-3">
                    <input type="checkbox" id="student_id" className="w-5 h-5 rounded border-slate-300 text-onukpa-blue focus:ring-onukpa-blue accent-onukpa-blue" defaultChecked />
                    <label htmlFor="student_id" className="text-sm text-slate-600 font-medium cursor-pointer">
                      I confirm I have a valid Student ID (Required for boarding)
                    </label>
                  </div>

                </div>
              </motion.div>
            )}

            {/* Step 4: Payment */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-2xl mx-auto"
              >
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-heading font-bold text-slate-900 mb-2">Secure Payment</h2>
                  <p className="text-slate-500 font-sans">Complete your booking securely via Mobile Money or Card.</p>
                </div>

                <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 space-y-8">
                  
                  <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100 flex items-center justify-between">
                    <div>
                      <h4 className="font-heading font-bold text-onukpa-blue text-lg mb-1">Total Amount Due</h4>
                      <p className="text-slate-500 text-sm">Including taxes & booking fees</p>
                    </div>
                    <div className="text-3xl font-bold font-heading text-onukpa-blue">
                      150 GHS
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Select Payment Method</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <label className="flex items-center gap-4 p-4 border-2 border-onukpa-orange bg-orange-50/50 rounded-xl cursor-pointer">
                        <input type="radio" name="payment" className="w-5 h-5 accent-onukpa-orange" defaultChecked />
                        <div className="font-bold text-slate-900">Mobile Money</div>
                      </label>
                      <label className="flex items-center gap-4 p-4 border-2 border-slate-100 hover:border-slate-300 rounded-xl cursor-pointer transition-colors">
                        <input type="radio" name="payment" className="w-5 h-5 accent-onukpa-orange" />
                        <div className="font-bold text-slate-900 flex items-center gap-2"><CreditCard size={18} /> Card</div>
                      </label>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-center space-y-4">
                    <p className="text-sm text-slate-600 font-medium">
                      A prompt will be sent to your phone <strong className="text-slate-900">+233 55 123 4567</strong>.<br/> Enter your PIN to authorize the payment of 150 GHS.
                    </p>
                    <div className="inline-flex items-center justify-center gap-2 text-green-600 bg-green-100 px-4 py-2 rounded-full text-xs font-bold">
                      <ShieldCheck size={16} /> Secure encrypted connection
                    </div>
                  </div>

                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-12 flex items-center justify-between max-w-4xl mx-auto border-t border-slate-200 pt-8">
          {step > 1 ? (
            <button 
              onClick={prevStep}
              className="px-6 py-3 rounded-xl font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors flex items-center gap-2"
            >
              <ChevronLeft size={20} /> Back
            </button>
          ) : (
            <div></div>
          )}

          {step < totalSteps ? (
            <button 
              onClick={nextStep}
              disabled={step === 2 && !selectedSeat}
              className={`px-8 py-3 rounded-xl font-bold transition-all shadow-lg flex items-center gap-2 ${
                (step === 2 && !selectedSeat)
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                  : 'bg-onukpa-blue text-white hover:bg-blue-900 shadow-blue-900/20'
              }`}
            >
              Continue <ChevronRight size={20} />
            </button>
          ) : (
            <button 
              onClick={() => {
                alert("Booking successful! A ticket has been sent to your email.");
                window.location.href='/';
              }}
              className="px-8 py-3 rounded-xl font-bold bg-onukpa-orange text-white hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20 flex items-center gap-2 hover:scale-105 active:scale-95"
            >
              <CheckCircle2 size={20} /> Pay Now
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
