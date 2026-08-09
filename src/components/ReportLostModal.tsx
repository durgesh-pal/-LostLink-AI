import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Camera, 
  MapPin, 
  Calendar, 
  Lock, 
  Eye, 
  EyeOff, 
  Check, 
  AlertTriangle,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { ItemCategory, ReportLocation } from '../types/index.js';
import { checkDuplicateReport } from '../services/api.js';

interface ReportLostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: any) => Promise<void>;
  currentUserId: string;
  currentUserName: string;
  currentUserEmail: string;
}

export const ReportLostModal: React.FC<ReportLostModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  currentUserId,
  currentUserName,
  currentUserEmail
}) => {
  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [duplicateWarning, setDuplicateWarning] = useState<any>(null);

  // Form fields
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ItemCategory>('laptops');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [color, setColor] = useState('');
  const [description, setDescription] = useState('');
  
  // Image
  const [imageUrl, setImageUrl] = useState('');
  const [imageBase64, setImageBase64] = useState('');

  // Location
  const [address, setAddress] = useState('Prayagraj Junction Railway Station, Platform 1');
  const [city, setCity] = useState('Prayagraj');
  const [landmark, setLandmark] = useState('Leader Road Entrance');
  const [lat, setLat] = useState<number>(25.4484);
  const [lng, setLng] = useState<number>(81.8286);

  // Date & Time
  const [date, setDate] = useState('2026-08-08');
  const [time, setTime] = useState('18:00');

  // Private identifying details
  const [privateSerialNo, setPrivateSerialNo] = useState('');
  const [privateUniqueMarks, setPrivateUniqueMarks] = useState('');
  const [privateNotes, setPrivateNotes] = useState('');
  const [showSensitiveInfo, setShowSensitiveInfo] = useState(false);

  if (!isOpen) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setImageBase64(base64);
        setImageUrl(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNextStep1 = async () => {
    if (!title || !description) return;
    // Check for duplicate reports
    const dupCheck = await checkDuplicateReport({ title, category, description });
    if (dupCheck.hasDuplicate) {
      setDuplicateWarning(dupCheck);
    }
    setStep(2);
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    try {
      const locationObj: ReportLocation = {
        address,
        city,
        landmark,
        lat,
        lng,
        isApproximate: true
      };

      await onSubmit({
        userId: currentUserId,
        userName: currentUserName,
        userEmail: currentUserEmail,
        title,
        category,
        brand,
        model,
        color: color || 'Black',
        description,
        imageUrl: imageUrl || 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=800',
        imageBase64Data: imageBase64,
        location: locationObj,
        date,
        time,
        privateSerialNo,
        privateUniqueMarks,
        privateNotes
      });
      setIsSubmitting(false);
      onClose();
    } catch (err) {
      setIsSubmitting(false);
      alert("Failed to create lost report.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative text-slate-100 my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-rose-600/20 text-rose-400 border border-rose-500/30 flex items-center justify-center font-bold">
              1
            </div>
            <div>
              <h2 className="text-xl font-black text-white">Report Lost Item</h2>
              <p className="text-xs text-slate-400">Step {step} of 5 • Multi-factor AI registration</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Duplicate Alert Banner if triggered */}
        {duplicateWarning && duplicateWarning.hasDuplicate && (
          <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-xs text-amber-300 flex items-start space-x-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">Potential Duplicate Detected:</span>
              <p>{duplicateWarning.message}</p>
            </div>
          </div>
        )}

        {/* STEP 1: Basic Information */}
        {step === 1 && (
          <div className="space-y-4 mt-6">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Item Title *</label>
              <input
                type="text"
                placeholder="e.g. Black HP Pavilion Laptop"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-rose-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ItemCategory)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-rose-500"
                >
                  <option value="laptops">Laptops</option>
                  <option value="phones">Phones & Tablets</option>
                  <option value="wallets">Wallets & Cards</option>
                  <option value="documents_ids">ID Cards & Passports</option>
                  <option value="keys">Keys & Lockers</option>
                  <option value="jewelry_watches">Jewelry & Watches</option>
                  <option value="bags_luggage">Bags & Luggage</option>
                  <option value="other">Other Personal Items</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Primary Color *</label>
                <input
                  type="text"
                  placeholder="e.g. Black, Silver, Brown"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Brand Name</label>
                <input
                  type="text"
                  placeholder="e.g. HP, Apple, Fossil"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Model / Series</label>
                <input
                  type="text"
                  placeholder="e.g. Pavilion 15, iPhone 14"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Public Description *</label>
              <textarea
                rows={3}
                placeholder="Describe visible characteristics (e.g. Silver metallic sticker on lid, minor scratches near charging port)..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-rose-500"
              />
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={handleNextStep1}
                disabled={!title || !description}
                className="px-6 py-3 bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl flex items-center space-x-2 cursor-pointer"
              >
                <span>Continue to Image Upload</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Image Upload */}
        {step === 2 && (
          <div className="space-y-4 mt-6">
            <label className="block text-xs font-semibold text-slate-300 mb-1">Upload Photo of Lost Item or Similar Model</label>
            
            <div className="border-2 border-dashed border-slate-800 hover:border-indigo-500 rounded-2xl p-6 text-center bg-slate-950/50 transition-colors">
              {imageUrl ? (
                <div className="space-y-3">
                  <img src={imageUrl} alt="Preview" className="max-h-48 mx-auto rounded-xl object-contain border border-slate-800" />
                  <button
                    onClick={() => { setImageUrl(''); setImageBase64(''); }}
                    className="text-xs text-rose-400 hover:underline"
                  >
                    Remove Photo
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Camera className="w-8 h-8 text-indigo-400 mx-auto" />
                  <p className="text-xs text-slate-300 font-medium">Drag & drop item photo here, or browse files</p>
                  <p className="text-[10px] text-slate-500">Supports PNG, JPG, WEBP (Max 10MB)</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="lost-image-input"
                  />
                  <label
                    htmlFor="lost-image-input"
                    className="inline-block mt-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl cursor-pointer"
                  >
                    Select Photo
                  </label>
                </div>
              )}
            </div>

            <div className="pt-4 flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs rounded-xl flex items-center space-x-1 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                onClick={() => setStep(3)}
                className="px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl flex items-center space-x-2 cursor-pointer"
              >
                <span>Continue to Location</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Location */}
        {step === 3 && (
          <div className="space-y-4 mt-6">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Approximate Address / Station / Market *</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-rose-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">City *</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Specific Landmark</label>
                <input
                  type="text"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>

            <div className="p-3 bg-indigo-950/30 border border-indigo-500/20 rounded-xl text-xs text-slate-300 flex items-start space-x-2">
              <Lock className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <p className="text-[11px] text-slate-400">
                <strong className="text-slate-200">Privacy Protection:</strong> Exact GPS coordinates are obscured into an approximate 1km zone on public maps to protect user security.
              </p>
            </div>

            <div className="pt-4 flex justify-between">
              <button
                onClick={() => setStep(2)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs rounded-xl flex items-center space-x-1 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                onClick={() => setStep(4)}
                className="px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl flex items-center space-x-2 cursor-pointer"
              >
                <span>Continue to Date & Time</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Date & Time */}
        {step === 4 && (
          <div className="space-y-4 mt-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Date Lost *</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Approximate Time *</label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-between">
              <button
                onClick={() => setStep(3)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs rounded-xl flex items-center space-x-1 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                onClick={() => setStep(5)}
                className="px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl flex items-center space-x-2 cursor-pointer"
              >
                <span>Continue to Private Verification Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: Identifying Details (Private Verification Proof) */}
        {step === 5 && (
          <div className="space-y-4 mt-6">
            <div className="p-4 bg-indigo-950/40 border border-indigo-500/30 rounded-2xl space-y-2">
              <div className="flex items-center space-x-2 text-indigo-300 font-bold text-xs">
                <Lock className="w-4 h-4 text-cyan-400" />
                <span>Fraud-Proof Ownership Security</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Provide private identifying information below. This data is <strong className="text-white">NEVER shown publicly</strong>. It is only used by AI to verify ownership when someone submits a found item claim!
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center justify-between">
                <span>Private Serial Number / IMEI / Mac Address</span>
                <button
                  onClick={() => setShowSensitiveInfo(!showSensitiveInfo)}
                  className="text-[10px] text-cyan-400 hover:underline flex items-center space-x-1"
                >
                  {showSensitiveInfo ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                  <span>{showSensitiveInfo ? 'Hide' : 'Reveal'}</span>
                </button>
              </label>
              <input
                type={showSensitiveInfo ? "text" : "password"}
                placeholder="e.g. CND2390X88 or IMEI 35912..."
                value={privateSerialNo}
                onChange={(e) => setPrivateSerialNo(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 font-mono focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Private Unique Markings / Hidden Stickers</label>
              <input
                type="text"
                placeholder="e.g. Small Octocat sticker on left palm rest, scratch near left hinge"
                value={privateUniqueMarks}
                onChange={(e) => setPrivateUniqueMarks(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Private Notes / File names inside</label>
              <textarea
                rows={2}
                placeholder="e.g. Contains folder named 'Hackathon_Final_Files'"
                value={privateNotes}
                onChange={(e) => setPrivateNotes(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="pt-4 flex justify-between">
              <button
                onClick={() => setStep(4)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs rounded-xl flex items-center space-x-1 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                onClick={handleFinalSubmit}
                disabled={isSubmitting}
                className="px-8 py-3 bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white font-bold text-xs rounded-xl shadow-xl shadow-rose-600/30 flex items-center space-x-2 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-cyan-300 animate-spin" />
                <span>{isSubmitting ? 'Scanning & Submitting...' : '🚀 Submit Lost Report'}</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
