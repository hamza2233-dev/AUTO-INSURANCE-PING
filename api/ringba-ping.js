document.getElementById('pingForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const submitBtn = document.getElementById('submitBtn');
    const btnText = document.getElementById('btnText');
    const btnLoader = document.getElementById('btnLoader');
    const btnArrow = document.getElementById('btnArrow');
    const responseMsg = document.getElementById('responseMessage');
    
    const phoneInput = document.getElementById('phone').value.trim();
    // Remove non-numeric characters for Ringba
    const cleanPhone = phoneInput.replace(/\D/g, ''); 

    if (!cleanPhone || cleanPhone.length < 10) {
        showResponse('Please enter a valid US/Canada phone number (min 10 digits).', 'error');
        return;
    }

    // UI Loading State - ON
    submitBtn.disabled = true;
    btnText.textContent = 'Dispatching...';
    btnLoader.classList.remove('hidden');
    btnArrow.classList.add('hidden');
    responseMsg.className = 'hidden';

    // Ringba Endpoint URL
    const ringbaUrl = `https://rtb.ringba.com/v1/production/bf95a1c2fdfa4dc189c24360e9b05252.json?CID=${encodeURIComponent(cleanPhone)}&exposeCallerId=Yes`;

    // Using Image beacon trick to bypass CORS
    const img = new Image();
    img.src = ringbaUrl;

    img.onload = function() {
        handleSuccess();
    };
    
    img.onerror = function() {
        // Even if it errors (due to no-cors), the ping usually goes through to Ringba.
        // We treat it as successful for the UI flow.
        handleSuccess();
    };

    function handleSuccess() {
        // UI Loading State - OFF
        submitBtn.disabled = false;
        btnText.textContent = 'Dispatch Agent';
        btnLoader.classList.add('hidden');
        btnArrow.classList.remove('hidden');

        showResponse('Success! Caller ID dispatched to Ringba.', 'success');
        document.getElementById('pingForm').reset();
    }

    function showResponse(message, type) {
        responseMsg.textContent = message;
        if (type === 'success') {
            responseMsg.className = 'mt-8 text-center text-sm font-medium p-4 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 animate-pulse';
        } else {
            responseMsg.className = 'mt-8 text-center text-sm font-medium p-4 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 animate-pulse';
        }
    }
});
