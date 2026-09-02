document.getElementById('autoInsuranceForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const submitBtn = document.getElementById('submitBtn');
    const responseMsg = document.getElementById('responseMessage');
    
    // Get phone field value
    const phoneInput = document.getElementById('phone').value.trim();
    const cleanPhone = phoneInput.replace(/\D/g, ''); // Keep only numbers

    // UI Loading State
    submitBtn.disabled = true;
    submitBtn.textContent = 'Processing Request...';
    responseMsg.className = 'hidden mt-4 text-center text-sm font-medium p-3 rounded-lg';

    try {
        // Send Ping to Ringba Endpoint
        const ringbaUrl = `https://rtb.ringba.com/v1/production/bf95a1c2fdfa4dc189c24360e9b05252.json?CID=${encodeURIComponent(cleanPhone)}&exposeCallerId=Yes`;
        
        await fetch(ringbaUrl, {
            method: 'GET',
            mode: 'no-cors' // Handles cross-origin tracking pixel/ping seamlessly
        });

        // Show Success Message
        responseMsg.textContent = 'Success! We are matching you with the best rates now.';
        responseMsg.className = 'mt-4 text-center text-sm font-medium p-3 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
        document.getElementById('autoInsuranceForm').reset();

    } catch (error) {
        responseMsg.textContent = 'An error occurred. Please try calling our agents directly.';
        responseMsg.className = 'mt-4 text-center text-sm font-medium p-3 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20';
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Get My Free Quotes';
    }
});
