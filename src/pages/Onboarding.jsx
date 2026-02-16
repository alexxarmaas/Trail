import React, { useState } from 'react';
import { Mountain, ArrowRight, Check, Zap, Trophy, Users, Globe } from 'lucide-react';
import Button from '../components/Button';
import GlassCard from '../components/GlassCard';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';

const Onboarding = ({ onStart }) => {
  const { t, language, toggleLanguage } = useLanguage();
  const { updateProfile } = useUser();
  const [step, setStep] = useState(1);
  const [fitnessLevel, setFitnessLevel] = useState('');
  const [preferredRaceTypes, setPreferredRaceTypes] = useState([]);

  const fitnessLevels = [
    { id: 'beginner', icon: Zap, label: t('onboard.fitness.beginner'), description: t('onboard.fitness.beginnerDesc') },
    { id: 'intermediate', icon: Trophy, label: t('onboard.fitness.intermediate'), description: t('onboard.fitness.intermediateDesc') },
    { id: 'advanced', icon: Users, label: t('onboard.fitness.advanced'), description: t('onboard.fitness.advancedDesc') },
  ];

  const raceTypes = [
    { id: 'short', label: t('onboard.raceTypes.short'), description: '< 30km' },
    { id: 'marathon', label: t('onboard.raceTypes.marathon'), description: '30-50km' },
    { id: 'ultra', label: t('onboard.raceTypes.ultra'), description: '> 50km' },
  ];

  const toggleRaceType = (typeId) => {
    setPreferredRaceTypes(prev =>
      prev.includes(typeId)
        ? prev.filter(id => id !== typeId)
        : [...prev, typeId]
    );
  };

  const handleComplete = () => {
    updateProfile({
      fitnessLevel,
      preferredRaceTypes,
      onboardingCompleted: true,
    });
    localStorage.setItem('trail-companion-onboarding', 'completed');
    onStart();
  };

  const handleSkip = () => {
    localStorage.setItem('trail-companion-onboarding', 'skipped');
    onStart();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200"
          alt="Mountain Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-gray-900/40" />
      </div>

      {/* Language Toggle */}
      <div className="absolute top-6 right-6 z-20">
        <button 
          onClick={toggleLanguage}
          className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors flex items-center gap-2 font-bold border border-white/20 px-4"
        >
          <Globe size={18} />
          <span className="text-sm uppercase tracking-wider">{language}</span>
        </button>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-2xl px-4">
        {/* Step 1: Welcome */}
        {step === 1 && (
          <div className="text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 text-white">
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/40">
                <Mountain size={48} />
              </div>
            </div>
            <div>
              <h1 className="text-5xl font-bold tracking-tight mb-4">
                {t('onboard.title')}
              </h1>
              <p className="text-xl text-gray-200">
                {t('onboard.subtitle')}
              </p>
            </div>
            <div className="flex gap-4 justify-center mt-8">
              <Button onClick={handleSkip} variant="secondary" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
                {t('onboard.skip')}
              </Button>
              <Button onClick={() => setStep(2)} className="flex items-center gap-2">
                {t('onboard.start')} <ArrowRight size={20} />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Fitness Level */}
        {step === 2 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center text-white">
              <h2 className="text-3xl font-bold mb-2">
                {t('onboard.fitness.title')}
              </h2>
              <p className="text-gray-200">{t('onboard.fitness.subtitle')}</p>
            </div>
            <div className="space-y-4">
              {fitnessLevels.map((level) => {
                const Icon = level.icon;
                const isSelected = fitnessLevel === level.id;
                return (
                  <GlassCard
                    key={level.id}
                    onClick={() => setFitnessLevel(level.id)}
                    className={`p-6 cursor-pointer transition-all duration-300 ${
                      isSelected
                        ? 'bg-primary/20 border-primary ring-2 ring-primary'
                        : 'bg-white/10 border-white/20 hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl ${isSelected ? 'bg-primary text-white' : 'bg-white/10 text-white'}`}>
                        <Icon size={24} />
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-bold text-lg ${isSelected ? 'text-primary' : 'text-white'}`}>
                          {level.label}
                        </h3>
                        <p className="text-sm text-gray-200">{level.description}</p>
                      </div>
                      {isSelected && <Check size={24} className="text-primary" />}
                    </div>
                  </GlassCard>
                );
              })}
            </div>
            <div className="flex gap-4 justify-center">
              <Button onClick={() => setStep(1)} variant="secondary" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
                {t('onboard.back')}
              </Button>
              <Button onClick={() => setStep(3)} disabled={!fitnessLevel} className="flex items-center gap-2">
                {t('onboard.next')} <ArrowRight size={20} />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Race Preferences */}
        {step === 3 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center text-white">
              <h2 className="text-3xl font-bold mb-2">
                {t('onboard.raceTypes.title')}
              </h2>
              <p className="text-gray-200">{t('onboard.raceTypes.subtitle')}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {raceTypes.map((type) => {
                const isSelected = preferredRaceTypes.includes(type.id);
                return (
                  <GlassCard
                    key={type.id}
                    onClick={() => toggleRaceType(type.id)}
                    className={`p-6 cursor-pointer transition-all duration-300 text-center ${
                      isSelected
                        ? 'bg-primary/20 border-primary ring-2 ring-primary'
                        : 'bg-white/10 border-white/20 hover:border-primary/50'
                    }`}
                  >
                    <div className="relative">
                      {isSelected && (
                        <div className="absolute -top-2 -right-2 bg-primary text-white rounded-full p-1">
                          <Check size={16} />
                        </div>
                      )}
                      <h3 className={`font-bold text-xl mb-2 ${isSelected ? 'text-primary' : 'text-white'}`}>
                        {type.label}
                      </h3>
                      <p className="text-sm text-gray-200">{type.description}</p>
                    </div>
                  </GlassCard>
                );
              })}
            </div>
            <div className="flex gap-4 justify-center">
              <Button onClick={() => setStep(2)} variant="secondary" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
                {t('onboard.back')}
              </Button>
              <Button onClick={handleComplete} disabled={preferredRaceTypes.length === 0} className="flex items-center gap-2">
                {t('onboard.complete')} <Check size={20} />
              </Button>
            </div>
          </div>
        )}

        {/* Progress Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-2 rounded-full transition-all duration-300 ${
                s === step ? 'w-8 bg-primary' : 'w-2 bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
