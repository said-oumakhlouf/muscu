interface StepIndicatorProps {
    currentStep: number;
    totalSteps: number;
}

export default function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
    return (
        <div className="flex items-center gap-2 mb-8">
            {Array.from({ length: totalSteps }, (_, i) => i + 1).map((s) => (
                <div key={s} className="flex items-center gap-2 flex-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${currentStep > s
                            ? 'bg-[#6C5CE7] text-white'
                            : currentStep === s
                                ? 'bg-[#6C5CE7] text-white ring-4 ring-[#6C5CE7]/20'
                                : 'bg-[#F5F5FB] text-gray-400 border border-black/6'
                        }`}>
                        {currentStep > s ? (
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                <path d="M2 5L4 7L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        ) : s}
                    </div>
                    {s < totalSteps && (
                        <div className={`h-0.5 flex-1 rounded transition-colors ${currentStep > s ? 'bg-[#6C5CE7]' : 'bg-[#F5F5FB]'
                            }`} />
                    )}
                </div>
            ))}
        </div>
    );
}