/* --- SALARY CALCULATOR LOGIC --- */
function calcSalary() {
    // Only run if elements exist (prevents errors on EMI page)
    if(!document.getElementById('s_wage')) return;

    const cur = document.getElementById('s_currency').value;
    const wage = parseFloat(document.getElementById('s_wage').value);
    const hours = parseFloat(document.getElementById('s_hours').value);
    const days = parseFloat(document.getElementById('s_daysWeek').value);
    const mo = parseFloat(document.getElementById('s_months').value);
    const res = document.getElementById('s_result');
    
    if(!wage || !hours || !days) return alert("Please fill Wage, Hours, and Days");
    
    const w = wage * hours * days;
    const m = (w * 52) / 12;
    const y = w * 52;
    const fmt = (v) => `${cur} ${v.toLocaleString(undefined, {minimumFractionDigits:2})}`;

    let htm = `
        <div class="result-detail"><span>Weekly Income:</span> <b>${fmt(w)}</b></div>
        <div class="result-detail"><span>Monthly Income:</span> <b>${fmt(m)}</b></div>
        <div class="result-detail" style="border-bottom:none"><span>Yearly Salary:</span> <b>${fmt(y)}</b></div>
    `;
    if(mo > 0) {
        htm += `<div style="margin-top:15px; padding-top:10px; border-top:1px dashed #ccc; text-align:center">
                <small>Total for ${mo} months</small><br>
                <span class="result-highlight">${fmt(m * mo)}</span>
                </div>`;
    }
    res.innerHTML = htm; 
    res.style.display = 'block';
}

/* --- EMI CALCULATOR LOGIC --- */
function calcEMI() {
    // Only run if elements exist (prevents errors on Salary page)
    if(!document.getElementById('e_amount')) return;

    const c = document.getElementById('e_currency').value;
    const P = parseFloat(document.getElementById('e_amount').value);
    const annualRate = parseFloat(document.getElementById('e_rate').value);
    const N = parseFloat(document.getElementById('e_months').value);
    
    if(!P || isNaN(annualRate) || !N) return alert("Please fill all fields");
    
    const r = annualRate / 100 / 12;
    const emi = P * r * Math.pow(1 + r, N) / (Math.pow(1 + r, N) - 1);
    const totPay = emi * N;
    const totInt = totPay - P;

    const f = (v) => `${c} ${v.toLocaleString(undefined,{minimumFractionDigits:2, maximumFractionDigits:2})}`;
    
    document.getElementById('e_result').innerHTML = `
        <div style="text-align:center; margin-bottom:15px;">
            <small>Your Monthly EMI</small><br>
            <span class="result-highlight">${f(emi)}</span>
        </div>
        <div class="result-detail"><span>Principal Amount:</span> <b>${f(P)}</b></div>
        <div class="result-detail"><span>Total Interest:</span> <b>${f(totInt)}</b></div>
        <div class="result-detail" style="border-bottom:none"><span>Total Payable:</span> <b>${f(totPay)}</b></div>
    `;
    document.getElementById('e_result').style.display='block';
}