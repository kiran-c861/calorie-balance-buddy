import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface CalorieAdjustmentProps {
  adjustment: number;
  onAdjustmentChange: (value: number) => void;
}

const surplusOptions = [100, 200, 300, 400, 500];
const deficitOptions = [-100, -200, -300, -400, -500];

export function CalorieAdjustment({ adjustment, onAdjustmentChange }: CalorieAdjustmentProps) {
  return (
    <div className="space-y-6">
      {/* Toggle Type */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => onAdjustmentChange(Math.abs(adjustment) > 0 ? -Math.abs(adjustment) : -100)}
          className={cn(
            "flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300",
            adjustment < 0
              ? "bg-destructive text-destructive-foreground shadow-lg"
              : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
          )}
          style={adjustment < 0 ? { boxShadow: "0 0 30px hsl(0 84% 60% / 0.3)" } : {}}
        >
          <TrendingDown className="w-5 h-5" />
          Deficit (Cut)
        </button>
        
        <button
          onClick={() => onAdjustmentChange(0)}
          className={cn(
            "flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300",
            adjustment === 0
              ? "bg-primary text-primary-foreground glow-primary"
              : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
          )}
        >
          <Minus className="w-5 h-5" />
          Maintenance
        </button>
        
        <button
          onClick={() => onAdjustmentChange(Math.abs(adjustment) > 0 ? Math.abs(adjustment) : 100)}
          className={cn(
            "flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300",
            adjustment > 0
              ? "bg-success text-success-foreground glow-primary"
              : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
          )}
        >
          <TrendingUp className="w-5 h-5" />
          Surplus (Bulk)
        </button>
      </div>

      {/* Adjustment Amount */}
      {adjustment !== 0 && (
        <div className="space-y-4 animate-slide-up">
          <p className="text-center text-muted-foreground">
            {adjustment > 0 ? "Select surplus amount" : "Select deficit amount"}
          </p>
          
          <div className="flex flex-wrap justify-center gap-3">
            {(adjustment > 0 ? surplusOptions : deficitOptions).map((option) => {
              const isActive = adjustment === option;
              const isSurplus = option > 0;
              
              return (
                <button
                  key={option}
                  onClick={() => onAdjustmentChange(option)}
                  className={cn(
                    "adjustment-btn min-w-[100px] text-lg",
                    isActive
                      ? isSurplus
                        ? "adjustment-btn-active-surplus"
                        : "adjustment-btn-active-deficit"
                      : isSurplus
                        ? "adjustment-btn-surplus"
                        : "adjustment-btn-deficit"
                  )}
                >
                  {option > 0 ? "+" : ""}{option}
                </button>
              );
            })}
          </div>
          
          <div className="text-center">
            <p className={cn(
              "text-sm",
              adjustment > 0 ? "text-success/70" : "text-destructive/70"
            )}>
              {adjustment > 0 
                ? "Surplus helps build muscle mass" 
                : "Deficit helps with fat loss"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
