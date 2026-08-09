import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Camera, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft 
} from 'lucide-react';
import { ItemCategory, ReportLocation } from '../types/index.js';

interface ReportFoundModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: any) => Promise<void>;
  currentUserId: string;
  currentUserName: string;
  currentUserEmail: string;
}

export const ReportFoundModal: React.FC<ReportFoundModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  currentUserId,
  currentUserName,
  currentUserEmail
}) => {
  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Form fields
  const [title, setTitle] = useState('Found Black HP Notebook Computer');
  const [category, setCategory] = useState<ItemCategory>('laptops');
  const [brand, setBrand] = useState('HP');
  const [model, setModel] = useState('Pavilion');
  const [color, setColor] = useState('Black');
  const [description, setDescription] = useState('Found a black HP laptop near the railway station waiting hall in Civil Lines area. Has a metallic emblem sticker on top lid and was left in a black canvas bag.');
  
  // Image
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&q=80&w=800');
  const [imageBase64, setImageBase64] = useState('');

  // Location
  const [address, setAddress] = useState('Civil Lines Side Exit, Prayagraj Railway Station');
  const [city, setCity] = useState('Prayagraj');
  const [landmark, setLandmark] = useState('Civil Lines Waiting Lounge');
  const [lat, setLat] = useState<number>(25.4510);
  const [lng, setLng] = useState<number>(81.8310);

  // Date & Time
  const [date, setDate] = useState('2026-08-08');
  const [time, setTime] = useState('18:35');

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
        imageUrl: imageUrl || 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&q=80&w=800',
        imageBase64Data: imageBase64,
        location: locationObj,
        date,
        time
      });
      setIsSubmitting(false);
      onClose();
    } catch (err) {
      setIsSubmitting(false);
      alert("Failed to submit found report.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative text-slate-100 my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold">
              2
            </div>
            <div>
              <h2 className="text-xl font-black text-white">Report Found Item</h2>
              <p className="text-xs text-slate-400">Step {step} of 3 • Help reunite an item with its owner</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 1: Basic Information */}
        {step === 1 && (
          <div className="space-y-4 mt-6">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Item Title *</label>
              <input
                type="text"
                placeholder="e.g. Found Black HP Notebook Computer"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ItemCategory)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
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
                  placeholder="e.g. Black"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Visible Brand Logo</label>
                <input
                  type="text"
                  placeholder="e.g. HP, Apple, Fossil"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Model / Specs</label>
                <input
                  type="text"
                  placeholder="e.g. Pavilion Notebook"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Found Item Description *</label>
              <textarea
                rows={3}
                placeholder="Where was it found? What condition is it in? Any visible accessories?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center space-x-2 cursor-pointer"
              >
                <span>Continue to Photo & Location</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Photo & Location */}
        {step === 2 && (
          <div className="space-y-4 mt-6">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Photo of Found Item</label>
              <div className="border-2 border-dashed border-slate-800 hover:border-emerald-500 rounded-2xl p-4 text-center bg-slate-950/50 transition-colors">
                {imageUrl ? (
                  <div className="space-y-2">
                    <img src={imageUrl} alt="Preview" className="max-h-40 mx-auto rounded-xl object-contain border border-slate-800" />
                    <button
                      onClick={() => { setImageUrl(''); setImageBase64(''); }}
                      className="text-xs text-rose-400 hover:underline"
                    >
                      Change Photo
                    </button>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <Camera className="w-6 h-6 text-emerald-400 mx-auto" />
                    <p className="text-xs text-slate-300 font-medium">Upload photo of found item</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="found-image-input"
                    />
                    <label
                      htmlFor="found-image-input"
                      className="inline-block mt-1 px-3 py-1.5 bg-slate-800 text-slate-200 text-xs rounded-lg cursor-pointer"
                    >
                      Choose Photo
                    </label>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Found Location / Station *</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">City *</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Landmark</label>
                <input
                  type="text"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Date Found</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Time Found</label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>
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
                onClick={handleFinalSubmit}
                disabled={isSubmitting}
                className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-xs rounded-xl shadow-xl shadow-emerald-600/30 flex items-center space-x-2 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-cyan-300 animate-spin" />
                <span>{isSubmitting ? 'AI Searching Owners...' : '🤖 Submit & Scan for Owners'}</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
