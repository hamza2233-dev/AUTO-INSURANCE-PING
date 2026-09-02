document.getElementById('pingForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const submitBtn = document.getElementById('submitBtn');
    const responseMsg = document.getElementById('responseMessage');
    
    // Get phone input and strip non-numeric characters if required, or pass raw
    const phoneInput = document.getElementById('phone').value.trim();
    const cleanPhone = phoneInput.replace(/\D/g, ''); 

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    responseMsg.className = 'hidden mt-4 text-center text-xs font-medium p-3 rounded-lg';

    try {
        // Ringba Endpoint with dynamic CID
        const ringbaUrl = `https://rtb.ringba.com/v1/production/bf95a1c2fdfa4dc189c24360e9b05252.json?CID=${encodeURIComponent(cleanPhone)}&exposeCallerId=Yes`;
        
        await fetch(ringbaUrl, {
            method: 'GET',
            mode: 'no-cors'
        });

        responseMsg.textContent = 'Ping sent successfully!';
        responseMsg.className = 'mt-4 text-center text-xs font-medium p-3 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
        document.getElementById('pingForm').reset();

    } catch (error) {
        responseMsg.textContent = 'Failed to send ping.';
        responseMsg.className = 'mt-4 text-center text-xs font-medium p-3 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20';
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Ping';
    }
});
