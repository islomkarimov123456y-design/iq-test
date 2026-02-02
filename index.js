/* OMEGA COLLAB ENGINE */
const CollabEngine = {
    totalPoints: 0,
    startTime: null,
    
    // Mensa uslubidagi professional savollar
    questions: [
        { 
            q: "Matrix: 2, 6, 12, 20, ?", 
            a: "30", 
            o: ["24", "28", "30", "36"],
            hint: "Step increase: +4, +6, +8..." 
        },
        { 
            q: "Logic: All Red are Stars. All Stars are Space. Are Red in Space?", 
            a: "Yes", 
            o: ["Yes", "No", "Maybe", "None"],
            hint: "Syllogism rule" 
        }
    ],

    // IQ hisoblash algoritmi (Time + Accuracy)
    calculateIQ(correctAnswers, totalTimeTaken) {
        let baseIQ = 100;
        let accuracyBonus = correctAnswers * 10;
        let speedBonus = Math.max(0, (120 - totalTimeTaken) * 0.25);
        
        let finalIQ = baseIQ + accuracyBonus + speedBonus;
        
        // Elite status check
        return {
            iq: finalIQ.toFixed(0),
            rank: finalIQ > 135 ? "ELITE NEURAL LINK" : "STANDARD SYNC"
        };
    }
};

/* Progressni yangilash funksiyasi */
function updateNeuralSync(current, total) {
    const pct = (current / total) * 100;
    document.getElementById('p-fill').style.width = pct + '%';
    document.getElementById('progress-pct').innerText = pct.toFixed(0) + '%';
}

