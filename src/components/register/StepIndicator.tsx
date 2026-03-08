interface StepIndicatorProps {
    currentStep: number;
    totalSteps: number;
}

export default function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
    return (
        <div className="flex items-center gap-2 mb-8">
            {Array.from({ length: totalSteps }, (_, i) => i + 1).map((s) => (
                <div key={s} className="flex items-center gap-2 flex-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${currentStep >= s ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'}`}>
                        {s}
                    </div>
                    {s < totalSteps && <div className={`h-1 flex-1 rounded ${currentStep > s ? 'bg-black' : 'bg-gray-200'}`}/>}
                </div>
            ))}
        </div>
    )
}